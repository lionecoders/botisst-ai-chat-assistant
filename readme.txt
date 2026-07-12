=== Botisst - AI Chat Assistant ===
Contributors: lionecoders, deep7197
Tags: ai, chatbot, openai, chatgpt
Requires at least: 5.8
Tested up to: 7.0
Stable tag: 1.0.1
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

AI-powered chat plugin for WordPress. Connect multiple AI providers like OpenAI and Google Gemini seamlessly to your site.

== Description ==

Botisst is a modern, extensible AI chatbot solution for WordPress. By integrating natively with top-tier AI providers—including OpenAI and Google Gemini—you can provide your users with intelligent, multi-modal contextual support. 

Built with a lightning-fast React frontend and a robust settings dashboard, Botisst lets you fully customize the appearance, logic, and base knowledge text of your AI Virtual Assistant.

= Key Features =
*   **Multiple LLM Integrations**: Effortlessly fallback or swap between OpenAI and Google Gemini.
*   **Custom Prompt Instructions**: Instruct the chatbot on exactly how to behave.
*   **Knowledge Base**: Train the assistant directly with text snippets or URL links.
*   **Modern React Interface**: Beautiful dynamic tab dashboard and performant, non-blocking floating front-end widget.
*   **Database Chat Logging**: Review recent chatbot transcripts directly from your wp-admin area.

### Generate API Keys
Get your OpenAI API key here: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
Get your Gemini AI API key here: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/botisst-ai-chat-assistant` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Access the settings via the new **Botisst** menu inside your dashboard.
4. Add your OpenAI or Google Gemini API Keys in the **API Credentials** tab.
5. Customize your Chatbot UI and turn on **Global Visibility** to deploy!

== Frequently Asked Questions ==

= Does this plugin include free AI usage? =
No, you must supply your own secure API keys from platforms like OpenAI or Google. 

= Can I use shortcodes instead of the floating launcher? =
Yes! Just use `[botisst_ai]` anywhere in your post or page to render the chat context inline.

### AI Disclaimer
Botisst is powered by industry-leading providers including OpenAI and Google Gemini. Please be aware that AI-generated content can occasionally contain inaccuracies, and we recommend verifying important information.

### Important Links & Information
- **OpenAI Privacy Policy:**
[https://openai.com/policies/row-privacy-policy/](https://openai.com/policies/row-privacy-policy/)

- **OpenAI Terms of Use:**
[https://openai.com/policies/row-terms-of-use/](https://openai.com/policies/row-terms-of-use/)

- **Google Gemini Privacy Policy:**
[https://safety.google/intl/en_in/products/gemini/](https://safety.google/intl/en_in/products/gemini/)

- **Google Gemini API Terms:**
[https://ai.google.dev/gemini-api/terms](https://ai.google.dev/gemini-api/terms)

== Changelog ==

= 1.0.1 =
* Improve Folder Structure.
* Minor Textual Changes.

= 1.0.0 =
* Initial stable release.
* React-based UI overhaul.