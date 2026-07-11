<?php
/**
 * BACA Key Store
 *
 * Owns AI provider API keys and secrets: storing/validating provider keys,
 * listing a provider's available models, and the symmetric encryption used
 * for other stored secrets (e.g. MCP server API keys).
 *
 * @package Botisst
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * Class BACA_Key_Store
 */
class BACA_Key_Store
{
	use BACA_REST_Helpers;

	/**
	 * Get a stored AI provider API key.
	 *
	 * @param string $provider Identifier for the AI provider.
	 * @return string The raw API key string if available.
	 */
	public static function get_provider_key($provider)
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
	 * Get the list of available models for an AI provider.
	 *
	 * Providers are already registered on the 'init' hook (see
	 * BACA_Chat_Assistant::baca_register_ai_client()), so this doesn't
	 * re-register them — this getter runs once per provider on every
	 * admin dashboard load. The resolved list is also cached in a
	 * transient keyed by provider + API key, since it only changes when
	 * the key changes or the bundled provider metadata is updated.
	 *
	 * @param string $provider Provider identifier (e.g. 'openai').
	 * @return array Map of model ID => model display name.
	 */
	public static function get_models($provider)
	{
		$key = self::get_provider_key($provider);

		if (empty($key)) {
			return [];
		}

		$cache_key = 'baca_models_' . $provider . '_' . md5($key);
		$cached = get_transient($cache_key);

		if (false !== $cached) {
			return $cached;
		}

		$registry = \WordPress\AiClient\AiClient::defaultRegistry();

		try {
			$className = $registry->getProviderClassName($provider);

			$auth = new \WordPress\AiClient\Providers\Http\DTO\ApiKeyRequestAuthentication($key);
			$registry->setProviderRequestAuthentication($provider, $auth);

			$modelDirectory = $className::modelMetadataDirectory();
			$models = [];

			foreach ($modelDirectory->listModelMetadata() as $model) {
				$models[$model->getId()] = $model->getName();
			}

			set_transient($cache_key, $models, HOUR_IN_SECONDS);

			return $models;
		} catch (\Exception $e) {
			self::log_debug('Botisst AI Providers Model Sync Error: ' . $e->getMessage());
			return [];
		}
	}

	/**
	 * Verify an API key by attempting to list the provider's available models.
	 *
	 * @param string $provider Provider identifier (e.g. 'openai').
	 * @param string $key API key to validate.
	 * @return bool|\WP_Error True if valid, WP_Error otherwise.
	 */
	public function validate_api_key($provider, $key)
	{
		$registry = \WordPress\AiClient\AiClient::defaultRegistry();

		$provider_names = [
			'openai' => 'OpenAI',
			'google' => 'Google Gemini',
			'anthropic' => 'Anthropic',
		];
		$provider_name = isset($provider_names[$provider]) ? $provider_names[$provider] : ucfirst($provider);

		try {
			$className = $registry->getProviderClassName($provider);

			$auth = new \WordPress\AiClient\Providers\Http\DTO\ApiKeyRequestAuthentication($key);
			$registry->setProviderRequestAuthentication($provider, $auth);

			$modelDirectory = $className::modelMetadataDirectory();
			$models = $modelDirectory->listModelMetadata();

			if (empty($models)) {
				/* translators: %s: AI provider name. */
				return new \WP_Error('invalid_key', sprintf(esc_html__('Invalid or unauthorized API key for %s.', 'botisst-ai-chat-assistant'), esc_html($provider_name)));
			}

			return true;
		} catch (\Exception $e) {
			$msg = $e->getMessage();
			
			if (
				strpos($msg, '401') !== false ||
				strpos($msg, '403') !== false ||
				stripos($msg, 'incorrect api key') !== false ||
				stripos($msg, 'unauthorized') !== false ||
				stripos($msg, 'invalid') !== false ||
				stripos($msg, 'key not found') !== false
			) {
				return new \WP_Error(
					'invalid_key',
					sprintf(esc_html__('Invalid API key for %s. Please check your credentials.', 'botisst-ai-chat-assistant'), esc_html($provider_name))
				);
			}

			return new \WP_Error('api_error', $msg);
		}
	}

	/**
	 * REST callback: validate and save each submitted provider API key, and
	 * any selected fallback models.
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response Standard API response.
	 */
	public function save_provider_keys($request)
	{
		$params = $request->get_json_params();
		$openai = isset($params['openai_key']) ? sanitize_text_field($params['openai_key']) : '';
		$google = isset($params['google_key']) ? sanitize_text_field($params['google_key']) : '';
		$anthropic = isset($params['anthropic_key']) ? sanitize_text_field($params['anthropic_key']) : '';
		$models = isset($params['models']) ? (array) $params['models'] : [];

		$errors = [];

		if ($openai) {
			$valid = $this->validate_api_key('openai', $openai);
			if (is_wp_error($valid)) {
				$errors['openai'] = $valid->get_error_message();
			} else {
				$this->persist_key('openai', $openai);
			}
		}

		if ($google) {
			$valid = $this->validate_api_key('google', $google);
			if (is_wp_error($valid)) {
				$errors['google'] = $valid->get_error_message();
			} else {
				$this->persist_key('google', $google);
			}
		}

		if ($anthropic) {
			$valid = $this->validate_api_key('anthropic', $anthropic);
			if (is_wp_error($valid)) {
				$errors['anthropic'] = $valid->get_error_message();
			} else {
				$this->persist_key('anthropic', $anthropic);
			}
		}

		// Save selected fallback models.
		if (!empty($models)) {
			foreach ($models as $provider => $model) {
				if (!empty($model)) {
					$this->persist_model_selection(sanitize_key($provider), sanitize_text_field($model));
				}
			}
		}

		if (!empty($errors)) {
			return new \WP_REST_Response(['success' => false, 'errors' => $errors], 400);
		}

		$providers = ['openai', 'google', 'anthropic'];
		$api_keys = [];
		$models_list = [];
		foreach ($providers as $id) {
			$key = self::get_provider_key($id);
			if (!empty($key)) {
				if (strlen($key) < 8) {
					$api_keys[$id] = '********';
				} else {
					$api_keys[$id] = substr($key, 0, 4) . '...' . substr($key, -4);
				}
			}
			$models_list[$id] = self::get_models($id);
		}

		return new \WP_REST_Response(
			[
				'success' => true,
				'message' => esc_html__('Settings saved successfully!', 'botisst-ai-chat-assistant'),
				'api_keys' => $api_keys,
				'models_list' => $models_list,
			],
			200
		);
	}

	/**
	 * REST callback: clear a provider's stored key and selected model.
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response Standard API response.
	 */
	public function reset_key($request)
	{
		$provider = sanitize_text_field($request->get_param('provider'));

		$settings = BACA_Settings_Handler::baca_get_all_settings();
		if (isset($settings['models'][$provider])) {
			$settings['models'][$provider] = '';
		}
		if (isset($settings['api_keys'][$provider])) {
			unset($settings['api_keys'][$provider]);
		}
		BACA_Settings_Handler::baca_persist_settings($settings);

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
	 * Encrypt Secret
	 *
	 * Symmetric encryption for secrets (e.g. MCP server API keys) stored in
	 * the settings option, keyed from this site's WordPress auth salt.
	 *
	 * @param string $plaintext Value to encrypt.
	 * @return string Base64-encoded IV + ciphertext, or '' on empty input/failure.
	 */
	public function encrypt_secret($plaintext)
	{
		if ('' === $plaintext) {
			return '';
		}

		$key = hash('sha256', wp_salt('auth'), true);
		$iv = random_bytes(openssl_cipher_iv_length('aes-256-cbc'));

		$ciphertext = openssl_encrypt($plaintext, 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);

		if (false === $ciphertext) {
			return '';
		}

		return base64_encode($iv . $ciphertext);
	}

	/**
	 * Decrypt Secret
	 *
	 * @param string $encoded Value produced by encrypt_secret().
	 * @return string Decrypted plaintext, or '' on empty input/failure.
	 */
	public function decrypt_secret($encoded)
	{
		if (empty($encoded)) {
			return '';
		}

		$raw = base64_decode($encoded, true);

		if (false === $raw) {
			return '';
		}

		$iv_length = openssl_cipher_iv_length('aes-256-cbc');
		$iv = substr($raw, 0, $iv_length);
		$ciphertext = substr($raw, $iv_length);

		$key = hash('sha256', wp_salt('auth'), true);
		$plaintext = openssl_decrypt($ciphertext, 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);

		return false === $plaintext ? '' : $plaintext;
	}

	/**
	 * Store an AI provider's API key in the legacy (non-unified) location the
	 * AI client SDK reads from, separately from baca_chat_assistant_settings.
	 *
	 * @param string $provider Provider identifier (e.g. 'openai').
	 * @param string $value API key value.
	 * @return void
	 */
	private function persist_key($provider, $value)
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
	 * Store a provider's selected fallback model.
	 *
	 * @param string $provider Provider identifier (e.g. 'openai').
	 * @param string $model    Selected model ID.
	 * @return void
	 */
	private function persist_model_selection($provider, $model)
	{
		$settings = BACA_Settings_Handler::baca_get_all_settings();
		if (!isset($settings['models'])) {
			$settings['models'] = [];
		}
		$settings['models'][$provider] = $model;
		BACA_Settings_Handler::baca_persist_settings($settings);
	}
}
