<?php
/**
 * BACA Retriever
 *
 * Handles document retrieval and similarity search for RAG system.
 *
 * @package Botisst
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class BACA_Retriever
 */
class BACA_Retriever {

	/**
	 * Get Settings
	 *
	 * @return array
	 */
	private function get_settings() {
		$settings = BACA_Settings_Handler::baca_get_all_settings();
		return isset( $settings['rag'] ) ? $settings['rag'] : [];
	}

	/**
	 * Search for Relevant Documents
	 *
	 * @param array $query_embedding Query embedding vector.
	 * @param int   $limit           Maximum documents to return.
	 * @return array Array of relevant documents with content
	 */
	public function search( $query_embedding, $limit = 5 ) {
		if ( empty( $query_embedding ) || ! is_array( $query_embedding ) ) {
			return [];
		}

		$settings = $this->get_settings();

		// Get vector DB provider
		$vector_db_provider = ! empty( $settings['vector_db']['provider'] ) ? $settings['vector_db']['provider'] : 'sqlite';

		try {
			$vector_db = $this->get_vector_db( $vector_db_provider );
			if ( ! $vector_db ) {
				return [];
			}

			$results = $vector_db->search( $query_embedding, $limit );

			return $this->format_results( $results );
		} catch ( Exception $e ) {
			return [];
		}
	}

	/**
	 * Get Vector DB Instance
	 *
	 * @param string $provider Vector DB provider name.
	 * @return object|null Vector DB instance
	 */
	private function get_vector_db( $provider ) {
		require_once BACA_PATH . 'includes/class-baca-vector-db-factory.php';

		$settings = $this->get_settings();
		$config   = ! empty( $settings['vector_db'] ) ? $settings['vector_db'] : [];

		return BACA_Vector_DB_Factory::create( $provider, $config );
	}

	/**
	 * Format Search Results
	 *
	 * @param array $results Raw search results.
	 * @return array Formatted results with content
	 */
	private function format_results( $results ) {
		if ( empty( $results ) ) {
			return [];
		}

		$formatted = [];
		global $wpdb;

		$chunks_table    = esc_sql( $wpdb->prefix . 'baca_rag_chunks' );
		$documents_table = esc_sql( $wpdb->prefix . 'baca_rag_documents' );

		foreach ( $results as $result ) {
			$chunk = $wpdb->get_row(
				$wpdb->prepare(
					"SELECT * FROM {$chunks_table} WHERE id = %d",
					$result['chunk_id']
				),
				ARRAY_A
			);

			if ( $chunk ) {
				// Get document info for URL and title
				$document = $wpdb->get_row(
					$wpdb->prepare(
						"SELECT title, url FROM {$documents_table} WHERE document_id = %s",
						$chunk['document_id']
					),
					ARRAY_A
				);

				$formatted[] = [
					'chunk_id'   => $chunk['id'],
					'content'    => $chunk['content'],
					'similarity' => $result['similarity'] ?? 0,
					'title'      => $document['title'] ?? 'Unknown',
					'url'        => $document['url'] ?? '',
				];
			}
		}

		return $formatted;
	}

	/**
	 * Get Statistics
	 *
	 * @return array Statistics about indexed data
	 */
	public function get_statistics() {
		global $wpdb;

		$chunks_table    = esc_sql( $wpdb->prefix . 'baca_rag_chunks' );
		$documents_table = esc_sql( $wpdb->prefix . 'baca_rag_documents' );

		$total_chunks = $wpdb->get_var( "SELECT COUNT(*) FROM {$chunks_table}" );
		$total_documents = $wpdb->get_var( "SELECT COUNT(*) FROM {$documents_table}" );
		$pending_chunks = $wpdb->get_var( "SELECT COUNT(*) FROM {$chunks_table} WHERE embedding_status = 'pending'" );
		$completed_chunks = $wpdb->get_var( "SELECT COUNT(*) FROM {$chunks_table} WHERE embedding_status = 'completed'" );
		$total_tokens = $wpdb->get_var( "SELECT SUM(tokens_count) FROM {$chunks_table}" );

		return [
			'total_documents'   => $total_documents ?? 0,
			'total_chunks'      => $total_chunks ?? 0,
			'pending_embeddings' => $pending_chunks ?? 0,
			'completed_embeddings' => $completed_chunks ?? 0,
			'total_tokens'      => $total_tokens ?? 0,
		];
	}
}
