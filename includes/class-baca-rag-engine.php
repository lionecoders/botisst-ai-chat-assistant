<?php
/**
 * BACA RAG Engine
 *
 * Main orchestrator for RAG (Retrieval-Augmented Generation) system.
 * Handles document indexing, retrieval, and context enhancement for AI responses.
 *
 * @package Botisst
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class BACA_RAG_Engine
 */
class BACA_RAG_Engine {

	/**
	 * Instance
	 *
	 * @var self|null
	 */
	private static $instance = null;

	/**
	 * Indexer
	 *
	 * @var BACA_Indexer
	 */
	private $indexer = null;

	/**
	 * Retriever
	 *
	 * @var BACA_Retriever
	 */
	private $retriever = null;

	/**
	 * Embedding Manager
	 *
	 * @var BACA_Embedding_Manager
	 */
	private $embedding_manager = null;

	/**
	 * Get Instance (Singleton)
	 *
	 * @return self
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor
	 */
	private function __construct() {
		// Load dependencies
		require_once BACA_PATH . 'includes/class-baca-indexer.php';
		require_once BACA_PATH . 'includes/class-baca-retriever.php';
		require_once BACA_PATH . 'includes/class-baca-embedding-manager.php';

		$this->indexer             = new BACA_Indexer();
		$this->retriever           = new BACA_Retriever();
		$this->embedding_manager   = new BACA_Embedding_Manager();
	}

	/**
	 * Process Pending Embeddings
	 *
	 * Generates embeddings for all pending chunks.
	 *
	 * @return array Status of embedding generation
	 */
	public function process_pending_embeddings() {
		if ( ! $this->is_enabled() ) {
			return [ 'success' => false, 'message' => 'RAG system is not enabled' ];
		}

		return $this->indexer->generate_pending_embeddings();
	}

	/**
	 * Initialize RAG System
	 *
	 * Sets up hooks and scheduled tasks for RAG system.
	 *
	 * @return void
	 */
	public function init() {
		if ( ! $this->is_enabled() ) {
			return;
		}

		add_action( 'baca_rag_auto_index', [ $this, 'auto_index_documents' ] );
		add_action( 'baca_rag_process_embeddings', [ $this, 'process_pending_embeddings' ] );
		add_action( 'baca_rag_reindex_post', [ $this, 'on_post_reindex' ], 10, 1 );
		add_action( 'transition_post_status', [ $this, 'on_post_status_change' ], 10, 3 );
		add_action( 'delete_post', [ $this, 'on_post_delete' ], 10, 1 );
		add_action( 'activate_plugin', [ $this, 'on_plugin_change' ] );
		add_action( 'deactivate_plugin', [ $this, 'on_plugin_change' ] );
		add_action( 'delete_plugin', [ $this, 'on_plugin_change' ] );
	}

	/**
	 * Check if RAG is Enabled
	 *
	 * @return bool
	 */
	public function is_enabled() {
		$settings = BACA_Settings_Handler::baca_get_all_settings();
		return ! empty( $settings['rag']['enabled'] );
	}

	/**
	 * Get Settings
	 *
	 * @return array
	 */
	public function get_settings() {
		$settings = BACA_Settings_Handler::baca_get_all_settings();
		return isset( $settings['rag'] ) ? $settings['rag'] : [];
	}

	/**
	 * Retrieve Context for Chat
	 *
	 * Retrieves relevant documents and context for a given query.
	 *
	 * @param string $query The user query.
	 * @param int    $limit Maximum number of documents to retrieve.
	 * @return array Array of relevant documents and their content.
	 */
	public function retrieve_context( $query, $limit = 5 ) {
		if ( ! $this->is_enabled() ) {
			return [];
		}

		try {
			$query_embedding = $this->embedding_manager->embed( $query );
			if ( ! $query_embedding ) {
				return [];
			}

			$documents = $this->retriever->search( $query_embedding, $limit );

			return $documents;
		} catch ( Exception $e ) {
			return [];
		}
	}

	/**
	 * Get Indexer
	 *
	 * @return BACA_Indexer
	 */
	public function get_indexer() {
		return $this->indexer;
	}

	/**
	 * Get Retriever
	 *
	 * @return BACA_Retriever
	 */
	public function get_retriever() {
		return $this->retriever;
	}

	/**
	 * Auto Index Documents
	 *
	 * Triggered by scheduled event.
	 *
	 * @return void
	 */
	public function auto_index_documents() {
		$settings = $this->get_settings();
		if ( empty( $settings['indexing']['auto_update'] ) ) {
			return;
		}

		$this->indexer->index_all_documents();
		$this->process_pending_embeddings();
	}

	/**
	 * Handle Post Status Change
	 *
	 * Reindex when post is published, remove when trashed/private/deleted.
	 *
	 * @param string  $new_status New post status.
	 * @param string  $old_status Old post status.
	 * @param WP_Post $post       Post object.
	 * @return void
	 */
	public function on_post_status_change( $new_status, $old_status, $post ) {
		if ( ! $this->is_enabled() ) {
			return;
		}

		$settings = $this->get_settings();
		if ( empty( $settings['indexing']['auto_update'] ) ) {
			return;
		}

		// Only handle posts/pages
		$configured_types = ! empty( $settings['post_types'] ) ? $settings['post_types'] : [ 'post', 'page' ];
		if ( ! in_array( $post->post_type, $configured_types, true ) ) {
			return;
		}

		// If transitioning TO publish, reindex
		if ( 'publish' === $new_status ) {
			wp_schedule_single_event( time(), 'baca_rag_reindex_post', [ $post->ID ] );
		}

		// If transitioning FROM publish TO non-public (trash/private/draft), remove from index
		if ( 'publish' === $old_status && 'publish' !== $new_status ) {
			$this->indexer->remove_document( 'post_' . $post->ID );
		}
	}

	/**
	 * Handle Post Permanent Delete
	 *
	 * Removes post from RAG index when permanently deleted.
	 *
	 * @param int $post_id Post ID.
	 * @return void
	 */
	public function on_post_delete( $post_id ) {
		if ( ! $this->is_enabled() ) {
			return;
		}

		// Remove from RAG index
		$this->indexer->remove_document( 'post_' . $post_id );
	}

	/**
	 * Handle Plugin Activation/Deactivation/Deletion
	 *
	 * Triggers full reindex when any plugin changes.
	 *
	 * @return void
	 */
	public function on_plugin_change() {
		if ( ! $this->is_enabled() ) {
			return;
		}

		$settings = $this->get_settings();
		if ( empty( $settings['indexing']['auto_update'] ) ) {
			return;
		}

		// Schedule full reindex (5 minutes delay)
		wp_schedule_single_event( time() + 300, 'baca_rag_auto_index' );
	}

	/**
	 * Handle Post Reindex
	 *
	 * @param int $post_id Post ID.
	 * @return void
	 */
	public function on_post_reindex( $post_id ) {
		if ( ! $this->is_enabled() ) {
			return;
		}

		$post = get_post( $post_id );
		if ( ! $post ) {
			return;
		}

		$this->indexer->index_post( $post );
		$this->process_pending_embeddings();
	}

}
