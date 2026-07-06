<?php
/**
 * BACA Vector DB - Weaviate Adapter
 *
 * Weaviate vector database integration (self-hosted or cloud).
 *
 * @package Botisst
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once BACA_PATH . 'includes/class-baca-vector-db-base.php';

/**
 * Class BACA_Vector_DB_Weaviate
 */
class BACA_Vector_DB_Weaviate extends BACA_Vector_DB_Base {

	/**
	 * Host URL
	 *
	 * @var string
	 */
	private $host_url = '';

	/**
	 * API Key
	 *
	 * @var string
	 */
	private $api_key = '';

	/**
	 * Class Name
	 *
	 * @var string
	 */
	private $class_name = '';

	/**
	 * Constructor
	 *
	 * @param array $config Configuration.
	 */
	public function __construct( $config = [] ) {
		parent::__construct( $config );

		$this->host_url   = ! empty( $config['host_url'] ) ? rtrim( $config['host_url'], '/' ) : 'http://localhost:8080';
		$this->api_key    = ! empty( $config['api_key'] ) ? $config['api_key'] : '';
		$this->class_name = ! empty( $config['class_name'] ) ? $config['class_name'] : 'BotisstDocument';
	}

	/**
	 * Validate Configuration
	 *
	 * @return bool|WP_Error
	 */
	protected function validate_config() {
		if ( empty( $this->host_url ) ) {
			return new WP_Error( 'weaviate_missing_host', 'Weaviate host URL is required' );
		}

		return true;
	}

	/**
	 * Store Embedding
	 *
	 * @param string $chunk_id     Chunk ID.
	 * @param array  $embedding    Embedding vector.
	 * @param string $document_id  Document ID.
	 * @return bool|WP_Error
	 */
	public function store_embedding( $chunk_id, $embedding, $document_id = '' ) {
		global $wpdb;

		// Get chunk content from database
		$chunks_table = esc_sql( $wpdb->prefix . 'baca_rag_chunks' );
		$chunk = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT content FROM {$chunks_table} WHERE id = %d",
				$chunk_id
			)
		);

		if ( ! $chunk ) {
			return new WP_Error( 'chunk_not_found', 'Chunk not found' );
		}

		$url = $this->host_url . '/v1/objects';

		$data = [
			'class'      => $this->class_name,
			'properties' => [
				'content'    => $chunk->content,
				'chunkId'    => $chunk_id,
				'documentId' => $document_id,
				'timestamp'  => current_time( 'mysql' ),
			],
			'vector'     => $embedding,
		];

		$response = wp_remote_post(
			$url,
			[
				'headers' => array_merge(
					[
						'Content-Type' => 'application/json',
					],
					$this->api_key ? [ 'Authorization' => 'Bearer ' . $this->api_key ] : []
				),
				'body'    => wp_json_encode( $data ),
				'timeout' => 30,
			]
		);

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$status_code = wp_remote_retrieve_response_code( $response );
		if ( $status_code >= 200 && $status_code < 300 ) {
			// Update chunk status in database
			$wpdb->update(
				$chunks_table,
				[
					'vector_id'        => $chunk_id,
					'embedding_status' => 'completed',
				],
				[ 'id' => $chunk_id ],
				[ '%s', '%s' ],
				[ '%d' ]
			);

			return true;
		}

		return new WP_Error( 'weaviate_error', 'Failed to store embedding in Weaviate' );
	}

	/**
	 * Bulk Store Embeddings
	 *
	 * @param array $embeddings Array of embeddings.
	 * @return bool|WP_Error
	 */
	public function bulk_store_embeddings( $embeddings ) {
		$url = $this->host_url . '/v1/batch/objects';

		$objects = [];
		foreach ( $embeddings as $chunk_id => $embedding_data ) {
			$objects[] = [
				'class'      => $this->class_name,
				'properties' => [
					'chunkId'    => $chunk_id,
					'documentId' => $embedding_data['document_id'] ?? '',
					'timestamp'  => current_time( 'mysql' ),
				],
				'vector'     => $embedding_data['vector'],
			];
		}

		$response = wp_remote_post(
			$url,
			[
				'headers' => array_merge(
					[
						'Content-Type' => 'application/json',
					],
					$this->api_key ? [ 'Authorization' => 'Bearer ' . $this->api_key ] : []
				),
				'body'    => wp_json_encode( [ 'objects' => $objects ] ),
				'timeout' => 60,
			]
		);

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$status_code = wp_remote_retrieve_response_code( $response );
		if ( $status_code >= 200 && $status_code < 300 ) {
			return true;
		}

		return new WP_Error( 'weaviate_error', 'Failed to bulk store embeddings' );
	}

	/**
	 * Search Embeddings
	 *
	 * @param array $query_embedding Query embedding.
	 * @param int   $limit           Maximum results.
	 * @return array
	 */
	public function search( $query_embedding, $limit = 5 ) {
		$url = $this->host_url . '/v1/graphql';

		$query = sprintf(
			'{
			  Get {
				%s(
				  nearVector: { vector: %s }
				  limit: %d
				) {
				  chunkId
				  _additional { distance }
				}
			  }
			}',
			$this->class_name,
			wp_json_encode( $query_embedding ),
			$limit
		);

		$response = wp_remote_post(
			$url,
			[
				'headers' => array_merge(
					[
						'Content-Type' => 'application/json',
					],
					$this->api_key ? [ 'Authorization' => 'Bearer ' . $this->api_key ] : []
				),
				'body'    => wp_json_encode( [ 'query' => $query ] ),
				'timeout' => 30,
			]
		);

		if ( is_wp_error( $response ) ) {
			error_log( 'Weaviate search error: ' . $response->get_error_message() );
			return [];
		}

		$data = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( empty( $data['data']['Get'][ $this->class_name ] ) ) {
			return [];
		}

		$results = [];
		foreach ( $data['data']['Get'][ $this->class_name ] as $item ) {
			// Convert distance to similarity (1 - distance for Weaviate)
			$similarity = 1 - ( $item['_additional']['distance'] ?? 1 );

			$results[] = [
				'chunk_id'   => $item['chunkId'],
				'similarity' => max( 0, $similarity ), // Ensure non-negative
			];
		}

		return $results;
	}

	/**
	 * Get Embedding
	 *
	 * @param string $chunk_id Chunk ID.
	 * @return array|null
	 */
	public function get_embedding( $chunk_id ) {
		$url = $this->host_url . '/v1/graphql';

		$query = sprintf(
			'{
			  Get {
				%s(
				  where: {
					path: ["chunkId"]
					operator: Equal
					valueString: "%s"
				  }
				) {
				  _additional { vector }
				}
			  }
			}',
			$this->class_name,
			esc_attr( $chunk_id )
		);

		$response = wp_remote_post(
			$url,
			[
				'headers' => array_merge(
					[
						'Content-Type' => 'application/json',
					],
					$this->api_key ? [ 'Authorization' => 'Bearer ' . $this->api_key ] : []
				),
				'body'    => wp_json_encode( [ 'query' => $query ] ),
				'timeout' => 30,
			]
		);

		if ( is_wp_error( $response ) ) {
			return null;
		}

		$data = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( ! empty( $data['data']['Get'][ $this->class_name ][0]['_additional']['vector'] ) ) {
			return $data['data']['Get'][ $this->class_name ][0]['_additional']['vector'];
		}

		return null;
	}

	/**
	 * Delete Embedding
	 *
	 * @param string $chunk_id Chunk ID.
	 * @return bool|WP_Error
	 */
	public function delete_embedding( $chunk_id ) {
		global $wpdb;

		$url = $this->host_url . '/v1/graphql';

		$query = sprintf(
			'{
			  Aggregate {
				%s(
				  where: {
					path: ["chunkId"]
					operator: Equal
					valueString: "%s"
				  }
				) {
				  meta { count }
				}
			  }
			}',
			$this->class_name,
			esc_attr( $chunk_id )
		);

		// Get the object to delete
		$response = wp_remote_post(
			$url,
			[
				'headers' => array_merge(
					[
						'Content-Type' => 'application/json',
					],
					$this->api_key ? [ 'Authorization' => 'Bearer ' . $this->api_key ] : []
				),
				'body'    => wp_json_encode( [ 'query' => $query ] ),
				'timeout' => 30,
			]
		);

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		// Update chunk status in database
		$chunks_table = esc_sql( $wpdb->prefix . 'baca_rag_chunks' );
		$wpdb->update(
			$chunks_table,
			[
				'embedding_status' => 'pending',
				'vector_id'        => null,
			],
			[ 'id' => $chunk_id ],
			[ '%s', '%s' ],
			[ '%d' ]
		);

		return true;
	}

	/**
	 * Bulk Delete
	 *
	 * @param array $chunk_ids Chunk IDs.
	 * @return bool|WP_Error
	 */
	public function bulk_delete( $chunk_ids ) {
		// Weaviate doesn't have efficient bulk delete by ID, so delete individually
		foreach ( $chunk_ids as $chunk_id ) {
			$this->delete_embedding( $chunk_id );
		}

		return true;
	}

	/**
	 * Test Connection
	 *
	 * @return bool|WP_Error
	 */
	public function test_connection() {
		$url = $this->host_url . '/v1/meta';

		$response = wp_remote_get(
			$url,
			[
				'headers' => $this->api_key ? [ 'Authorization' => 'Bearer ' . $this->api_key ] : [],
				'timeout' => 10,
			]
		);

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$status_code = wp_remote_retrieve_response_code( $response );

		if ( $status_code >= 200 && $status_code < 300 ) {
			return true;
		}

		return new WP_Error( 'weaviate_connection_failed', 'Failed to connect to Weaviate' );
	}

	/**
	 * Get Statistics
	 *
	 * @return array
	 */
	public function get_statistics() {
		$url = $this->host_url . '/v1/graphql';

		$query = sprintf(
			'{
			  Aggregate {
				%s {
				  meta { count }
				}
			  }
			}',
			$this->class_name
		);

		$response = wp_remote_post(
			$url,
			[
				'headers' => array_merge(
					[
						'Content-Type' => 'application/json',
					],
					$this->api_key ? [ 'Authorization' => 'Bearer ' . $this->api_key ] : []
				),
				'body'    => wp_json_encode( [ 'query' => $query ] ),
				'timeout' => 10,
			]
		);

		if ( is_wp_error( $response ) ) {
			return [ 'error' => $response->get_error_message() ];
		}

		$data = json_decode( wp_remote_retrieve_body( $response ), true );

		return [
			'total_vectors' => $data['data']['Aggregate'][ $this->class_name ][0]['meta']['count'] ?? 0,
			'host_url'      => $this->host_url,
			'class_name'    => $this->class_name,
		];
	}
}
