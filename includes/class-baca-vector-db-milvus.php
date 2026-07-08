<?php
/**
 * BACA Vector DB - Milvus Adapter
 *
 * Milvus vector database integration (self-hosted).
 *
 * @package Botisst
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once BACA_PATH . 'includes/class-baca-vector-db-base.php';

/**
 * Class BACA_Vector_DB_Milvus
 */
class BACA_Vector_DB_Milvus extends BACA_Vector_DB_Base {

	/**
	 * Host
	 *
	 * @var string
	 */
	private $host = '';

	/**
	 * Port
	 *
	 * @var int
	 */
	private $port = 19530;

	/**
	 * Collection Name
	 *
	 * @var string
	 */
	private $collection_name = '';

	/**
	 * Database Name
	 *
	 * @var string
	 */
	private $db_name = '';

	/**
	 * Constructor
	 *
	 * @param array $config Configuration.
	 */
	public function __construct( $config = [] ) {
		parent::__construct( $config );

		$this->host            = ! empty( $config['host'] ) ? $config['host'] : 'localhost';
		$this->port            = ! empty( $config['port'] ) ? intval( $config['port'] ) : 19530;
		$this->collection_name = ! empty( $config['collection_name'] ) ? $config['collection_name'] : 'botisst_chunks';
		$this->db_name         = ! empty( $config['db_name'] ) ? $config['db_name'] : 'default';
	}

	/**
	 * Validate Configuration
	 *
	 * @return bool|WP_Error
	 */
	protected function validate_config() {
		if ( empty( $this->host ) ) {
			return new WP_Error( 'milvus_missing_host', 'Milvus host is required' );
		}

		return true;
	}

	/**
	 * Get API URL
	 *
	 * @return string
	 */
	private function get_api_url() {
		return 'http://' . $this->host . ':' . $this->port;
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
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Table name is safe, direct query required.
		$chunk = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT content FROM {$chunks_table} WHERE id = %d", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table name is dynamic but safe.
				$chunk_id
			)
		);

		if ( ! $chunk ) {
			return new WP_Error( 'chunk_not_found', 'Chunk not found' );
		}

		// Insert or update in Milvus
		$url = $this->get_api_url() . '/v1/insert';

		$data = [
			'db_name'           => $this->db_name,
			'collection_name'   => $this->collection_name,
			'records'           => [
				[
					'chunk_id'    => $chunk_id,
					'document_id' => $document_id,
					'content'     => $chunk->content,
					'embedding'   => $embedding,
					'timestamp'   => current_time( 'mysql' ),
				],
			],
		];

		$response = wp_remote_post(
			$url,
			[
				'headers' => [
					'Content-Type' => 'application/json',
				],
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
			// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct update to custom table.
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

		return new WP_Error( 'milvus_error', 'Failed to store embedding in Milvus' );
	}

	/**
	 * Bulk Store Embeddings
	 *
	 * @param array $embeddings Array of embeddings.
	 * @return bool|WP_Error
	 */
	public function bulk_store_embeddings( $embeddings ) {
		$url = $this->get_api_url() . '/v1/insert';

		$records = [];
		foreach ( $embeddings as $chunk_id => $embedding_data ) {
			$records[] = [
				'chunk_id'    => $chunk_id,
				'document_id' => $embedding_data['document_id'] ?? '',
				'embedding'   => $embedding_data['vector'],
				'timestamp'   => current_time( 'mysql' ),
			];
		}

		$data = [
			'db_name'           => $this->db_name,
			'collection_name'   => $this->collection_name,
			'records'           => $records,
		];

		$response = wp_remote_post(
			$url,
			[
				'headers' => [
					'Content-Type' => 'application/json',
				],
				'body'    => wp_json_encode( $data ),
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

		return new WP_Error( 'milvus_error', 'Failed to bulk store embeddings' );
	}

	/**
	 * Search Embeddings
	 *
	 * @param array $query_embedding Query embedding.
	 * @param int   $limit           Maximum results.
	 * @return array
	 */
	public function search( $query_embedding, $limit = 5 ) {
		$url = $this->get_api_url() . '/v1/search';

		$data = [
			'db_name'           => $this->db_name,
			'collection_name'   => $this->collection_name,
			'vector_field_name' => 'embedding',
			'vectors'           => [ $query_embedding ],
			'limit'             => $limit,
			'output_fields'     => [ 'chunk_id', 'document_id' ],
		];

		$response = wp_remote_post(
			$url,
			[
				'headers' => [
					'Content-Type' => 'application/json',
				],
				'body'    => wp_json_encode( $data ),
				'timeout' => 30,
			]
		);

		if ( is_wp_error( $response ) ) {
			return [];
		}

		$response_data = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( empty( $response_data['results'][0] ) ) {
			return [];
		}

		$results = [];
		foreach ( $response_data['results'][0] as $result ) {
			$results[] = [
				'chunk_id'   => $result['chunk_id'],
				'similarity' => $result['distance'] ?? 0,
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
		$url = $this->get_api_url() . '/v1/query';

		$data = [
			'db_name'           => $this->db_name,
			'collection_name'   => $this->collection_name,
			'filter'            => 'chunk_id == "' . esc_sql( $chunk_id ) . '"',
			'output_fields'     => [ 'embedding' ],
			'limit'             => 1,
		];

		$response = wp_remote_post(
			$url,
			[
				'headers' => [
					'Content-Type' => 'application/json',
				],
				'body'    => wp_json_encode( $data ),
				'timeout' => 30,
			]
		);

		if ( is_wp_error( $response ) ) {
			return null;
		}

		$response_data = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( ! empty( $response_data[0]['embedding'] ) ) {
			return $response_data[0]['embedding'];
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

		$url = $this->get_api_url() . '/v1/delete';

		$data = [
			'db_name'           => $this->db_name,
			'collection_name'   => $this->collection_name,
			'filter'            => 'chunk_id == "' . esc_sql( $chunk_id ) . '"',
		];

		$response = wp_remote_post(
			$url,
			[
				'headers' => [
					'Content-Type' => 'application/json',
				],
				'body'    => wp_json_encode( $data ),
				'timeout' => 30,
			]
		);

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		// Update chunk status in database
		$chunks_table = esc_sql( $wpdb->prefix . 'baca_rag_chunks' );
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct update to custom table.
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
		$url = $this->get_api_url() . '/v1/delete';

		// Build filter for multiple IDs
		$filters = array_map(
			function ( $chunk_id ) {
				return 'chunk_id == "' . esc_sql( $chunk_id ) . '"';
			},
			$chunk_ids
		);

		$data = [
			'db_name'           => $this->db_name,
			'collection_name'   => $this->collection_name,
			'filter'            => implode( ' || ', $filters ),
		];

		$response = wp_remote_post(
			$url,
			[
				'headers' => [
					'Content-Type' => 'application/json',
				],
				'body'    => wp_json_encode( $data ),
				'timeout' => 60,
			]
		);

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		return true;
	}

	/**
	 * Test Connection
	 *
	 * @return bool|WP_Error
	 */
	public function test_connection() {
		$url = $this->get_api_url() . '/v1/vectordb/collections/list';

		$response = wp_remote_get(
			$url,
			[
				'headers' => [
					'Content-Type' => 'application/json',
				],
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

		return new WP_Error( 'milvus_connection_failed', 'Failed to connect to Milvus' );
	}

	/**
	 * Get Statistics
	 *
	 * @return array
	 */
	public function get_statistics() {
		$url = $this->get_api_url() . '/v1/vectordb/collections/describe';

		$data = [
			'db_name'           => $this->db_name,
			'collection_name'   => $this->collection_name,
		];

		$response = wp_remote_post(
			$url,
			[
				'headers' => [
					'Content-Type' => 'application/json',
				],
				'body'    => wp_json_encode( $data ),
				'timeout' => 10,
			]
		);

		if ( is_wp_error( $response ) ) {
			return [ 'error' => $response->get_error_message() ];
		}

		$response_data = json_decode( wp_remote_retrieve_body( $response ), true );

		return [
			'total_vectors'     => $response_data['data']['num_entities'] ?? 0,
			'collection_name'   => $this->collection_name,
			'host'              => $this->host,
			'port'              => $this->port,
		];
	}
}
