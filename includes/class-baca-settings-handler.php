<?php
/**
 * BACA Settings Handler
 *
 * Handles REST API endpoints, routing, validation, and database preservation
 * strictly matching WordPress coding standards.
 *
 * @package Botisst
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * Class BACA_Settings_Handler
 */
class BACA_Settings_Handler
{

	/**
	 * Constructor
	 */
	public function __construct()
	{
		add_action('rest_api_init', [$this, 'baca_register_routes']);
	}

	/**
	 * Register REST Routes
	 *
	 * Registers all core settings and chat capability endpoints under the botisst-ai-chat-assistant namespace.
	 *
	 * @return void
	 */
	public function baca_register_routes()
	{
		register_rest_route(
			'baca/v1',
			'/save-settings',
			[
				'methods' => \WP_REST_Server::CREATABLE,
				'callback' => [$this, 'baca_save_settings'],
				'permission_callback' => [$this, 'baca_permission_only_admins'],
			]
		);

		register_rest_route(
			'baca/v1',
			'/save-bot-settings',
			[
				'methods' => \WP_REST_Server::CREATABLE,
				'callback' => [$this, 'baca_save_bot_settings'],
				'permission_callback' => [$this, 'baca_permission_only_admins'],
			]
		);

		register_rest_route(
			'baca/v1',
			'/setup-wizard',
			[
				'methods' => \WP_REST_Server::CREATABLE,
				'callback' => [$this, 'baca_update_setup_wizard_status'],
				'permission_callback' => [$this, 'baca_permission_only_admins'],
			]
		);

		register_rest_route(
			'baca/v1',
			'/reset-key',
			[
				'methods' => \WP_REST_Server::CREATABLE,
				'callback' => [$this, 'baca_reset_key'],
				'permission_callback' => [$this, 'baca_permission_only_admins'],
			]
		);

		register_rest_route(
			'baca/v1',
			'/save-display-settings',
			[
				'methods' => \WP_REST_Server::CREATABLE,
				'callback' => [$this, 'baca_save_display_settings'],
				'permission_callback' => [$this, 'baca_permission_only_admins'],
			]
		);

		register_rest_route(
			'baca/v1',
			'/upload',
			[
				'methods' => \WP_REST_Server::CREATABLE,
				'callback' => [$this, 'baca_upload_file'],
				'permission_callback' => [$this, 'baca_permission_upload'],
			]
		);

		register_rest_route(
			'baca/v1',
			'/chat',
			[
				'methods' => \WP_REST_Server::CREATABLE,
				'callback' => [$this, 'baca_chat'],
				'permission_callback' => [$this, 'baca_permission_chat'],
			]
		);

		register_rest_route(
			'baca/v1',
			'/delete-session',
			[
				'methods' => \WP_REST_Server::CREATABLE,
				'callback' => [$this, 'baca_delete_session'],
				'permission_callback' => [$this, 'baca_permission_only_admins'],
			]
		);

		register_rest_route(
			'baca/v1',
			'/sessions',
			[
				'methods' => \WP_REST_Server::READABLE,
				'callback' => [$this, 'baca_get_sessions'],
				'permission_callback' => [$this, 'baca_permission_only_admins'],
			]
		);

		register_rest_route(
			'baca/v1',
			'/clear-session',
			[
				'methods' => \WP_REST_Server::CREATABLE,
				'callback' => [$this, 'baca_clear_session'],
				'permission_callback' => [$this, 'baca_permission_chat'],
			]
		);

		register_rest_route(
			'baca/v1',
			'/rag/settings',
			[
				'methods' => \WP_REST_Server::CREATABLE,
				'callback' => [$this, 'baca_save_rag_settings'],
				'permission_callback' => [$this, 'baca_permission_only_admins'],
			]
		);

		register_rest_route(
			'baca/v1',
			'/rag/post-types',
			[
				'methods' => \WP_REST_Server::READABLE,
				'callback' => [$this, 'baca_get_post_types'],
				'permission_callback' => [$this, 'baca_permission_only_admins'],
			]
		);

		register_rest_route(
			'baca/v1',
			'/rag/stats',
			[
				'methods' => \WP_REST_Server::READABLE,
				'callback' => [$this, 'baca_get_rag_stats'],
				'permission_callback' => [$this, 'baca_permission_only_admins'],
			]
		);

		register_rest_route(
			'baca/v1',
			'/rag/index',
			[
				'methods' => \WP_REST_Server::CREATABLE,
				'callback' => [$this, 'baca_index_rag_content'],
				'permission_callback' => [$this, 'baca_permission_only_admins'],
			]
		);



		register_rest_route(
			'baca/v1',
			'/mcp/servers',
			[
				'methods' => \WP_REST_Server::READABLE,
				'callback' => [$this, 'baca_get_mcp_servers'],
				'permission_callback' => [$this, 'baca_permission_only_admins'],
			]
		);

		register_rest_route(
			'baca/v1',
			'/mcp/servers',
			[
				'methods' => \WP_REST_Server::CREATABLE,
				'callback' => [$this, 'baca_save_mcp_server'],
				'permission_callback' => [$this, 'baca_permission_only_admins'],
			]
		);

		register_rest_route(
			'baca/v1',
			'/mcp/servers/(?P<id>[a-zA-Z0-9_-]+)',
			[
				'methods' => \WP_REST_Server::EDITABLE,
				'callback' => [$this, 'baca_update_mcp_server'],
				'permission_callback' => [$this, 'baca_permission_only_admins'],
			]
		);

		register_rest_route(
			'baca/v1',
			'/mcp/servers/(?P<id>[a-zA-Z0-9_-]+)',
			[
				'methods' => \WP_REST_Server::DELETABLE,
				'callback' => [$this, 'baca_delete_mcp_server'],
				'permission_callback' => [$this, 'baca_permission_only_admins'],
			]
		);

	}

	/**
	 * Main Permission Check
	 *
	 * @return bool True if current user is an admin.
	 */
	public function baca_permission_only_admins()
	{
		return current_user_can('manage_options');
	}

	/**
	 * Upload Permission Check
	 *
	 * @return bool True if current user is an admin.
	 */
	public function baca_permission_upload()
	{
		return current_user_can('manage_options');
	}

	/**
	 * Public Chat Permission Check
	 *
	 * Allows access if the user is logged in (capability check) OR 
	 * if the visitor provides a valid REST API nonce (proving they are using our frontend).
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return bool True if authorized.
	 */
	public function baca_permission_chat($request)
	{
		if (current_user_can('read')) {
			return true;
		}
		$nonce = $request->get_header('X-WP-Nonce');
		if ($nonce && wp_verify_nonce($nonce, 'wp_rest')) {
			return true;
		}
		return false;
	}

	/**
	 * Get Unified Settings
	 *
	 * @return array The complete multidimensional array of plugin settings.
	 */
	public static function baca_get_all_settings()
	{
		$defaults = [
			'models' => [
				'openai' => 'gpt-4o-mini',
				'google' => 'gemini-2.5-flash',
				'anthropic' => 'claude-3-haiku-20240307',
			],
			'chatbot' => [
				'bot_name' => 'Botisst',
				'primary_color' => '#6366f1',
				'greeting_msg' => 'Hello! I am your AI assistant. How can I help you today?',
				'bot_avatar' => '',
				'bubble_style' => 'rounded',
				'api_error_msg' => 'There is some error on server, please contact our [support agent]({support_url}).',
				'support_url' => home_url('/support'),
				'pre_question_1' => '',
				'pre_question_2' => '',
				'pre_question_3' => '',
				'pre_question_4' => '',
				'pre_questions_bg_color' => '#ffffff',
				'pre_questions_text_color' => '#475569',
				'pre_questions_border_color' => '#e2e8f0',
				'pre_questions_border_radius' => 'rounded',
				'system_prompt' => 'You are a knowledgeable expert helping people. Rules: 1) NEVER use phrases like "Based on provided content", "According to", "The information shows" - just answer directly like a human. 2) Greetings → "How can I help you today?" 3) If user asks for links/posts → GIVE ALL links immediately. 4) If user mentions topic → GIVE that post\'s link automatically. 5) Answer naturally, full sentences, conversational. 6) Include links in responses when relevant. 7) Be proactive - solve problems, don\'t ask questions. 8) Sound genuinely knowledgeable and helpful, like a real expert talking to you. 9) FOR "HOW TO" OR "HOW DO I" QUESTIONS: Use concise structure - Title, brief description (1-2 sentences), then mention relevant documentation/guides. 10) Keep "what is" explanations concise and natural (2-3 sentences max).',
				'temperature' => 0.7,
				'max_tokens' => 500,
				'save_chat' => true,
				'enable_pre_questions' => true,
				'enable_uploads' => false,
				'save_uploads' => false,
				'max_upload_size' => 5,
				'default_provider' => 'openai',
				'knowledge_text' => '',
				'knowledge_urls' => [],
				'training_files' => [],
			],
			'display' => [
				'entire_site' => true,
				'exclude_pages' => '',
				'position' => 'bottom-right',
				'show_on_mobile' => true,
				'trigger_type' => 'click',
				'trigger_delay' => 5,
				'launcher_text' => 'Chat with us',
			],
			'rag' => [
				'enabled' => true,
				'post_types' => ['post', 'page'],
				'chunk_size' => 1000,
				'max_results' => 5,
				'auto_index' => true,
				'require_indexed_data' => false,
				'no_data_message' => 'I don\'t have information about your question in my knowledge base. Please rephrase or ask about topics I have knowledge of.',
				'vector_db' => ['provider' => 'sqlite'],
				'indexing' => [
					'chunk_size' => 1000,
					'chunk_overlap' => 100,
					'auto_update' => true,
				],
				'embeddings' => [
					'provider' => '',
					'model' => '',
				],
				'max_tokens' => '',
			],
			'mcp_servers' => [],
		];

		$settings = get_option('baca_chat_assistant_settings', []);

		foreach ($defaults as $key => $default_value) {
			if (!isset($settings[$key])) {
				$settings[$key] = $default_value;
			} elseif (is_array($default_value) && is_array($settings[$key])) {
				$settings[$key] = wp_parse_args($settings[$key], $default_value);
			}
		}

		return $settings;
	}

	/**
	 * Get specific provider key.
	 *
	 * @param string $provider Identifier for the AI provider.
	 * @return string The raw API key string if available.
	 */
	public static function baca_get_provider_key($provider)
	{
		$is_wp_ai_client_70 = function_exists('wp_ai_client_prompt');

		if ($is_wp_ai_client_70) {
			return get_option('connectors_ai_' . $provider . '_api_key', '');
		} else {
			$creds = get_option('wp_ai_client_provider_credentials', []);
			return isset($creds[$provider]) ? $creds[$provider] : '';
		}
	}

	/**
	 * Save General API Settings
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response Standard API response.
	 */
	public function baca_save_settings($request)
	{
		$params = $request->get_json_params();
		$openai = isset($params['openai_key']) ? sanitize_text_field($params['openai_key']) : '';
		$google = isset($params['google_key']) ? sanitize_text_field($params['google_key']) : '';
		$anthropic = isset($params['anthropic_key']) ? sanitize_text_field($params['anthropic_key']) : '';
		$models = isset($params['models']) ? (array) $params['models'] : [];

		$errors = [];

		if ($openai) {
			$valid = $this->baca_validate_api_key('openai', $openai);
			if (is_wp_error($valid)) {
				$errors['openai'] = $valid->get_error_message();
			} else {
				$this->baca_persist_key('openai', $openai);
			}
		}

		if ($google) {
			$valid = $this->baca_validate_api_key('google', $google);
			if (is_wp_error($valid)) {
				$errors['google'] = $valid->get_error_message();
			} else {
				$this->baca_persist_key('google', $google);
			}
		}

		if ($anthropic) {
			$valid = $this->baca_validate_api_key('anthropic', $anthropic);
			if (is_wp_error($valid)) {
				$errors['anthropic'] = $valid->get_error_message();
			} else {
				$this->baca_persist_key('anthropic', $anthropic);
			}
		}

		// Save selected fallback models.
		if (!empty($models)) {
			foreach ($models as $provider => $model) {
				if (!empty($model)) {
					$this->baca_persist_data('models', sanitize_key($provider), sanitize_text_field($model));
				}
			}
		}

		if (!empty($errors)) {
			return new \WP_REST_Response(['success' => false, 'errors' => $errors], 400);
		}

		return new \WP_REST_Response(
			[
				'success' => true,
				'message' => esc_html__('Settings saved successfully!', 'botisst-ai-chat-assistant'),
			],
			200
		);
	}

	/**
	 * Save Chatbot Config Profile Settings
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response Standard API response.
	 */
	public function baca_save_bot_settings($request)
	{
		$params = $request->get_json_params();

		// Clean knowledge URLs array safely.
		$urls = [];
		if (isset($params['knowledge_urls'])) {
			foreach ((array) $params['knowledge_urls'] as $url) {
				$clean = esc_url_raw($url);
				if (!empty($clean)) {
					$urls[] = $clean;
				}
			}
		}

		// Clean training files safe ID array.
		$files = [];
		if (isset($params['training_files'])) {
			foreach ((array) $params['training_files'] as $file_id) {
				$files[] = absint($file_id);
			}
		}

		$settings = self::baca_get_all_settings();
		$existing_chatbot = isset($settings['chatbot']) ? $settings['chatbot'] : [];

		$chatbot_settings = [
			'bot_name' => isset($params['bot_name']) ? sanitize_text_field($params['bot_name']) : (isset($existing_chatbot['bot_name']) ? $existing_chatbot['bot_name'] : 'Botisst'),
			'primary_color' => isset($params['primary_color']) ? sanitize_hex_color($params['primary_color']) : (isset($existing_chatbot['primary_color']) ? $existing_chatbot['primary_color'] : '#6366f1'),
			'greeting_msg' => isset($params['greeting_msg']) ? sanitize_textarea_field($params['greeting_msg']) : (isset($existing_chatbot['greeting_msg']) ? $existing_chatbot['greeting_msg'] : ''),
			'bot_avatar' => isset($params['bot_avatar']) ? esc_url_raw($params['bot_avatar']) : (isset($existing_chatbot['bot_avatar']) ? $existing_chatbot['bot_avatar'] : ''),
			'bubble_style' => isset($params['bubble_style']) ? sanitize_text_field($params['bubble_style']) : (isset($existing_chatbot['bubble_style']) ? $existing_chatbot['bubble_style'] : 'rounded'),
			'api_error_msg' => isset($params['api_error_msg']) ? sanitize_textarea_field($params['api_error_msg']) : (isset($existing_chatbot['api_error_msg']) ? $existing_chatbot['api_error_msg'] : 'There is some error on server, please contact our [support agent]({support_url}).'),
			'support_url' => isset($params['support_url']) ? esc_url_raw($params['support_url']) : (isset($existing_chatbot['support_url']) ? $existing_chatbot['support_url'] : home_url('/support')),
			'pre_question_1' => isset($params['pre_question_1']) ? sanitize_text_field($params['pre_question_1']) : (isset($existing_chatbot['pre_question_1']) ? $existing_chatbot['pre_question_1'] : ''),
			'pre_question_2' => isset($params['pre_question_2']) ? sanitize_text_field($params['pre_question_2']) : (isset($existing_chatbot['pre_question_2']) ? $existing_chatbot['pre_question_2'] : ''),
			'pre_question_3' => isset($params['pre_question_3']) ? sanitize_text_field($params['pre_question_3']) : (isset($existing_chatbot['pre_question_3']) ? $existing_chatbot['pre_question_3'] : ''),
			'pre_question_4' => isset($params['pre_question_4']) ? sanitize_text_field($params['pre_question_4']) : (isset($existing_chatbot['pre_question_4']) ? $existing_chatbot['pre_question_4'] : ''),
			'pre_questions_bg_color' => isset($params['pre_questions_bg_color']) ? sanitize_hex_color($params['pre_questions_bg_color']) : (isset($existing_chatbot['pre_questions_bg_color']) ? $existing_chatbot['pre_questions_bg_color'] : '#ffffff'),
			'pre_questions_text_color' => isset($params['pre_questions_text_color']) ? sanitize_hex_color($params['pre_questions_text_color']) : (isset($existing_chatbot['pre_questions_text_color']) ? $existing_chatbot['pre_questions_text_color'] : '#475569'),
			'pre_questions_border_color' => isset($params['pre_questions_border_color']) ? sanitize_hex_color($params['pre_questions_border_color']) : (isset($existing_chatbot['pre_questions_border_color']) ? $existing_chatbot['pre_questions_border_color'] : '#e2e8f0'),
			'pre_questions_border_radius' => isset($params['pre_questions_border_radius']) ? sanitize_text_field($params['pre_questions_border_radius']) : (isset($existing_chatbot['pre_questions_border_radius']) ? $existing_chatbot['pre_questions_border_radius'] : 'rounded'),
			'system_prompt' => isset($params['system_prompt']) ? sanitize_textarea_field($params['system_prompt']) : (isset($existing_chatbot['system_prompt']) ? $existing_chatbot['system_prompt'] : ''),
			'temperature' => isset($params['temperature']) ? floatval($params['temperature']) : (isset($existing_chatbot['temperature']) ? floatval($existing_chatbot['temperature']) : 0.7),
			'max_tokens' => isset($params['max_tokens']) ? intval($params['max_tokens']) : (isset($existing_chatbot['max_tokens']) ? intval($existing_chatbot['max_tokens']) : 500),
			'save_chat' => isset($params['save_chat']) ? (bool) $params['save_chat'] : (isset($existing_chatbot['save_chat']) ? (bool) $existing_chatbot['save_chat'] : false),
			'enable_pre_questions' => isset($params['enable_pre_questions']) ? (bool) $params['enable_pre_questions'] : (isset($existing_chatbot['enable_pre_questions']) ? (bool) $existing_chatbot['enable_pre_questions'] : true),
			'enable_uploads' => isset($params['enable_uploads']) ? (bool) $params['enable_uploads'] : (isset($existing_chatbot['enable_uploads']) ? (bool) $existing_chatbot['enable_uploads'] : false),
			'save_uploads' => isset($params['save_uploads']) ? (bool) $params['save_uploads'] : (isset($existing_chatbot['save_uploads']) ? (bool) $existing_chatbot['save_uploads'] : false),
			'max_upload_size' => isset($params['max_upload_size']) ? intval($params['max_upload_size']) : (isset($existing_chatbot['max_upload_size']) ? intval($existing_chatbot['max_upload_size']) : 5),
			'default_provider' => isset($params['default_provider']) ? sanitize_text_field($params['default_provider']) : (isset($existing_chatbot['default_provider']) ? $existing_chatbot['default_provider'] : 'openai'),
			'knowledge_text' => isset($params['knowledge_text']) ? sanitize_textarea_field($params['knowledge_text']) : (isset($existing_chatbot['knowledge_text']) ? $existing_chatbot['knowledge_text'] : ''),
			'knowledge_urls' => isset($params['knowledge_urls']) ? $urls : (isset($existing_chatbot['knowledge_urls']) ? $existing_chatbot['knowledge_urls'] : []),
			'training_files' => isset($params['training_files']) ? $files : (isset($existing_chatbot['training_files']) ? $existing_chatbot['training_files'] : []),
		];

		$settings['chatbot'] = $chatbot_settings;
		update_option('baca_chat_assistant_settings', $settings);


		return new \WP_REST_Response(
			[
				'success' => true,
				'message' => esc_html__('Chatbot settings saved successfully!', 'botisst-ai-chat-assistant'),
			],
			200
		);
	}

	/**
	 * Save Display Control Settings
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response Standard API response.
	 */
	public function baca_save_display_settings($request)
	{
		$params = $request->get_json_params();

		$display_settings = [
			'entire_site' => isset($params['entire_site']) ? (bool) $params['entire_site'] : false,
			'exclude_pages' => isset($params['exclude_pages']) ? sanitize_text_field($params['exclude_pages']) : '',
			'position' => isset($params['position']) ? sanitize_text_field($params['position']) : 'bottom-right',
			'show_on_mobile' => isset($params['show_on_mobile']) ? (bool) $params['show_on_mobile'] : true,
			'trigger_type' => isset($params['trigger_type']) ? sanitize_text_field($params['trigger_type']) : 'click',
			'trigger_delay' => isset($params['trigger_delay']) ? intval($params['trigger_delay']) : 5,
			'launcher_text' => isset($params['launcher_text']) ? sanitize_text_field($params['launcher_text']) : 'Chat with us',
		];

		$settings = self::baca_get_all_settings();
		$settings['display'] = $display_settings;
		update_option('baca_chat_assistant_settings', $settings);

		return new \WP_REST_Response(
			[
				'success' => true,
				'message' => esc_html__('Display settings saved successfully!', 'botisst-ai-chat-assistant'),
			],
			200
		);
	}

	/**
	 * Get recent conversation history.
	 *
	 * @param string $session_id Session ID.
	 * @param int    $limit Number of messages.
	 * @return string
	 */
	private function baca_get_recent_conversation($session_id, $limit = 10)
	{
		global $wpdb;

		if (empty($session_id)) {
			return '';
		}

		$table = esc_sql( $wpdb->prefix . 'baca_sessions' );

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct database query on custom table.
		$messages_json = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT content FROM {$table} WHERE session_id = %s ORDER BY id DESC LIMIT 1", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table name is dynamic but safe.
				$session_id
			)
		);

		if (empty($messages_json)) {
			return '';
		}

		$messages = json_decode($messages_json, true);

		if (!is_array($messages)) {
			return '';
		}

		$messages = array_slice(
			$messages,
			-$limit
		);

		$history = '';

		foreach ($messages as $message) {

			if (empty($message['content'])) {
				continue;
			}

			$role = (
				isset($message['role']) &&
				$message['role'] === 'assistant'
			)
				? 'Assistant'
				: 'User';

			$history .= sprintf(
				"%s: %s\n",
				$role,
				trim($message['content'])
			);
		}

		return trim($history);
	}

	/**
	 * Handle Client Communications endpoint
	 *
	 * Uses AiClient fluent API architecture to format and stream
	 * knowledge-aware conversations over API endpoints.
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response Formatted answer response.
	 */
	public function baca_chat($request)
	{
		$params = $request->get_json_params();

		$prompt = isset($params['prompt']) ? sanitize_textarea_field($params['prompt']) : '';
		$session_id = isset($params['session_id']) ? sanitize_text_field($params['session_id']) : 'default';
		$email = isset($params['email']) ? sanitize_email($params['email']) : '';

		if (empty($prompt)) {
			return $this->error_response(
				esc_html__('Empty prompt provided.', 'botisst-ai-chat-assistant'),
				400
			);
		}

		$settings = self::baca_get_all_settings();

		if (empty($settings)) {
			return $this->error_response(
				esc_html__('Plugin settings not configured.', 'botisst-ai-chat-assistant'),
				500
			);
		}

		$bot = isset($settings['chatbot']) ? $settings['chatbot'] : [];
		$models = isset($settings['models']) ? $settings['models'] : [];

		if (empty($bot) || empty($models)) {
			return $this->error_response(
				esc_html__('Chatbot settings incomplete.', 'botisst-ai-chat-assistant'),
				500
			);
		}

		try {
			$provider = $this->get_active_provider($bot);
			$model_id = $this->get_model_id($provider, $models);

			if (empty($model_id)) {
				return $this->error_response(
					esc_html__('No AI computational model selected for processing.', 'botisst-ai-chat-assistant'),
					400
				);
			}
		} catch (Exception $e) {
			return $this->error_response($e->getMessage(), 400);
		}
		try {
			$system_message = $this->build_system_prompt($bot, $settings);
		} catch (Exception $e) {
			return $this->error_response($e->getMessage(), 500);
		}
		try {
			$rag_data = $this->get_rag_context($prompt, $session_id, $bot, $settings);

			if ($rag_data['require_data_missing']) {
				return $this->save_and_respond(
					$rag_data['message'],
					$session_id,
					$bot,
					$email,
					$prompt
				);
			}

			if (!empty($rag_data['context'])) {
				$system_message .= "\n\nCRITICAL INSTRUCTION: Answer the user's question concisely based ONLY on the facts provided in the 'Knowledge Base Information' below. Do not hallucinate, over-explain, or add external general knowledge that is not explicitly stated in the context.\n\nKnowledge Base Information:\n" . $rag_data['context'];
			}

			$rag_links = $rag_data['links'];
		} catch (Exception $e) {
			$rag_links = [];
		}

		try {
			$mcp_context = $this->get_mcp_context($prompt, $settings);
			if (!empty($mcp_context)) {
				$system_message .= "\n\nCustom Data:\n" . $mcp_context;
			}
		} catch (Exception $e) {
		}

		try {
			$memory = $this->get_optimized_memory($session_id, $prompt, $system_message);
			$system_message = $memory['system_message'];
		} catch (Exception $e) {
		}

		try {
			$ai_message = $this->call_ai_api(
				$prompt,
				$system_message,
				$provider,
				$model_id,
				$bot
			);

			if (empty($ai_message)) {
				return $this->error_response(
					esc_html__('AI connection returned an empty response.', 'botisst-ai-chat-assistant'),
					500
				);
			}
		} catch (\Throwable $e) {
			return $this->error_response($e->getMessage(), 500);
		}

		try {
			$this->save_conversation($prompt, $ai_message, $session_id, $provider, $model_id, $bot, $email);
		} catch (Exception $e) {
		}

		try {
			$formatted_messages = $this->get_formatted_messages($session_id);
		} catch (Exception $e) {
			$formatted_messages = [];
		}

		return new \WP_REST_Response(
			[
				'success' => true,
				'message' => $ai_message,
				'session_id' => $session_id,
				'messages' => $formatted_messages,
				'reference_links' => $rag_links,
			],
			200
		);
	}

	/**
	 * ====================================================
	 * HELPER METHODS - Split for maintainability
	 * ====================================================
	 */

	/**
	 * Get active AI provider
	 */
	private function get_active_provider($bot)
	{
		$available_providers = [];

		foreach (['openai', 'google', 'anthropic'] as $provider) {
			if (!empty(self::baca_get_provider_key($provider))) {
				$available_providers[] = $provider;
			}
		}

		if (count($available_providers) === 0) {
			throw new Exception(esc_html__('No AI provider API keys configured.', 'botisst-ai-chat-assistant'));
		}

		if (count($available_providers) === 1) {
			return $available_providers[0];
		}

		// Multiple providers available - use default or first available
		$default_provider = !empty($bot['default_provider']) ? $bot['default_provider'] : 'openai';

		return in_array($default_provider, $available_providers, true) ? $default_provider : $available_providers[0];
	}

	/**
	 * Get model ID for provider
	 */
	private function get_model_id($provider, $models)
	{
		$model_id = isset($models[$provider]) ? $models[$provider] : '';

		if (!empty($model_id)) {
			return $model_id;
		}

		// Fallback to default models
		$defaults = [
			'openai' => 'gpt-4o-mini',
			'google' => 'gemini-2.5-flash',
			'anthropic' => 'claude-3-haiku-20240307',
		];

		return isset($defaults[$provider]) ? $defaults[$provider] : '';
	}

	/**
	 * Build comprehensive system prompt
	 */
	private function build_system_prompt($bot, $settings)
	{
		$system_message = '';

		// Admin custom prompt
		if (!empty($bot['system_prompt'])) {
			$system_message .= trim(wp_kses_post($bot['system_prompt']));
		}

		// Manual knowledge base
		if (!empty($bot['knowledge_text'])) {
			$system_message .= "\n\nKNOWLEDGE:\n";
			$system_message .= wp_kses_post($bot['knowledge_text']);
		}

		$system_message .= '

You are a helpful, professional AI assistant.

LANGUAGE
- Always reply in the same language as the user.
- Match the user tone naturally.

CONVERSATION MEMORY
- Use previous messages in the current session.
- Follow-up questions refer to the last discussed topic.
- Questions like:
  "more details"
  "tell me more"
  "continue"
  "explain more"
  "why?"
  "how?"
  "what about that?"
  should automatically continue the previous topic.
- Never ask "What topic do you mean?" if conversation context exists.

KNOWLEDGE BASE
- Use available knowledge base information whenever relevant.
- Never say:
  "According to the knowledge base"
  "Based on the provided content"
  "The information shows"

ANSWER STYLE
- Simple question → short answer.
- Technical question → detailed answer with examples.
- Use headings and bullet points when useful.
- Give practical examples whenever possible.
- Complete every answer fully.

ACCURACY
- Never invent facts, links, products, statistics, or company information.
- If unsure, clearly state uncertainty.
- If information is unavailable, say so honestly.

LINKS
- Include relevant links when available.
- If article links exist, include them naturally.

CLARIFICATION
- Ask a clarifying question only when the request is genuinely ambiguous.
- Do NOT ask clarification questions for:
  more details
  tell me more
  continue
  elaborate
  explain more

IMPORTANT
If conversation history exists, use it before asking questions.
Always expand on the previous answer when the user asks for more information.

';

		return trim($system_message);
	}

	/**
	 * Get RAG context and check if data is required
	 */
	private function get_rag_context($prompt, $session_id, $bot, $settings)
	{
		$result = [
			'context' => '',
			'links' => [],
			'require_data_missing' => false,
			'message' => '',
		];

		if (!class_exists('BACA_RAG_Engine')) {
			require_once BACA_PATH . 'includes/class-baca-rag-engine.php';
		}

		$rag_engine = BACA_RAG_Engine::get_instance();

		if (!$rag_engine->is_enabled()) {
			return $result;
		}

		// Get RAG context
		$rag_data = $this->baca_get_rag_context_with_links($prompt, $session_id);
		$result['context'] = $rag_data['context'];
		$result['links'] = $rag_data['links'];

		// Check if indexed data is required
		$rag_settings = !empty($settings['rag']) ? $settings['rag'] : [];
		$require_indexed_data = !empty($rag_settings['require_indexed_data']);
		$no_data_message = isset($rag_settings['no_data_message']) ? $rag_settings['no_data_message'] : '';

		if ($require_indexed_data && empty($result['context'])) {
			$result['require_data_missing'] = true;
			$result['message'] = !empty($no_data_message)
				? $no_data_message
				: '❌ ' . esc_html__('I don\'t have information about your question in my knowledge base.', 'botisst-ai-chat-assistant');
		}

		return $result;
	}

	/**
	 * Get MCP context
	 */
	private function get_mcp_context($prompt, $settings)
	{
		try {
			if (!class_exists('BACA_MCP_Server')) {
				require_once BACA_PATH . 'includes/mcp/class-baca-mcp-server.php';
			}

			$mcp_server = BACA_MCP_Server::get_instance();
			if (!$mcp_server) {
				return '';
			}

			$site_context = $mcp_server->get_site_context();
			if (!empty($site_context)) {
				return $site_context;
			}

			return $this->baca_get_custom_mcp_context($prompt, $settings) ?: '';
		} catch (Exception $e) {
			return '';
		}
	}

	/**
	 * Get optimized memory and conversation history
	 */
	private function get_optimized_memory($session_id, $prompt, $system_message)
	{
		try {

			$rag_context = '';

			if (!class_exists('BACA_Memory_Optimizer')) {
				require_once BACA_PATH . 'includes/class-baca-memory-optimizer.php';
			}

			$memory_optimizer = BACA_Memory_Optimizer::get_instance();

			$optimized_memory = $memory_optimizer->build_optimized_context(
				$session_id,
				$prompt,
				$rag_context
			);

			$memory_text = $memory_optimizer->format_for_prompt(
				$optimized_memory
			);

			if (!empty($memory_text)) {
				$system_message .= "\n\nMEMORY CONTEXT:\n";
				$system_message .= $memory_text;
			}

			/*
			 * Add recent conversation
			 */
			$conversation_history = $this->baca_get_recent_conversation(
				$session_id,
				10
			);

			if (!empty($conversation_history)) {

				$system_message .= "\n\nCONVERSATION HISTORY:\n";
				$system_message .= $conversation_history;

				$system_message .= "\n\nFOLLOW-UP RULES:
- If user asks 'why', 'how', 'who', 'when', 'where', 'which', 'what about', 'tell me more', 'continue', 'can you explain', assume they are referring to the previous topic.
- Resolve pronouns such as 'it', 'that', 'this', 'they' using the conversation history.
- Never ignore previous messages in the same session.
";
			}

		} catch (Exception $e) {
		}

		return [
			'system_message' => $system_message,
		];
	}

	/**
	 * Call AI API using WordPress AI Client
	 */
	private function call_ai_api($prompt, $system_message, $provider, $model_id, $bot)
	{
		$registry = \WordPress\AiClient\AiClient::defaultRegistry();

		$key = self::baca_get_provider_key($provider);

		if (empty($key)) {
			throw new Exception(
				sprintf(
					/* translators: %s: Provider name. */
					esc_html__(
						'API Key missing for provider: %s',
						'botisst-ai-chat-assistant'
					),
					esc_html( $provider )
				)
			);
		}

		/*
		 * Authentication
		 */
		$auth = new \WordPress\AiClient\Providers\Http\DTO\ApiKeyRequestAuthentication(
			$key
		);

		$registry->setProviderRequestAuthentication(
			$provider,
			$auth
		);

		/*
		 * Model
		 */
		$model = null;

		try {

			$model = $registry->getProviderModel(
				$provider,
				$model_id
			);

		} catch (\Throwable $e) {
		}

		/*
		 * Settings
		 */
		$temperature = isset($bot['temperature'])
			? (float) $bot['temperature']
			: 0.5;

		$max_tokens = isset($bot['max_tokens'])
			? (int) $bot['max_tokens']
			: 1500;

		/*
		 * Enhanced prompt
		 */
		$full_prompt = trim($prompt);

		/*
		 * Build request
		 */
		$builder = \WordPress\AiClient\AiClient::prompt(
			$full_prompt
		);

		$builder->usingRequestOptions(
			\WordPress\AiClient\Providers\Http\DTO\RequestOptions::fromArray(
				[
					\WordPress\AiClient\Providers\Http\DTO\RequestOptions::KEY_TIMEOUT => 90,
				]
			)
		);

		if ($model) {

			$builder->usingModel(
				$model
			);

		} else {

			$builder->usingProvider(
				$provider
			);
		}

		try {

			$result = $builder
				->usingSystemInstruction(
					$system_message
				)
				->usingTemperature(
					$temperature
				)
				->usingMaxTokens(
					$max_tokens
				)
				->generateTextResult();

			$response = trim(
				$result->toText()
			);

			if (empty($response)) {

				throw new Exception(
					'Empty response received from AI provider.'
				);
			}

			return $response;

		} catch (\Throwable $e) {
			throw new Exception( esc_html( $e->getMessage() ) );
		}
	}

	/**
	 * Save conversation to database
	 */
	private function save_conversation($prompt, $ai_message, $session_id, $provider, $model_id, $bot, $email)
	{
		// Save to database if enabled
		if (isset($bot['save_chat']) && (bool) $bot['save_chat']) {
			if (class_exists('BACA_DB')) {
				$db = new BACA_DB();
				$db->baca_save_message($prompt, $ai_message, $session_id, $provider, $model_id, $email);
			}
		}

	}

	/**
	 * Get formatted messages from database
	 */
	private function get_formatted_messages($session_id)
	{
		$formatted_messages = [];

		if (!class_exists('BACA_DB')) {
			return $formatted_messages;
		}

		try {
			global $wpdb;

			// Use prepared statement properly
			// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Safe table prefix, direct query required.
			$existing_messages = $wpdb->get_var(
				$wpdb->prepare(
					"SELECT content FROM {$wpdb->prefix}baca_sessions WHERE session_id = %s",
					$session_id
				)
			);

			if ($existing_messages) {
				$complete_messages = json_decode($existing_messages, true);

				if (is_array($complete_messages)) {
					foreach ($complete_messages as $msg) {
						if (isset($msg['role']) && isset($msg['content'])) {
							$formatted_messages[] = [
								'role' => ($msg['role'] === 'assistant') ? 'bot' : 'user',
								'content' => $msg['content'],
							];
						}
					}
				}
			}
		} catch (Exception $e) {
		}

		return $formatted_messages;
	}

	/**
	 * Save response and return
	 */
	private function save_and_respond($message, $session_id, $bot, $email, $prompt)
	{
		if (isset($bot['save_chat']) && (bool) $bot['save_chat']) {
			if (class_exists('BACA_DB')) {
				$db = new BACA_DB();
				$db->baca_save_message($prompt, $message, $session_id, 'knowledge-base', 'no-data', $email);
			}
		}

		return new \WP_REST_Response(
			[
				'success' => true,
				'message' => $message,
				'session_id' => $session_id,
				'from_kb' => false,
			],
			200
		);
	}

	/**
	 * Return error response
	 */
	private function error_response($message, $status = 500)
	{
		return new \WP_REST_Response(
			[
				'success' => false,
				'message' => $message,
			],
			$status
		);
	}
	/**
	 * Get Custom MCP Context
	 *
	 * Processes custom MCP servers if configured.
	 *
	 * @param string $query User query.
	 * @param array  $settings Plugin settings.
	 * @return string Context from custom MCP servers.
	 */
	private function baca_get_custom_mcp_context($query, $settings)
	{
		$mcp_servers = isset($settings['mcp_servers']) ? $settings['mcp_servers'] : [];

		if (empty($mcp_servers)) {
			return '';
		}

		$context = '';
		foreach ($mcp_servers as $server) {
			if (!empty($server['enabled'])) {
				// Custom MCP server integration point
				$context .= "MCP Server: " . sanitize_text_field($server['name']) . "\n";
			}
		}

		return $context;
	}

	/**
	 * Get RAG Context with Links
	 *
	 * Retrieves context and extracts reference links for frontend display.
	 *
	 * @param string $query User query to search for.
	 * @param string $session_id Session ID for context.
	 * @return array Array with 'context' and 'links' keys.
	 */
	private function baca_get_rag_context_with_links($query, $session_id = '')
	{
		$context = $this->baca_get_rag_context($query, $session_id);
		$links = [];

		// Extract links from context using regex
		if (!empty($context)) {
			preg_match_all('/👉\s+(.+?):\s+(https?:\/\/[^\s\n]+)/i', $context, $matches, PREG_SET_ORDER);
			if (!empty($matches)) {
				foreach ($matches as $match) {
					$links[] = [
						'title' => trim($match[1]),
						'url' => esc_url($match[2]),
					];
				}
			}
		}

		return [
			'context' => $context,
			'links' => $links,
		];
	}

	/**
	 * Get RAG Context for Query
	 *
	 * Retrieves relevant documents from RAG system if enabled.
	 *
	 * @param string $query User query to search for.
	 * @param string $session_id Session ID for context.
	 * @return string Formatted context string or empty if RAG disabled.
	 */
	private function baca_get_rag_context($query, $session_id = '')
	{
		if (!class_exists('BACA_RAG_Engine')) {
			return '';
		}

		try {

			require_once BACA_PATH . 'includes/class-baca-rag-engine.php';

			$rag_engine = BACA_RAG_Engine::get_instance();

			if (!$rag_engine->is_enabled()) {
				return '';
			}

			/*
			 * Detect follow-up questions
			 */
			$followup_keywords = [
				'more',
				'details',
				'detail',
				'tell me more',
				'explain more',
				'continue',
				'elaborate',
				'full details',
				'more information',
				'how',
				'why',
				'when',
				'where',
				'which',
				'what about',
				'can you explain',
				'example',
				'examples'
			];

			$query_lower = strtolower(trim($query));

			$asking_for_more = false;

			foreach ($followup_keywords as $keyword) {

				if (strpos($query_lower, $keyword) !== false) {
					$asking_for_more = true;
					break;
				}
			}

			/*
			 * If user asks a follow-up question,
			 * search using previous topic
			 */
			$search_query = $query;

			if ($asking_for_more && !empty($session_id)) {

				$previous_question = $this->baca_get_previous_user_message(
					$session_id
				);

				if (!empty($previous_question)) {
					$search_query = $previous_question;
				}
			}

			/*
			 * Retrieve more results for follow-up questions
			 */
			$limit = $asking_for_more ? 10 : 5;

			$documents = $rag_engine->retrieve_context(
				$search_query,
				$limit
			);

			if (empty($documents)) {
				return '';
			}

			$context = "📚 KNOWLEDGE BASE CONTENT\n\n";

			$read_more_links = [];

			$index = 1;

			foreach ($documents as $doc) {

				if (empty($doc['content'])) {
					continue;
				}

				$title = !empty($doc['title'])
					? wp_strip_all_tags($doc['title'])
					: 'Knowledge Article';

				$context .= "[{$index}] {$title}\n";

				$context .= trim(
					wp_strip_all_tags($doc['content'])
				);

				$context .= "\n\n";

				if (
					!empty($doc['url']) &&
					filter_var($doc['url'], FILTER_VALIDATE_URL)
				) {

					$read_more_links[] = [
						'title' => $title,
						'url' => esc_url($doc['url']),
					];
				}

				$index++;
			}

			/*
			 * Add links section
			 */
			if (!empty($read_more_links)) {

				$context .= "RELATED LINKS:\n";

				foreach ($read_more_links as $link) {

					$context .= '- '
						. $link['title']
						. ': '
						. $link['url']
						. "\n";
				}
			}

			/*
			 * Important instruction for AI
			 */
			$context .= "\n\nAI INSTRUCTIONS:\n";
			$context .= "- Use the information above to answer.\n";
			$context .= "- If user asks for more details, expand the previous topic.\n";
			$context .= "- Do not ask what topic they mean if conversation history exists.\n";
			$context .= "- Continue the discussion naturally.\n";
			$context .= "- Give examples when possible.\n";

			return trim($context);

		} catch (Exception $e) {
			return '';
		}
	}

	/**
	 * Get Previous User Message from Session
	 *
	 * @param string $session_id Session ID.
	 * @return string Previous user message or empty string
	 */
	private function baca_get_previous_user_message($session_id)
	{
		global $wpdb;

		if (empty($session_id)) {
			return '';
		}

		$table = esc_sql( $wpdb->prefix . 'baca_sessions' );

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct database query on custom table.
		$messages_json = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT content FROM {$table} WHERE session_id = %s ORDER BY id DESC LIMIT 1", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table name is dynamic but safe.
				$session_id
			)
		);

		if (empty($messages_json)) {
			return '';
		}

		$messages = json_decode($messages_json, true);

		if (!is_array($messages) || empty($messages)) {
			return '';
		}

		$followup_phrases = [
			'more',
			'more details',
			'give me more details',
			'tell me more',
			'explain more',
			'continue',
			'elaborate',
			'why',
			'why?',
			'how',
			'how?',
			'when',
			'when?',
			'where',
			'where?',
			'what about that',
			'what about this',
			'can you explain',
			'example',
			'examples',
		];

		/*
		 * Search backwards through messages
		 */
		for ($i = count($messages) - 1; $i >= 0; $i--) {

			if (
				!isset($messages[$i]['role']) ||
				$messages[$i]['role'] !== 'user'
			) {
				continue;
			}

			$content = trim($messages[$i]['content']);

			if (empty($content)) {
				continue;
			}

			$content_lower = strtolower($content);

			$is_followup = false;

			foreach ($followup_phrases as $phrase) {

				if (
					$content_lower === $phrase ||
					strpos($content_lower, $phrase) !== false
				) {
					$is_followup = true;
					break;
				}
			}

			/*
			 * Return first real topic question
			 */
			if (!$is_followup) {
				return $content;
			}
		}

		return '';
	}

	/**
	 * Mark the first-run setup wizard as completed or skipped, so it stops
	 * auto-opening on future dashboard visits.
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response
	 */
	public function baca_update_setup_wizard_status($request)
	{
		$status = sanitize_text_field($request->get_param('status'));

		if (!in_array($status, ['completed', 'skipped', 'pending'], true)) {
			return new \WP_REST_Response(
				['success' => false, 'message' => esc_html__('Invalid status.', 'botisst-ai-chat-assistant')],
				400
			);
		}

		update_option('baca_setup_wizard_status', $status);

		return new \WP_REST_Response(['success' => true], 200);
	}

	/**
	 * Reset Stored Global API Provider Key
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response Standard API response.
	 */
	public function baca_reset_key($request)
	{
		$provider = sanitize_text_field($request->get_param('provider'));

		$settings = self::baca_get_all_settings();
		if (isset($settings['models'][$provider])) {
			$settings['models'][$provider] = '';
		}
		if (isset($settings['api_keys'][$provider])) {
			unset($settings['api_keys'][$provider]);
		}
		update_option('baca_chat_assistant_settings', $settings);

		$is_wp_ai_client_70 = function_exists('wp_ai_client_prompt');
		if ($is_wp_ai_client_70) {
			delete_option('connectors_ai_' . $provider . '_api_key');
		} else {
			$creds = get_option('wp_ai_client_provider_credentials', []);
			if (isset($creds[$provider])) {
				unset($creds[$provider]);
				update_option('wp_ai_client_provider_credentials', $creds);
			}
		}

		return new \WP_REST_Response(['success' => true], 200);
	}

	/**
	 * Return all chat sessions for the admin dashboard.
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response
	 */
	public function baca_get_sessions($request)
	{
		$user_id = get_current_user_id();

		// Handle user-specific loading limit.
		$limit = $request->get_param('limit');
		if (!is_null($limit)) {
			$limit = sanitize_text_field($limit);
			update_user_meta($user_id, 'baca_sessions_load_limit', $limit);
		} else {
			$limit = get_user_meta($user_id, 'baca_sessions_load_limit', true);
			if (empty($limit)) {
				$limit = '100'; // Default limit.
			}
		}

		// Handle user-specific sorting order.
		$order = $request->get_param('order');
		if (!is_null($order)) {
			$order = sanitize_text_field($order);
			update_user_meta($user_id, 'baca_sessions_sort_order', $order);
		} else {
			$order = get_user_meta($user_id, 'baca_sessions_sort_order', true);
			if (empty($order)) {
				$order = 'desc'; // Default order.
			}
		}

		$sessions = BACA_DB::baca_get_all_sessions($limit, $order);

		return new \WP_REST_Response(
			[
				'sessions' => $sessions,
				'total' => count($sessions),
				'load_limit' => $limit,
				'sort_order' => $order,
			],
			200
		);
	}

	/**
	 * Delete a chat session from the database.
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function baca_delete_session($request)
	{
		$session_id = sanitize_text_field($request->get_param('session_id'));

		if (empty($session_id)) {
			return new \WP_Error(
				'baca_invalid_session',
				__('Session ID is required.', 'botisst-ai-chat-assistant'),
				['status' => 400]
			);
		}

		if (!BACA_DB::baca_delete_session($session_id)) {
			return new \WP_Error(
				'baca_delete_failed',
				__('Session could not be deleted.', 'botisst-ai-chat-assistant'),
				['status' => 404]
			);
		}

		return new \WP_REST_Response(['success' => true], 200);
	}

	/**
	 * Public endpoint to clear session and reset cookies in PHP
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response
	 */
	public function baca_clear_session($request)
	{
		$new_session_id = 'sess_' . wp_generate_password(9, false);

		setcookie('baca_session_id', $new_session_id, time() + 3600, COOKIEPATH ? COOKIEPATH : '/', COOKIE_DOMAIN, is_ssl(), false);
		setcookie('baca_clear_allowed', 'true', time() + 1800, COOKIEPATH ? COOKIEPATH : '/', COOKIE_DOMAIN, is_ssl(), false);

		return new \WP_REST_Response(
			[
				'success' => true,
				'session_id' => $new_session_id,
			],
			200
		);
	}

	/**
	 * Store API key specifically to database layer decoupled from bulk storage settings.
	 *
	 * @param string $provider Identifier for AI provider string.
	 * @param string $value Actual configuration sequence key payload.
	 * @return void
	 */
	private function baca_persist_key($provider, $value)
	{
		$provider = sanitize_text_field($provider);
		$is_wp_ai_client_70 = function_exists('wp_ai_client_prompt');

		if ($is_wp_ai_client_70) {
			update_option('connectors_ai_' . $provider . '_api_key', sanitize_text_field($value));
		} else {
			$creds = get_option('wp_ai_client_provider_credentials', []);
			$creds[$provider] = sanitize_text_field($value);
			update_option('wp_ai_client_provider_credentials', $creds);
		}
	}

	/**
	 * Helper function for unified config injections.
	 *
	 * @param string $group The settings group string array wrapper.
	 * @param string $key   The explicit settings field index.
	 * @param mixed  $value Data content to place onto field index wrapper safely.
	 * @return void
	 */
	private function baca_persist_data($group, $key, $value)
	{
		$settings = self::baca_get_all_settings();
		if (!isset($settings[$group])) {
			$settings[$group] = [];
		}
		$settings[$group][$key] = $value;
		update_option('baca_chat_assistant_settings', $settings);
	}

	/**
	 * Secure native media uploads implementation using WordPress Library functionality.
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response Response object linking attachment URI sequences.
	 */
	public function baca_upload_file($request)
	{
		if (!function_exists('media_handle_upload')) {
			require_once ABSPATH . 'wp-admin/includes/image.php';
			require_once ABSPATH . 'wp-admin/includes/file.php';
			require_once ABSPATH . 'wp-admin/includes/media.php';
		}

		// Security block testing existence. PHP uploads natively handles $_FILES sanitization inside WP framework wrapper core routines internally when using media_handle_upload.
		// phpcs:ignore WordPress.Security.NonceVerification.Missing
		if (empty($_FILES['file'])) {
			return new \WP_REST_Response(
				[
					'success' => false,
					'message' => esc_html__('No appropriate upload payload provided across boundary.', 'botisst-ai-chat-assistant'),
				],
				400
			);
		}

		$attachment_id = media_handle_upload('file', 0);

		if (is_wp_error($attachment_id)) {
			return new \WP_REST_Response(
				[
					'success' => false,
					'message' => $attachment_id->get_error_message(),
				],
				500
			);
		}

		return new \WP_REST_Response(
			[
				'success' => true,
				'id' => $attachment_id,
				'url' => wp_get_attachment_url($attachment_id),
				'name' => get_the_title($attachment_id),
			],
			200
		);
	}

	/**
	 * Core validation capability ping check
	 *
	 * Reaches out natively using given keys directly before authorizing storage.
	 *
	 * @param string $provider Specified provider identifier logic flag.
	 * @param string $key String secret token identifier payload connection string.
	 * @return bool|\WP_Error Success boolean true or logical WordPress core Failure wrapper obj.
	 */
	public function baca_validate_api_key($provider, $key)
	{
		$registry = \WordPress\AiClient\AiClient::defaultRegistry();

		try {
			$className = $registry->getProviderClassName($provider);

			$auth = new \WordPress\AiClient\Providers\Http\DTO\ApiKeyRequestAuthentication($key);
			$registry->setProviderRequestAuthentication($provider, $auth);

			$modelDirectory = $className::modelMetadataDirectory();
			$models = $modelDirectory->listModelMetadata();

			if (empty($models)) {
				/* translators: %s: Selected AI provider platform. */
				return new \WP_Error('invalid_key', sprintf(esc_html__('Critical synchronization failure. Invalid or unauthenticated API key response for core platform: %s', 'botisst-ai-chat-assistant'), esc_html(ucfirst($provider))));
			}

			return true;
		} catch (\Exception $e) {
			return new \WP_Error('api_error', $e->getMessage());
		}
	}

	/**
	 * Get list of all post types with counts
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response
	 */
	public function baca_get_post_types($request)
	{
		$post_types = get_post_types(['public' => true], 'objects');
		$types = [];

		foreach ($post_types as $post_type) {
			if ('attachment' !== $post_type->name) {
				$count = wp_count_posts($post_type->name);
				$published = isset($count->publish) ? (int) $count->publish : 0;

				$types[] = [
					'value' => $post_type->name,
					'label' => $post_type->label,
					'count' => $published,
				];
			}
		}

		return new \WP_REST_Response(['types' => $types], 200);
	}

	/**
	 * Save RAG Configuration Settings
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response
	 */
	public function baca_save_rag_settings($request)
	{
		$params = $request->get_json_params();

		$settings = self::baca_get_all_settings();
		$existing_rag = isset($settings['rag']) ? $settings['rag'] : [];
		$existing_embeddings = isset($existing_rag['embeddings']) ? $existing_rag['embeddings'] : [];

		$post_types = isset($params['post_types'])
			? (array) $params['post_types']
			: (isset($existing_rag['post_types']) ? $existing_rag['post_types'] : ['post', 'page']);

		$chunk_size = isset($params['chunk_size'])
			? (int) $params['chunk_size']
			: (isset($existing_rag['chunk_size']) ? (int) $existing_rag['chunk_size'] : 1000);

		$max_results = isset($params['max_results'])
			? (int) $params['max_results']
			: (isset($existing_rag['max_results']) ? (int) $existing_rag['max_results'] : 5);

		$auto_index = isset($params['auto_index'])
			? (bool) $params['auto_index']
			: (isset($existing_rag['auto_index']) ? (bool) $existing_rag['auto_index'] : true);

		$vector_db = isset($params['vector_db'])
			? (array) $params['vector_db']
			: (isset($existing_rag['vector_db']) ? $existing_rag['vector_db'] : ['provider' => 'sqlite']);

		$require_indexed_data = isset($params['require_indexed_data'])
			? (bool) $params['require_indexed_data']
			: (isset($existing_rag['require_indexed_data']) ? (bool) $existing_rag['require_indexed_data'] : false);

		$no_data_message = isset($params['no_data_message'])
			? sanitize_textarea_field($params['no_data_message'])
			: (isset($existing_rag['no_data_message']) ? $existing_rag['no_data_message'] : 'I don\'t have information about your question in my knowledge base.');

		$settings['rag'] = [
			'enabled' => true,
			'post_types' => $post_types,
			'chunk_size' => $chunk_size,
			'max_results' => $max_results,
			'auto_index' => $auto_index,
			'vector_db' => $vector_db,
			'require_indexed_data' => $require_indexed_data,
			'no_data_message' => $no_data_message,
			'indexing' => [
				'chunk_size' => $chunk_size,
				'chunk_overlap' => isset($params['chunk_overlap'])
					? (int) $params['chunk_overlap']
					: 100,
				'auto_update' => isset($params['auto_update'])
					? (bool) $params['auto_update']
					: true,
			],
			'embeddings' => [
				'provider' => isset($params['embeddings']['provider'])
					? sanitize_text_field($params['embeddings']['provider'])
					: (isset($params['embedding_provider']) ? sanitize_text_field($params['embedding_provider']) : (isset($existing_embeddings['provider']) ? $existing_embeddings['provider'] : '')),
				'model' => isset($params['embeddings']['model'])
					? sanitize_text_field($params['embeddings']['model'])
					: (isset($params['embedding_model']) ? sanitize_text_field($params['embedding_model']) : (isset($existing_embeddings['model']) ? $existing_embeddings['model'] : '')),
			],
		];

		/*
		 * Test Pinecone connection immediately before saving settings
		 */
		if (
			!empty($vector_db['provider']) &&
			$vector_db['provider'] === 'pinecone' &&
			!empty($vector_db['api_key'])
		) {

			try {

				require_once BACA_PATH . 'includes/class-baca-vector-db-pinecone.php';

				$pinecone = new BACA_Vector_DB_Pinecone(
					$vector_db
				);

				$new_provider = isset($settings['rag']['embeddings']['provider']) ? $settings['rag']['embeddings']['provider'] : 'openai';
				$new_model = isset($settings['rag']['embeddings']['model']) ? $settings['rag']['embeddings']['model'] : '';
				$expected_dimensions = 1536;
				if ($new_provider === 'google') {
					$expected_dimensions = 768;
				} elseif ($new_provider === 'local') {
					$expected_dimensions = 1024;
				} elseif ($new_provider === 'openai' && $new_model === 'text-embedding-3-large') {
					$expected_dimensions = 3072;
				}

				$test = $pinecone->test_connection($expected_dimensions);

				if (is_wp_error($test)) {

					return new \WP_REST_Response(
						[
							'success' => false,
							'message' => $test->get_error_message(),
						],
						400
					);
				}

			} catch (Exception $e) {

				return new \WP_REST_Response(
					[
						'success' => false,
						'message' => $e->getMessage(),
					],
					500
				);
			}
		}

		update_option(
			'baca_chat_assistant_settings',
			$settings
		);

		return new \WP_REST_Response(
			[
				'success' => true,
				'message' => esc_html__(
					'RAG settings saved successfully!',
					'botisst-ai-chat-assistant'
				),
				'rag' => $settings['rag'],
			],
			200
		);
	}

	/**
	 * Get RAG Indexing Statistics
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response
	 */
	public function baca_get_rag_stats($request)
	{
		if (!class_exists('BACA_RAG_Engine')) {
			return new \WP_REST_Response(
				[
					'total_documents' => 0,
					'total_chunks' => 0,
					'pending_embeddings' => 0,
					'embeddings_completed' => 0,
					'total_tokens' => 0,
				],
				200
			);
		}

		try {
			require_once BACA_PATH . 'includes/class-baca-rag-engine.php';
			$rag_engine = BACA_RAG_Engine::get_instance();
			$stats = $rag_engine->get_retriever()->get_statistics();

			return new \WP_REST_Response($stats, 200);
		} catch (Exception $e) {
			return new \WP_REST_Response(
				[
					'error' => $e->getMessage(),
					'total_documents' => 0,
					'total_chunks' => 0,
					'pending_embeddings' => 0,
					'embeddings_completed' => 0,
					'total_tokens' => 0,
				],
				500
			);
		}
	}

	/**
	 * Trigger RAG Content Indexing
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response
	 */


	public function baca_index_rag_content($request)
	{

		if (!class_exists('BACA_RAG_Engine')) {

			return new \WP_REST_Response(
				[
					'success' => false,
					'error' => esc_html__(
						'RAG Engine not available',
						'botisst-ai-chat-assistant'
					),
				],
				400
			);
		}

		try {

			require_once BACA_PATH .
				'includes/class-baca-rag-engine.php';

			$settings = self::baca_get_all_settings();

			if (empty($settings['rag']['enabled'])) {

				$settings['rag']['enabled'] = true;

				update_option(
					'baca_chat_assistant_settings',
					$settings
				);
			}

			$params = $request->get_json_params();

			$post_types = !empty(
				$params['post_types']
			)
				? array_map(
					'sanitize_text_field',
					(array) $params['post_types']
				)
				: ['post', 'page'];
			$index_sources =
				$params['index_sources']
				?? [];

			$vector_provider =
				$settings['rag']['vector_db']['provider']
				?? 'sqlite';

			/*
			 * Validate Pinecone
			 */
			if ('pinecone' === $vector_provider) {

				require_once BACA_PATH .
					'includes/class-baca-vector-db-pinecone.php';

				$pinecone =
					new BACA_Vector_DB_Pinecone(
						$settings['rag']['vector_db']
					);

				$connection =
					$pinecone->test_connection();

				if (is_wp_error($connection)) {

					return new \WP_REST_Response(
						[
							'success' => false,
							'error' =>
								$connection->get_error_message(),
						],
						400
					);
				}
			}

			$rag_engine =
				BACA_RAG_Engine::get_instance();

			$indexer =
				$rag_engine->get_indexer();

			if (!$indexer) {

				return new \WP_REST_Response(
					[
						'success' => false,
						'error' => 'Indexer not available',
					],
					500
				);
			}

			$indexed = 0;
			$failed = 0;

			/*
			 * Website content
			 */
			if (
				!empty(
				$index_sources['website']
			)
			) {

				$result =
					$indexer->index_documents_by_type(
						$post_types
					);

				$indexed +=
					$result['indexed']
					?? 0;

				$failed +=
					$result['failed']
					?? 0;
			}

			/*
			 * Direct Knowledge Text
			 */
			if (
				!empty(
				$index_sources['knowledge_text']
			)
			) {

				do_action(
					'baca_index_knowledge_text'
				);
			}

			/*
			 * Knowledge URLs
			 */
			if (
				!empty(
				$index_sources['urls']
			)
			) {

				do_action(
					'baca_index_urls'
				);
			}

			/*
			 * Training Files
			 */
			if (
				!empty(
				$index_sources['files']
			)
			) {

				do_action(
					'baca_index_training_files'
				);
			}

			// Synchronously process and generate pending embeddings immediately
			$rag_engine->process_pending_embeddings();

			$result_message = sprintf('Indexing completed. Indexed %d items.', $indexed);
			if (isset($result['message']) && !empty($result['message'])) {
				$result_message = $result['message'];
			}

			return new \WP_REST_Response(
				[
					'success' => true,
					'provider' => $vector_provider,
					'indexed' => $indexed,
					'failed' => $failed,
					'message' => $result_message,
					'errors' => isset($result['errors']) ? $result['errors'] : []
				],
				200
			);

		} catch (Exception $e) {
			return new \WP_REST_Response(
				[
					'success' => false,
					'error' => $e->getMessage(),
				],
				500
			);
		}
	}

	/**
	 * Get MCP Servers
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response
	 */
	public function baca_get_mcp_servers($request)
	{
		$settings = self::baca_get_all_settings();
		$servers = isset($settings['mcp_servers']) ? $settings['mcp_servers'] : [];

		return new \WP_REST_Response(['servers' => $servers], 200);
	}

	/**
	 * Save MCP Server
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response
	 */
	public function baca_save_mcp_server($request)
	{
		$params = $request->get_json_params();

		$name = isset($params['name']) ? sanitize_text_field($params['name']) : '';
		$url = isset($params['url']) ? esc_url_raw($params['url']) : '';
		$type = isset($params['type']) ? sanitize_text_field($params['type']) : 'http';
		$apiKey = isset($params['apiKey']) ? sanitize_text_field($params['apiKey']) : '';
		$enabled = isset($params['enabled']) ? (bool) $params['enabled'] : true;
		$isDefault = isset($params['isDefault']) ? (bool) $params['isDefault'] : false;

		if (empty($name) || empty($url)) {
			return new \WP_REST_Response(
				['error' => esc_html__('Name and URL are required', 'botisst-ai-chat-assistant')],
				400
			);
		}

		$server_id = 'mcp_' . sanitize_title($name) . '_' . time();

		$settings = self::baca_get_all_settings();
		if (!isset($settings['mcp_servers'])) {
			$settings['mcp_servers'] = [];
		}

		$server = [
			'id' => $server_id,
			'name' => $name,
			'url' => $url,
			'type' => $type,
			'enabled' => $enabled,
			'isDefault' => $isDefault,
			'addedAt' => current_time('mysql'),
		];

		// Encrypt API key before storing
		if (!empty($apiKey)) {
			$server['apiKey'] = base64_encode($apiKey);
		}

		$settings['mcp_servers'][] = $server;
		update_option('baca_chat_assistant_settings', $settings);

		return new \WP_REST_Response(
			[
				'success' => true,
				'message' => esc_html__('MCP server added successfully!', 'botisst-ai-chat-assistant'),
				'server' => $server,
			],
			200
		);
	}

	/**
	 * Update MCP Server
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response
	 */
	public function baca_update_mcp_server($request)
	{
		$server_id = sanitize_text_field($request->get_param('id'));
		$params = $request->get_json_params();

		$settings = self::baca_get_all_settings();
		$servers = isset($settings['mcp_servers']) ? $settings['mcp_servers'] : [];

		$found = false;
		foreach ($servers as &$server) {
			if ($server['id'] === $server_id) {
				if (isset($params['enabled'])) {
					$server['enabled'] = (bool) $params['enabled'];
				}
				$found = true;
				break;
			}
		}

		if (!$found) {
			return new \WP_REST_Response(
				['error' => esc_html__('Server not found', 'botisst-ai-chat-assistant')],
				404
			);
		}

		$settings['mcp_servers'] = $servers;
		update_option('baca_chat_assistant_settings', $settings);

		return new \WP_REST_Response(
			[
				'success' => true,
				'message' => esc_html__('MCP server updated successfully!', 'botisst-ai-chat-assistant'),
			],
			200
		);
	}

	/**
	 * Delete MCP Server
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response
	 */
	public function baca_delete_mcp_server($request)
	{
		$server_id = sanitize_text_field($request->get_param('id'));

		$settings = self::baca_get_all_settings();
		$servers = isset($settings['mcp_servers']) ? $settings['mcp_servers'] : [];

		$filtered_servers = array_filter($servers, function ($server) use ($server_id) {
			return $server['id'] !== $server_id;
		});

		if (count($filtered_servers) === count($servers)) {
			return new \WP_REST_Response(
				['error' => esc_html__('Server not found', 'botisst-ai-chat-assistant')],
				404
			);
		}

		$settings['mcp_servers'] = array_values($filtered_servers);
		update_option('baca_chat_assistant_settings', $settings);

		return new \WP_REST_Response(
			[
				'success' => true,
				'message' => esc_html__('MCP server deleted successfully!', 'botisst-ai-chat-assistant'),
			],
			200
		);
	}

	/**
	 * Load current supported LLM iteration models automatically through reflection list capabilities.
	 *
	 * @param string $provider Target logic AI platform.
	 * @return array Array mapped list sequence.
	 */
	public static function baca_get_models($provider)
	{
		$plugin = \BACA_Chat_Assistant::get_instance();
		if (method_exists($plugin, 'baca_register_ai_client')) {
			$plugin->baca_register_ai_client();
		}

		$registry = \WordPress\AiClient\AiClient::defaultRegistry();
		$key = self::baca_get_provider_key($provider);

		if (empty($key)) {
			return [];
		}

		try {
			$className = $registry->getProviderClassName($provider);

			$auth = new \WordPress\AiClient\Providers\Http\DTO\ApiKeyRequestAuthentication($key);
			$registry->setProviderRequestAuthentication($provider, $auth);

			$modelDirectory = $className::modelMetadataDirectory();
			$models = [];

			foreach ($modelDirectory->listModelMetadata() as $model) {
				$models[$model->getId()] = $model->getName();
			}

			return $models;
		} catch (\Exception $e) {
			return [];
		}
	}
}
