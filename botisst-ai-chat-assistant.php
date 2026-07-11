<?php
/**
 * Plugin Name: Botisst - AI Chat Assistant
 * Plugin URI: https://lionecoders.com
 * Description: Botisst is an intelligent, feature-rich AI chatbot plugin for WordPress. Built with a lightning-fast React frontend and a robust settings dashboard, Botisst lets you fully customize the appearance, logic, and base knowledge text of your AI Virtual Assistant.
 * Version: 1.0.1
 * Author: LionEcoders
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: botisst-ai-chat-assistant
 * Domain Path: /languages
 *
 * @package Botisst
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * Define Core Constants
 */
define('BACA_VERSION', '1.0.1');
define('BACA_FILE', __FILE__);
define('BACA_PATH', plugin_dir_path(BACA_FILE));
define('BACA_URL', plugin_dir_url(BACA_FILE));
define('BACA_BASENAME', plugin_basename(BACA_FILE));

if (!class_exists('BACA_Chat_Assistant')):

	/**
	 * Core Botisst Singleton Class
	 */
	final class BACA_Chat_Assistant
	{

		/**
		 * Instance
		 *
		 * @var self|null
		 */
		private static $instance = null;

		/**
		 * Get Instance (Singleton)
		 *
		 * @return self
		 */
		public static function get_instance()
		{
			if (null === self::$instance) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Constructor
		 */
		private function __construct()
		{
			require_once BACA_PATH . 'includes/class-baca-settings-handler.php';
			require_once BACA_PATH . 'includes/class-baca-db.php';
			require_once BACA_PATH . 'includes/class-baca-site-analyzer.php';
			require_once BACA_PATH . 'includes/class-baca-memory-optimizer.php';

			// Initialize REST Handlers.
			new BACA_Settings_Handler();

			register_activation_hook(BACA_FILE, [$this, 'baca_activate_plugin']);

			// Core Hooks.
			add_action('init', [$this, 'baca_register_ai_client']);
			add_action('init', [$this, 'baca_initialize_session_cookies']);
			add_action('init', [$this, 'baca_init_rag_engine']);
			add_action('admin_init', [$this, 'baca_maybe_redirect_after_activation']);
			add_action('admin_menu', [$this, 'baca_add_admin_menu']);
			add_action('admin_enqueue_scripts', [$this, 'baca_enqueue_admin_assets']);
			add_action('admin_notices', [$this, 'baca_render_setup_wizard_notice']);
			add_action('wp_ajax_baca_dismiss_setup_notice', [$this, 'baca_ajax_dismiss_setup_notice']);
			add_action('wp_enqueue_scripts', [$this, 'baca_enqueue_frontend_assets']);
			add_action('wp_footer', [$this, 'baca_render_global_chatbot']);
			add_shortcode('botisst_ai', [$this, 'baca_shortcode_render']);
			add_action('plugin_action_links_' . BACA_BASENAME, [$this, 'baca_add_settings_link']);

			// Integrations & Helpers.
			add_action('init', [$this, 'baca_init_integrations']);
			add_filter('http_request_timeout', [$this, 'baca_increase_http_timeout'], 9999, 2);
		}

		/**
		 * Plugin activation hook
		 */
		public function baca_activate_plugin()
		{
			BACA_DB::baca_create_tables();

			if (class_exists('BACA_MCP_Server')) {
				BACA_MCP_Server::cleanup_legacy_cache();
			}

			// Only redirect to the setup wizard the very first time the plugin is
			// ever activated — not on every reactivation/update. Settings already
			// contain defaults right after activation, so that option's presence
			// can't be used to detect a fresh install; use a dedicated flag instead.
			if (!get_option('baca_setup_wizard_redirection')) {
				update_option('baca_setup_wizard_status', 'pending');
			}
			set_transient('baca_activation_redirect', true, 60);
		}

		/**
		 * Redirect to the dashboard once, immediately after a fresh activation,
		 * so the first-run setup wizard can greet the admin.
		 *
		 * @return void
		 */
		public function baca_maybe_redirect_after_activation()
		{
			$wizard_status_nonce = isset($_GET['baca_wizard_status_nonce']) ? sanitize_text_field(wp_unslash($_GET['baca_wizard_status_nonce'])) : '';
			$has_valid_wizard_status_nonce = empty($wizard_status_nonce) || wp_verify_nonce($wizard_status_nonce, 'baca_wizard_status');

			if ($has_valid_wizard_status_nonce && isset($_GET['page']) && 'baca' === sanitize_text_field(wp_unslash($_GET['page'])) && isset($_GET['baca_wizard_status']) && 'completed' === sanitize_text_field(wp_unslash($_GET['baca_wizard_status']))) {
				update_option('baca_setup_wizard_status', 'completed');
			}

			if (!get_transient('baca_activation_redirect')) {
				return;
			}

			delete_transient('baca_activation_redirect');

			if (wp_doing_ajax() || defined('REST_REQUEST') && REST_REQUEST) {
				return;
			}

			if (isset($_GET['activate_multi']) || !current_user_can('manage_options')) {
				return;
			}

			update_option('baca_setup_wizard_redirection', 'done');

			wp_safe_redirect(admin_url('admin.php?page=baca'));
			exit;
		}

		/**
		 * Increase HTTP Timeout for AI API Requests securely during calls.
		 *
		 * @param int    $timeout Current explicit timeout integer sequence.
		 * @param string $url Target address payload URL sequence logic string.
		 * @return int Overridden explicit integer timeout sequence logic.
		 */
		public function baca_increase_http_timeout($timeout, $url)
		{
			if (
				strpos($url, 'generativelanguage.googleapis.com') !== false ||
				strpos($url, 'api.openai.com') !== false ||
				strpos($url, 'api.anthropic.com') !== false
			) {
				return 60;
			}
			return $timeout;
		}

		/**
		 * Enqueue Administrative Asset Routines
		 *
		 * @param string $hook Global administrative dashboard routing panel trigger sequence logic hook identifier string.
		 * @return void
		 */
		public function baca_enqueue_admin_assets($hook)
		{
			$is_wizard_pending = get_option('baca_setup_wizard_status') !== 'completed';
			if ('toplevel_page_baca' !== $hook && !$is_wizard_pending) {
				return;
			}

			if ('toplevel_page_baca' === $hook) {
				wp_enqueue_media();
			}

			// Note: In development, .css may not be generated.
			if (file_exists(BACA_PATH . 'build/admin/baca-dashboard.css')) {
				wp_enqueue_style('baca-dashboard-style', BACA_URL . 'build/admin/baca-dashboard.css', [], BACA_VERSION);
			}

			$asset_file = file_exists(BACA_PATH . 'build/admin/baca-dashboard.asset.php') ? require BACA_PATH . 'build/admin/baca-dashboard.asset.php' : ['dependencies' => ['wp-element', 'wp-components', 'wp-i18n', 'wp-api-fetch'], 'version' => BACA_VERSION];

			wp_enqueue_script('baca-dashboard-script', BACA_URL . 'build/admin/baca-dashboard.js', $asset_file['dependencies'], $asset_file['version'], true);

			// Pass the entire settings array to the dashboard React app
			$settings = BACA_Settings_Handler::baca_get_all_settings();

			// Mask api keys for UI display and gather available models
			$providers = ['openai', 'google', 'anthropic'];
			$models_list = [];
			foreach ($providers as $id) {
				$key = BACA_Settings_Handler::baca_get_provider_key($id);
				if (!empty($key)) {
					if (strlen($key) < 8) {
						$settings['api_keys'][$id] = '********';
					} else {
						$settings['api_keys'][$id] = substr($key, 0, 4) . '...' . substr($key, -4);
					}
				}
				$models_list[$id] = BACA_Settings_Handler::baca_get_models($id);
			}

			wp_localize_script(
				'baca-dashboard-script',
				'baca_data',
				[
					'rest_url' => esc_url_raw(rest_url('baca/v1/')),
					'nonce' => wp_create_nonce('wp_rest'),
					'settings' => $settings,
					'models_list' => $models_list,
					'load_limit' => get_user_meta(get_current_user_id(), 'baca_sessions_load_limit', true) ?: '100',
					'sort_order' => get_user_meta(get_current_user_id(), 'baca_sessions_sort_order', true) ?: 'desc',
					'show_setup_wizard' => get_option('baca_setup_wizard_status') === 'pending',
				]
			);
		}

		/**
		 * Render Setup Wizard notice on standard admin pages if pending.
		 *
		 * @return void
		 */
		public function baca_render_setup_wizard_notice()
		{
			$current_screen = function_exists('get_current_screen') ? get_current_screen() : null;
			if ($current_screen && 'toplevel_page_baca' === $current_screen->id) {
				return;
			}

			if (get_option('baca_setup_wizard_status') !== 'completed') {
				$dashboard_link = wp_nonce_url(
					admin_url('admin.php?page=baca&baca_wizard_status=completed'),
					'baca_wizard_status',
					'baca_wizard_status_nonce'
				);
				echo '<div class="notice notice-warning is-dismissible baca-setup-notice">';
				echo '<p>' . sprintf(
					/* translators: 1: run wizard link class/trigger, 2: dashboard link */
					esc_html__('To use the chatbot properly, please %1$srun the setup wizard%2$s or %3$sgo to the plugin dashboard%4$s to configure the settings.', 'botisst-ai-chat-assistant'),
					'<a href="#" class="baca-run-wizard-trigger">',
					'</a>',
					'<a href="' . esc_url($dashboard_link) . '">',
					'</a>'
				) . '</p>';
				echo '<div id="baca-wizard-standalone-root"></div>';
				?>
				<script type="text/javascript">
					jQuery(document).ready(function ($) {
						$(document).on('click', '.baca-setup-notice .notice-dismiss', function () {
							wp.ajax.post('baca_dismiss_setup_notice', {
								_wpnonce: '<?php echo esc_js(wp_create_nonce('baca_dismiss_notice_nonce')); ?>'
							});
						});
					});
				</script>
				<?php
				echo '</div>';
			}
		}

		/**
		 * AJAX callback to dismiss the setup wizard notice
		 *
		 * @return void
		 */
		public function baca_ajax_dismiss_setup_notice()
		{
			check_ajax_referer('baca_dismiss_notice_nonce');
			update_option('baca_setup_wizard_status', 'completed');
			wp_send_json_success();
		}

		/**
		 * Enqueue Frontend UI Application Asset Routines
		 *
		 * @return void
		 */
		public function baca_enqueue_frontend_assets()
		{
			if (file_exists(BACA_PATH . 'build/frontend/baca-frontend.css')) {
				wp_enqueue_style('baca-frontend-style', BACA_URL . 'build/frontend/baca-frontend.css', [], BACA_VERSION);
			}

			$asset_file = file_exists(BACA_PATH . 'build/frontend/baca-frontend.asset.php') ? require BACA_PATH . 'build/frontend/baca-frontend.asset.php' : ['dependencies' => ['wp-element'], 'version' => BACA_VERSION];
			wp_enqueue_script('baca-frontend-script', BACA_URL . 'build/frontend/baca-frontend.js', $asset_file['dependencies'], $asset_file['version'], true);

			$settings = BACA_Settings_Handler::baca_get_all_settings();
			$session_id = isset($_COOKIE['baca_session_id']) ? sanitize_text_field(wp_unslash($_COOKIE['baca_session_id'])) : '';
			$is_allowed = isset($_COOKIE['baca_clear_allowed']);

			wp_localize_script(
				'baca-frontend-script',
				'baca_frontend_data',
				[
					'rest_url' => esc_url_raw(rest_url('baca/v1/')),
					'nonce' => wp_create_nonce('wp_rest'),
					'settings' => $settings,
					'session_id' => $session_id,
					'clear_allowed' => $is_allowed,
				]
			);
		}

		/**
		 * Initialize session cookies purely on the client-side/user end.
		 *
		 * @return void
		 */
		public function baca_initialize_session_cookies()
		{
			if (is_admin() || wp_doing_ajax() || wp_doing_cron()) {
				return;
			}

			$session_id = isset($_COOKIE['baca_session_id']) ? sanitize_text_field(wp_unslash($_COOKIE['baca_session_id'])) : '';

			if (empty($session_id)) {
				$session_id = 'sess_' . wp_generate_password(9, false);

				// Set session ID cookie for 1 hour (3600 seconds)
				setcookie('baca_session_id', $session_id, time() + 3600, COOKIEPATH ? COOKIEPATH : '/', COOKIE_DOMAIN, is_ssl(), false);

				// Set clear allowed cookie for 30 minutes (1800 seconds)
				setcookie('baca_clear_allowed', 'true', time() + 1800, COOKIEPATH ? COOKIEPATH : '/', COOKIE_DOMAIN, is_ssl(), false);
			}
		}

		/**
		 * Render Global Chatbot Wrapper logic block template (Footer)
		 *
		 * @return void
		 */
		public function baca_render_global_chatbot()
		{
			$settings = BACA_Settings_Handler::baca_get_all_settings();

			if (empty($settings['display']['entire_site'])) {
				return;
			}

			// Validate and execute proper string comparisons during page exclusions.
			if (!empty($settings['display']['exclude_pages'])) {
				$excluded_ids = array_map('trim', explode(',', $settings['display']['exclude_pages']));
				if (in_array((string) get_the_ID(), $excluded_ids, true)) {
					return;
				}
			}

			if (empty($settings['display']['show_on_mobile']) && wp_is_mobile()) {
				return;
			}

			$this->baca_render_chatbot_ui();
		}

		/**
		 * Secure Element Shortcode Rendering
		 *
		 * @param array $atts Array configuration override parameters payload wrapper block.
		 * @return string HTML element.
		 */
		public function baca_shortcode_render($atts)
		{
			ob_start();
			$this->baca_render_chatbot_ui(true);
			return ob_get_clean();
		}

		/**
		 * Initialize Auxiliary Feature Support Extension Integrations Sequences
		 *
		 * @return void
		 */
		public function baca_init_integrations()
		{
			if (did_action('elementor/loaded')) {
				require_once BACA_PATH . 'includes/integrations/class-baca-elementor.php';
			}
		}

		/**
		 * Initialize RAG Engine if enabled
		 *
		 * @return void
		 */
		public function baca_init_rag_engine()
		{
			if (!file_exists(BACA_PATH . 'includes/class-baca-rag-engine.php')) {
				return;
			}

			require_once BACA_PATH . 'includes/class-baca-rag-engine.php';
			$rag_engine = BACA_RAG_Engine::get_instance();
			$rag_engine->init();
		}

		/**
		 * Render Base View Chatbot UI Template Frame Wrapper Extrusion
		 *
		 * @param bool $inline Target style orientation logic formatting flag payload.
		 * @return void
		 */
		public function baca_render_chatbot_ui($inline = false)
		{
			$wrapper_class = $inline ? 'baca-chat-root-inline' : 'baca-chat-root-floating';
			?>
			<div id="baca-frontend-root" class="<?php echo esc_attr($wrapper_class); ?>"
				data-inline="<?php echo esc_attr(wp_json_encode($inline)); ?>"></div>
			<?php
		}

		/**
		 * Add Core Global Admin Framework Interface Configuration Routing Menu Logic Sequence Wrapper Map
		 *
		 * @return void
		 */
		public function baca_add_admin_menu()
		{
			add_menu_page(
				esc_html__('Botisst', 'botisst-ai-chat-assistant'),
				esc_html__('Botisst', 'botisst-ai-chat-assistant'),
				'manage_options',
				'baca',
				[$this, 'baca_render_admin_page'],
				'dashicons-format-chat',
				9
			);
		}

		/**
		 * Render Admin Page Handler Frame Sequence Layout Component Router Injector Mapping Routine Setup Layer Configuration Extension File Target Inclusion Loader Routine Function Frame Scope Wrapper Block Module Injector Link Setup Map Call Trigger Routing Event Callback
		 *
		 * @return void
		 */
		public function baca_render_admin_page()
		{
			require_once BACA_PATH . 'admin/baca-dashboard/baca-dashboard.php';
		}

		/**
		 * Add Settings Link into Plugin Index Dashboard Roster Display Container Table
		 *
		 * @param array $links Array string mapping array map payload structure collection sequence element dictionary block items logic payload wrapper scope list mapping payload container arrays list sequence mappings dict matrix.
		 * @return array
		 */
		public function baca_add_settings_link($links)
		{
			$settings_link = '<a href="' . admin_url('admin.php?page=baca') . '">' . esc_html__('Settings', 'botisst-ai-chat-assistant') . '</a>';
			array_unshift($links, $settings_link);
			return $links;
		}

		/**
		 * Register Baseline Native Backend AI Client Engine Connection Frame Payload Instance Routing Loader Configuration Injector Object Wrapper Routing Sequence Logic Handler Boot Framework.
		 *
		 * @return void
		 */
		public function baca_register_ai_client()
		{
			$is_wp_ai_client_70 = function_exists('wp_ai_client_prompt');

			// Load SDK for older WP versions.
			if (!$is_wp_ai_client_70) {
				$sdk_autoload = BACA_PATH . 'vendor/wordpress/wp-ai-client/autoload.php';

				if (file_exists($sdk_autoload)) {
					require_once $sdk_autoload;
				}

				if (!class_exists('\WordPress\AI_Client\AI_Client')) {
					return;
				}
			}

			// Load providers autoload payload routing block file target maps configuration.
			$providers_autoload = BACA_PATH . 'includes/ai-providers/vendor/autoload.php';
			if (file_exists($providers_autoload)) {
				require_once $providers_autoload;
			}

			$registry = \WordPress\AiClient\AiClient::defaultRegistry();

			$this->baca_register_ai_provider(
				$registry,
				'openai',
				'\WordPress\OpenAiAiProvider\Provider\OpenAiProvider'
			);

			$this->baca_register_ai_provider(
				$registry,
				'google',
				'\WordPress\GoogleAiProvider\Provider\GoogleProvider'
			);

			$this->baca_register_ai_provider(
				$registry,
				'anthropic',
				'\WordPress\AnthropicAiProvider\Provider\AnthropicProvider'
			);

			$this->baca_migrate_to_unified_settings();

			// Initialize native legacy client protocol.
			if (!$is_wp_ai_client_70) {
				\WordPress\AI_Client\AI_Client::init();

				try {
					$http_transporter = \WordPress\AiClient\Providers\Http\HttpTransporterFactory::createTransporter();
					$registry->setHttpTransporter($http_transporter);
				} catch (\Exception $e) {
					// Silent failover.
				}
			}
		}

		/**
		 * Safe Routing Provider Verification Config Registration Core Payload Handler Action Module Routine Setup Logic Scope Frame Injector Component File Block Mapper Class Injection Target Target.
		 *
		 * @param \WordPress\AiClient\Registry\AiClientRegistry $registry Target memory architecture register layer injection.
		 * @param string                                        $name Provider architecture identifier key token identifier namespace target block token logic flag instance object framework variable instance scope definition structure element layer root parameter identity class token parameter name parameter structure name object block identity link flag node parameter property name frame identity parameter variable value variable logic string framework target root value array flag element class.
		 * @param string                                        $class Extensible logic parameter layer path object logic block item identifier logic key element link.
		 * @return void
		 */
		private function baca_register_ai_provider($registry, $name, $class)
		{
			if (class_exists($class) && !$registry->hasProvider($name)) {
				$registry->registerProvider($class);
			}
		}

		/**
		 * Migrate configurations securely from outdated schema to cohesive logic architecture structures safely and cleanly payload mapper.
		 *
		 * @return void
		 */
		private function baca_migrate_to_unified_settings()
		{
			if (get_option('baca_chat_assistant_settings_migrated')) {
				return;
			}

			$is_wp_ai_client_70 = function_exists('wp_ai_client_prompt');
			$settings = BACA_Settings_Handler::baca_get_all_settings();
			$migrated = false;

			$providers = ['openai', 'google', 'anthropic'];

			// 1. Migrate Logic Tokens.
			foreach ($providers as $provider) {
				$key = '';
				if ($is_wp_ai_client_70) {
					$key = get_option('connectors_ai_' . $provider . '_api_key');
				} else {
					$creds = get_option('wp_ai_client_provider_credentials', []);
					$key = isset($creds[$provider]) ? $creds[$provider] : '';
				}

				if (!empty($key) && empty($settings['api_keys'][$provider])) {
					$settings['api_keys'][$provider] = sanitize_text_field($key);
					$migrated = true;
				}
			}

			// 2. Map Legacy Bot Interface Configuration Framework Module Component.
			$old_bot_settings = get_option('baca_chatbot_settings');
			if (!empty($old_bot_settings) && is_array($old_bot_settings)) {
				$settings['chatbot'] = wp_parse_args($old_bot_settings, $settings['chatbot']);
				$migrated = true;
			}

			// 3. Map Default System Tier Iteration Payload Layer Logic Matrix Setup Object Array Index Element Structure Variable Object Name Parameter Identity Setup String Vector Map Setup.
			$old_models = get_option('baca_ai_selected_models');
			if (!empty($old_models) && is_array($old_models)) {
				$settings['models'] = wp_parse_args($old_models, $settings['models']);
				$migrated = true;
			}

			if ($migrated) {
				update_option('baca_chat_assistant_settings', $settings);
			}

			update_option('baca_chat_assistant_settings_migrated', true);
		}
	}

endif;

/**
 * Initialize Extensible Plugin Matrix Container Payload Engine Interface System Frame Block
 *
 * @return BACA_Chat_Assistant Singleton class return sequence instance payload setup mapping module structure object frame class link instance setup architecture parameter object variable instance framework variable item instance structure matrix block item logic property frame array property logic path node target map block structure module layout array logic string framework value logic object parameter identity scope logic node module matrix array string list tree frame item item path logic structure instance block list link pointer target item array matrix element key map structure array target root item index array instance value link node token node element block key tree array level architecture class.
 */
function baca_init()
{
	return BACA_Chat_Assistant::get_instance();
}

baca_init();
