<?php
/**
 * BACA Indexer
 *
 * Handles document indexing and chunking for RAG system.
 *
 * @package Botisst
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * Class BACA_Indexer
 */
class BACA_Indexer
{

	/**
	 * Chunk Size (in characters)
	 *
	 * @var int
	 */
	private $chunk_size = 1000;

	/**
	 * Chunk Overlap (in characters)
	 *
	 * @var int
	 */
	private $chunk_overlap = 100;

	/**
	 * Embedding Provider
	 *
	 * @var mixed
	 */
	private $embedding_provider;

	/**
	 * Vector DB Adapter
	 *
	 * @var mixed
	 */
	private $vector_db;

	/**
	 * Constructor
	 */
	public function __construct()
	{
		$settings = $this->get_settings();

		if (!empty($settings['indexing']['chunk_size'])) {
			$this->chunk_size = intval(
				$settings['indexing']['chunk_size']
			);
		}

		if (!empty($settings['indexing']['chunk_overlap'])) {
			$this->chunk_overlap = intval(
				$settings['indexing']['chunk_overlap']
			);
		}

		require_once BACA_PATH .
			'includes/class-baca-embedding-manager.php';

		require_once BACA_PATH .
			'includes/class-baca-vector-db-factory.php';

		$this->embedding_provider =
			new BACA_Embedding_Manager();

		$provider =
			$settings['vector_db']['provider']
			?? 'sqlite';

		$config =
			$settings['vector_db']
			?? [];

		$this->vector_db =
			BACA_Vector_DB_Factory::create(
				$provider,
				$config
			);
	}

	/**
	 * Get Settings
	 *
	 * @return array
	 */
	private function get_settings()
	{
		$settings = BACA_Settings_Handler::baca_get_all_settings();
		return isset($settings['rag']) ? $settings['rag'] : [];
	}

	/**
	 * Index All Documents
	 *
	 * Indexes all configured post types.
	 *
	 * @return array Status of indexing operation
	 */
	public function index_all_documents()
	{
		global $wpdb;

		$settings = $this->get_settings();
		$sources = !empty($settings['post_types']) ? $settings['post_types'] : ['post', 'page'];

		if (empty($sources)) {
			return ['success' => false, 'message' => 'No indexing sources configured'];
		}

		return $this->index_documents_by_type($sources);
	}

	/**
	 * Index Documents by Specific Post Types
	 *
	 * @param array $post_types Array of post types to index.
	 * @return array Status of indexing operation
	 */
	public function index_documents_by_type($post_types = [])
	{
		global $wpdb;

		if (empty($post_types)) {
			return [
				'success' => false,
				'message' => 'No post types specified',
			];
		}

		$indexed = 0;
		$failed = 0;
		$errors = [];

		$this->update_metadata(
			'index_status',
			'running'
		);

		$this->update_metadata(
			'last_index_start',
			current_time('mysql')
		);

		$registered_types = get_post_types();
		$valid_post_types = array_intersect($post_types, $registered_types);
		$docs_table = esc_sql($wpdb->prefix . 'baca_rag_documents');

		/*
		 * Clean up post types that are not selected or no longer registered
		 */
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct database query on custom table.
		$db_post_types = $wpdb->get_col("SELECT DISTINCT post_type FROM {$docs_table}");

		if (!empty($db_post_types)) {
			foreach ($db_post_types as $db_post_type) {
				if (!in_array($db_post_type, $valid_post_types, true)) {
					// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct database query on custom table.
					$doc_ids = $wpdb->get_col(
						$wpdb->prepare(
							"SELECT document_id FROM {$docs_table} WHERE post_type = %s",
							$db_post_type
						)
					);
					if (!empty($doc_ids)) {
						foreach ($doc_ids as $doc_id) {
							$this->remove_document($doc_id);
						}
					}
				}
			}
		}

		foreach ($post_types as $post_type) {

			if (!in_array($post_type, $registered_types, true)) {
				continue;
			}

			try {

				$posts = get_posts(
					[
						'post_type' => sanitize_text_field(
							$post_type
						),
						'post_status' => 'publish',
						'posts_per_page' => -1,
						'orderby' => 'ID',
						'order' => 'ASC',
						'suppress_filters' => false,
					]
				);

				/*
				 * Clean up stale or deleted/unpublished posts of this post type
				 */
				// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct database read.
				$db_post_ids = $wpdb->get_col(
					$wpdb->prepare(
						"SELECT post_id FROM {$docs_table} WHERE post_type = %s",
						$post_type
					)
				);
				$db_post_ids = array_map('intval', $db_post_ids);

				$active_post_ids = [];
				if (!empty($posts)) {
					foreach ($posts as $post) {
						if (!empty($post->ID)) {
							$active_post_ids[] = intval($post->ID);
						}
					}
				}

				$posts_to_remove = array_diff($db_post_ids, $active_post_ids);
				foreach ($posts_to_remove as $remove_post_id) {
					$this->remove_document('post_' . $remove_post_id);
				}

				if (empty($posts)) {
					continue;
				}

				foreach ($posts as $post) {

					try {

						if (
							empty($post->ID)
						) {
							continue;
						}

						$result = $this->index_post(
							$post
						);

						if ($result) {

							$indexed++;

						} else {

							$failed++;

							$errors[] =
								'Failed Post ID: ' .
								$post->ID;
						}

					} catch (Exception $e) {

						$failed++;

						$errors[] =
							'Post ' .
							$post->ID .
							': ' .
							$e->getMessage();
					}
				}

			} catch (Exception $e) {

				$failed++;

				$errors[] =
					'Post Type ' .
					$post_type .
					': ' .
					$e->getMessage();

			}
		}

		$this->update_metadata(
			'last_index_time',
			current_time('mysql')
		);

		$this->update_metadata(
			'last_indexed_count',
			$indexed
		);

		$this->update_metadata(
			'last_failed_count',
			$failed
		);

		$this->update_metadata(
			'index_status',
			'completed'
		);

		$message = sprintf(
			'Indexed %d documents. Failed %d documents.',
			$indexed,
			$failed
		);

		if (!empty($errors)) {

			$message .=
				' First Errors: ' .
				implode(
					' | ',
					array_slice(
						$errors,
						0,
						3
					)
				);
		}

		return [
			'success' => ($indexed > 0),
			'indexed' => $indexed,
			'failed' => $failed,
			'errors' => $errors,
			'message' => $message,
		];
	}

	/**
	 * Index Single Post
	 *
	 * @param WP_Post $post Post object.
	 * @return bool Success status
	 */
	public function index_post($post)
	{

		if (!$post instanceof WP_Post) {
			return false;
		}

		if ('publish' !== $post->post_status) {
			return false;
		}

		try {

			$document_id = 'post_' . $post->ID;

			$current_hash = md5(
				$post->post_title .
				$post->post_content
			);

			$existing = $this->get_document(
				$document_id
			);

			if (
				$existing &&
				!empty($existing['hash']) &&
				$existing['hash'] === $current_hash
			) {
				return true;
			}

			/*
			 * Store document
			 */
			$this->store_document(
				[
					'document_id' => $document_id,
					'post_id' => $post->ID,
					'post_type' => $post->post_type,
					'title' => $post->post_title,
					'content' => $post->post_content,
					'excerpt' => $post->post_excerpt,
					'url' => get_permalink($post),
					'hash' => $current_hash,
					'indexed_at' => current_time('mysql'),
				]
			);

			/*
			 * Create chunks
			 */
			$chunks = $this->chunk_content(
				$post->post_content,
				$post->post_title
			);

			if (empty($chunks)) {
				return false;
			}

			/*
			 * Get embedding provider
			 */
			$embedding_provider =
				$this->embedding_provider;

			if (!$embedding_provider) {

				throw new Exception(
					'Embedding provider missing.'
				);
			}

			/*
			 * Get vector database
			 */
			$vector_db =
				$this->vector_db;

			if (!$vector_db) {

				throw new Exception(
					'Vector DB missing.'
				);
			}

			foreach ($chunks as $index => $chunk_data) {

				/*
				 * Save chunk
				 */
				$chunk_id = $this->store_chunk(
					$document_id,
					$index,
					$chunk_data
				);

				if (empty($chunk_id)) {
					continue;
				}

				$content = is_array($chunk_data)
					? ($chunk_data['content'] ?? '')
					: $chunk_data;

				if (empty($content)) {
					continue;
				}

				/*
				 * Generate embedding
				 */
				$embedding =
					$embedding_provider
						->embed(
							$content
						);

				if (
					empty($embedding) ||
					!is_array($embedding)
				) {

					throw new Exception(
						'Embedding generation failed for chunk: ' .
						$chunk_id
					);
				}

				/*
				 * Store vector
				 */
				$result =
					$vector_db->store_embedding(
						(string) $chunk_id,
						$embedding,
						$document_id
					);

				if (is_wp_error($result)) {

					throw new Exception(
						'Vector storage failed: ' .
						$result->get_error_message()
					);
				}
			}

			return true;

		} catch (Exception $e) {
			throw $e;
		}
	}

	/**
	 * Chunk Content
	 *
	 * Splits content into overlapping chunks.
	 *
	 * @param string $content Content to chunk.
	 * @param string $title   Document title (prepended to content).
	 * @return array Array of chunks
	 */
	private function chunk_content($content, $title = '')
	{
		// Combine title and content
		$full_content = $title . "\n\n" . $content;
		$full_content = wp_strip_all_tags($full_content);
		$full_content = preg_replace('/\s+/', ' ', $full_content); // Normalize whitespace

		$chunks = [];
		$length = strlen($full_content);

		if ($length <= $this->chunk_size) {
			return [
				[
					'content' => $full_content,
					'chunk_hash' => md5($full_content),
					'tokens_count' => $this->estimate_tokens($full_content),
				]
			];
		}

		$start = 0;
		$index = 0;

		while ($start < $length) {
			$end = min($start + $this->chunk_size, $length);
			$chunk = substr($full_content, $start, $this->chunk_size);
			$chunks[] = [
				'content' => trim($chunk),
				'chunk_index' => $index,
				'chunk_hash' => md5($chunk),
				'tokens_count' => $this->estimate_tokens($chunk),
			];

			// Move start position with overlap
			$start += ($this->chunk_size - $this->chunk_overlap);
			$index++;
		}

		return $chunks;
	}

	/**
	 * Estimate Tokens
	 *
	 * Rough estimate: ~4 characters = 1 token
	 *
	 * @param string $text Text to estimate.
	 * @return int Estimated token count
	 */
	private function estimate_tokens($text)
	{
		return ceil(strlen($text) / 4);
	}

	/**
	 * Store Document
	 *
	 * Stores document metadata.
	 *
	 * @param array $data Document data.
	 * @return bool|int Document ID on success
	 */
	private function store_document($data)
	{
		global $wpdb;

		try {
			$table = esc_sql($wpdb->prefix . 'baca_rag_documents');

			// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct database query on custom table.
			$existing = $wpdb->get_row(
				$wpdb->prepare(
					"SELECT id FROM {$table} WHERE document_id = %s", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table name is dynamic but safe.
					$data['document_id']
				)
			);

			// (Continue directly to insert_data, update/insert handles $existing check below)

			$insert_data = [
				'document_id' => $data['document_id'],
				'post_id' => $data['post_id'],
				'post_type' => $data['post_type'],
				'title' => $data['title'],
				'content' => $data['content'],
				'excerpt' => $data['excerpt'],
				'url' => $data['url'],
				'hash' => $data['hash'],
				'indexed_at' => $data['indexed_at'],
				'embedding_status' => 'pending',
			];

			if ($existing) {
				// Update
				// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct update to custom table.
				$result = $wpdb->update(
					$table,
					$insert_data,
					['document_id' => $data['document_id']],
					['%s', '%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s']
				);
				if (false === $result) {
				}
				return $existing->id;
			} else {
				// Insert
				// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery -- Direct insert to custom table.
				$result = $wpdb->insert(
					$table,
					$insert_data,
					['%s', '%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s']
				);
				if (false === $result) {
					return false;
				}
				return $wpdb->insert_id;
			}
		} catch (Exception $e) {
			return false;
		}
	}

	/**
	 * Store Chunk
	 *
	 * Stores a document chunk.
	 *
	 * @param string $document_id Document ID.
	 * @param int    $index       Chunk index.
	 * @param array  $chunk_data  Chunk data.
	 * @return bool|int Chunk ID on success
	 */
	private function store_chunk($document_id, $index, $chunk_data)
	{

		global $wpdb;

		try {

			$table = esc_sql(
				$wpdb->prefix . 'baca_rag_chunks'
			);

			/*
			 * Check existing chunk
			 */
			// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct database query on custom table.
			$existing = $wpdb->get_var(
				$wpdb->prepare(
					"SELECT id FROM {$table} WHERE document_id = %s AND chunk_index = %d", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table name is dynamic but safe.
					$document_id,
					$index
				)
			);

			$insert_data = [
				'document_id' => $document_id,
				'chunk_index' => $index,
				'content' => $chunk_data['content'] ?? '',
				'chunk_hash' => $chunk_data['chunk_hash']
					?? md5($chunk_data['content'] ?? ''),
				'tokens_count' => $chunk_data['tokens_count']
					?? $this->estimate_tokens(
						$chunk_data['content'] ?? ''
					),
				'embedding_status' => 'pending',
			];

			/*
			 * Update existing chunk
			 */
			if ($existing) {

				// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct update to custom table.
				$result = $wpdb->update(
					$table,
					$insert_data,
					[
						'id' => $existing,
					],
					[
						'%s',
						'%d',
						'%s',
						'%s',
						'%d',
						'%s',
					],
					[
						'%d',
					]
				);

				if (false === $result) {
					return false;
				}

				return (int) $existing;
			}

			/*
			 * Insert new chunk
			 */
			// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery -- Direct insert to custom table.
			$result = $wpdb->insert(
				$table,
				$insert_data,
				[
					'%s',
					'%d',
					'%s',
					'%s',
					'%d',
					'%s',
				]
			);

			if (false === $result) {
				return false;
			}

			return (int) $wpdb->insert_id;

		} catch (Exception $e) {
			return false;
		}
	}

	/**
	 * Get Document
	 *
	 * @param string $document_id Document ID.
	 * @return array|null Document data or null
	 */
	private function get_document($document_id)
	{
		global $wpdb;

		$table = esc_sql($wpdb->prefix . 'baca_rag_documents');

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct database query on custom table.
		$result = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT * FROM {$table} WHERE document_id = %s", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table name is dynamic but safe.
				$document_id
			),
			ARRAY_A
		);

		return $result;
	}

	/**
	 * Remove Document
	 *
	 * Removes a document and its chunks.
	 *
	 * @param string $document_id Document ID.
	 * @return bool Success status
	 */
	public function remove_document($document_id)
	{
		global $wpdb;

		$docs_table = esc_sql($wpdb->prefix . 'baca_rag_documents');
		$chunks_table = esc_sql($wpdb->prefix . 'baca_rag_chunks');

		// Get all chunk IDs first to delete from vector DB
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct read query from custom table.
		$chunk_ids = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT id FROM {$chunks_table} WHERE document_id = %s", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table name is dynamic but safe.
				$document_id
			)
		);

		if (!empty($chunk_ids) && $this->vector_db) {
			$this->vector_db->bulk_delete(array_map('intval', $chunk_ids));
		}

		// Remove chunks
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct deletion from custom table.
		$wpdb->delete(
			$chunks_table,
			['document_id' => $document_id],
			['%s']
		);

		// Remove document
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct deletion from custom table.
		$wpdb->delete(
			$docs_table,
			['document_id' => $document_id],
			['%s']
		);

		return true;
	}

	/**
	 * Generate Embeddings for Pending Chunks
	 *
	 * @return array Status with count of processed chunks
	 */
	public function generate_pending_embeddings()
	{

		global $wpdb;

		require_once BACA_PATH .
			'includes/class-baca-embedding-manager.php';

		require_once BACA_PATH .
			'includes/class-baca-vector-db-factory.php';

		$chunks_table = esc_sql(
			$wpdb->prefix . 'baca_rag_chunks'
		);

		$settings = $this->get_settings();

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct database query on custom table.
		$pending_chunks = $wpdb->get_results(
			"SELECT * FROM {$chunks_table} WHERE embedding_status = 'pending' LIMIT 50", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table name is dynamic but safe.
			ARRAY_A
		);

		if (empty($pending_chunks)) {

			return [
				'processed' => 0,
				'failed' => 0,
				'message' => 'No pending chunks found',
			];
		}

		$embedding_manager =
			new BACA_Embedding_Manager();

		$provider =
			$settings['vector_db']['provider']
			?? 'sqlite';

		$config =
			$settings['vector_db']
			?? [];

		$vector_db =
			BACA_Vector_DB_Factory::create(
				$provider,
				$config
			);

		if (!$vector_db) {

			return [
				'processed' => 0,
				'failed' => count($pending_chunks),
				'message' => 'Failed to initialize vector database',
			];
		}

		$processed = 0;
		$failed = 0;

		foreach ($pending_chunks as $chunk) {

			try {

				if (empty($chunk['content'])) {

					$failed++;

					continue;
				}

				/*
				 * Generate embedding
				 */
				$embedding =
					$embedding_manager->embed(
						$chunk['content']
					);

				if (
					empty($embedding) ||
					!is_array($embedding)
				) {

					// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct update to custom table status.
					$wpdb->update(
						$chunks_table,
						[
							'embedding_status' => 'failed',
						],
						[
							'id' => $chunk['id'],
						]
					);

					$failed++;

					continue;
				}

				/*
				 * Store vector
				 */
				$result =
					$vector_db->store_embedding(
						(string) $chunk['id'],
						$embedding,
						$chunk['document_id'] ?? ''
					);

				if (is_wp_error($result)) {
					// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct update to custom table status.
					$wpdb->update(
						$chunks_table,
						[
							'embedding_status' => 'failed',
						],
						[
							'id' => $chunk['id'],
						]
					);

					$failed++;

					continue;
				}

				/*
				 * Mark completed
				 */
				// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct update to custom table status.
				$wpdb->update(
					$chunks_table,
					[
						'embedding_status' => 'completed',
						'vector_id' => $chunk['id'],
					],
					[
						'id' => $chunk['id'],
					]
				);

				$processed++;

			} catch (Exception $e) {
				// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct update to custom table status.
				$wpdb->update(
					$chunks_table,
					[
						'embedding_status' => 'failed',
					],
					[
						'id' => $chunk['id'],
					]
				);

				$failed++;
			}
		}

		return [
			'processed' => $processed,
			'failed' => $failed,
			'message' => sprintf(
				'Processed %d embeddings, failed %d',
				$processed,
				$failed
			),
		];
	}

	/**
	 * Update Metadata
	 *
	 * @param string $key   Metadata key.
	 * @param string $value Metadata value.
	 * @return void
	 */
	private function update_metadata($key, $value)
	{
		global $wpdb;

		$table = esc_sql($wpdb->prefix . 'baca_rag_metadata');

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct database query on custom table.
		$wpdb->query(
			$wpdb->prepare(
				"INSERT INTO {$table} (meta_key, meta_value) VALUES (%s, %s) ON DUPLICATE KEY UPDATE meta_value = VALUES(meta_value), updated_at = CURRENT_TIMESTAMP", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table name is dynamic but safe.
				$key,
				$value
			)
		);
	}
}
