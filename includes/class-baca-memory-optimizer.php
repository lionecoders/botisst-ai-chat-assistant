<?php
/**
 * BACA Memory Optimizer
 *
 * Manages low-token conversation memory using:
 * - Last 4 messages for context continuity
 * - Conversation summaries for historical context
 * - RAG for knowledge base retrieval
 * - Current question for immediate context
 *
 * Estimates ~60-80% token reduction vs full history
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class BACA_Memory_Optimizer {

	private static $instance = null;
	private $summary_key = 'baca_conversation_summary_';
	private $messages_limit = 4; // Last 4 messages for continuity
	private $summary_max_tokens = 300; // Keep summaries under 300 tokens

	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Build optimized conversation context
	 *
	 * @param string $session_id Session ID.
	 * @param string $current_question Current user question.
	 * @param string $rag_context RAG-retrieved context.
	 * @return array Optimized context structure.
	 */
	public function build_optimized_context( $session_id, $current_question, $rag_context = '' ) {
		$recent_messages = $this->get_recent_messages( $session_id, $this->messages_limit );
		$conversation_summary = $this->get_conversation_summary( $session_id );

		return [
			'summary'           => $conversation_summary,
			'recent_messages'   => $recent_messages,
			'current_question'  => $current_question,
			'rag_context'       => $rag_context,
			'tokens_estimate'   => $this->estimate_tokens( $recent_messages, $conversation_summary, $rag_context ),
		];
	}

	/**
	 * Get last N messages from session
	 *
	 * @param string $session_id Session ID.
	 * @param int    $limit Number of messages to retrieve.
	 * @return array Recent messages.
	 */
	private function get_recent_messages( $session_id, $limit = 4 ) {
		global $wpdb;

		if ( empty( $session_id ) ) {
			return [];
		}

		$table = esc_sql( $wpdb->prefix . 'baca_sessions' );

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct database query on custom table.
		$messages_json = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT content FROM {$table} WHERE session_id = %s LIMIT 1", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table name is dynamic but safe.
				$session_id
			)
		);

		if ( empty( $messages_json ) ) {
			return [];
		}

		$messages = json_decode( $messages_json, true );

		if ( ! is_array( $messages ) || empty( $messages ) ) {
			return [];
		}

		// Get last N messages
		$recent = array_slice( $messages, -$limit );

		$formatted = [];
		foreach ( $recent as $msg ) {
			if ( ! empty( $msg['content'] ) && ! empty( $msg['role'] ) ) {
				$formatted[] = [
					'role'    => $msg['role'],
					'content' => wp_strip_all_tags( $msg['content'] ),
				];
			}
		}

		return $formatted;
	}

	/**
	 * Get or generate conversation summary
	 *
	 * Summarizes conversation topics and key points
	 *
	 * @param string $session_id Session ID.
	 * @return string Conversation summary or empty string.
	 */
	private function get_conversation_summary( $session_id ) {
		if ( empty( $session_id ) ) {
			return '';
		}

		// Check cache first
		$cache_key = $this->summary_key . md5( $session_id );
		$cached = get_transient( $cache_key );

		if ( false !== $cached ) {
			return $cached;
		}

		global $wpdb;
		$table = esc_sql( $wpdb->prefix . 'baca_sessions' );

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct database query on custom table.
		$messages_json = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT content FROM {$table} WHERE session_id = %s LIMIT 1", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table name is dynamic but safe.
				$session_id
			)
		);

		if ( empty( $messages_json ) ) {
			return '';
		}

		$messages = json_decode( $messages_json, true );

		if ( ! is_array( $messages ) || count( $messages ) < 5 ) {
			return ''; // Not enough messages to summarize
		}

		// Generate summary from message topics
		$summary = $this->generate_summary_from_messages( $messages );

		// Cache for 6 hours
		set_transient( $cache_key, $summary, 6 * HOUR_IN_SECONDS );

		return $summary;
	}

	/**
	 * Generate summary from conversation messages
	 *
	 * @param array $messages Array of messages.
	 * @return string Summary text.
	 */
	private function generate_summary_from_messages( $messages ) {
		$topics = [];
		$user_questions = [];

		foreach ( $messages as $msg ) {
			if ( empty( $msg['content'] ) || empty( $msg['role'] ) ) {
				continue;
			}

			if ( 'user' === $msg['role'] ) {
				$user_questions[] = $msg['content'];
			}
		}

		if ( empty( $user_questions ) ) {
			return '';
		}

		// Extract common topics from user questions
		$summary = 'Conversation topics covered: ';
		$summary .= implode( ', ', array_slice( $user_questions, 0, 3 ) );

		return substr( $summary, 0, $this->summary_max_tokens * 4 ); // Rough estimate: 1 token ≈ 4 chars
	}

	/**
	 * Estimate tokens in context
	 *
	 * Rough estimation: 1 token ≈ 4 characters
	 *
	 * @param array  $recent_messages Recent messages.
	 * @param string $summary Summary.
	 * @param string $rag_context RAG context.
	 * @return int Estimated token count.
	 */
	private function estimate_tokens( $recent_messages, $summary, $rag_context ) {
		$total_chars = 0;

		foreach ( $recent_messages as $msg ) {
			$total_chars += strlen( wp_json_encode( $msg ) );
		}

		$total_chars += strlen( $summary );
		$total_chars += strlen( $rag_context );

		// Rough estimate: 1 token = 4 characters
		return ceil( $total_chars / 4 );
	}

	/**
	 * Format memory for system prompt injection
	 *
	 * @param array $context Optimized context from build_optimized_context().
	 * @return string Formatted memory for AI prompt.
	 */
	public function format_for_prompt( $context ) {
		$memory = '';

		// Add conversation summary if available
		if ( ! empty( $context['summary'] ) ) {
			$memory .= "\n## Conversation Context\n";
			$memory .= $context['summary'] . "\n";
		}

		// Add recent messages for immediate context
		if ( ! empty( $context['recent_messages'] ) && count( $context['recent_messages'] ) > 0 ) {
			$memory .= "\n## Recent Messages\n";
			foreach ( $context['recent_messages'] as $msg ) {
				$role = 'user' === $msg['role'] ? 'User' : 'Assistant';
				$memory .= "$role: " . substr( $msg['content'], 0, 200 ) . "\n";
			}
		}

		// Add RAG context
		if ( ! empty( $context['rag_context'] ) ) {
			$memory .= "\n## Knowledge Base Information\n";
			$memory .= $context['rag_context'] . "\n";
		}

		// Add current question context
		if ( ! empty( $context['current_question'] ) ) {
			$memory .= "\n## Current Question\n";
			$memory .= $context['current_question'] . "\n";
		}

		return trim( $memory );
	}

}
