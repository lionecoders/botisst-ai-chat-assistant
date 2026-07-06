<?php
/**
 * Botisst AI Chatbot Dashboard
 *
 * @package Botisst-ai-chat-assistant
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// React mount point
echo '<div id="baca-admin-root"></div>';

// Output an error if JavaScript is disabled.
?>
<noscript>
    <div class="notice notice-error">
        <p><?php esc_html_e( 'Botisst requires JavaScript to be enabled in your browser to load the dashboard.', 'botisst-ai-chat-assistant' ); ?></p>
    </div>
</noscript>