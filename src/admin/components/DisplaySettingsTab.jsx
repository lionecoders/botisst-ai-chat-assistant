import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

export default function DisplaySettingsTab( { settings, onSave, showNotice } ) {
	const [ saving, setSaving ] = useState( false );
	const display = settings?.display || {};

	const [ formData, setFormData ] = useState( {
		entire_site: display.entire_site ?? false,
		show_on_mobile: display.show_on_mobile ?? true,
		exclude_pages: display.exclude_pages || '',
		position: display.position || 'bottom-right',
		launcher_text: display.launcher_text || '',
		trigger_type: display.trigger_type || 'click',
		trigger_delay: display.trigger_delay ?? 5,
	} );

	const handleChange = ( name, value ) => {
		setFormData( ( prev ) => ( { ...prev, [ name ]: value } ) );
	};

	const handleSubmit = async ( e ) => {
		e.preventDefault();
		setSaving( true );
		try {
			await apiFetch( {
				path: '/baca/v1/save-display-settings',
				method: 'POST',
				data: formData,
			} );
			onSave( {
				display: { ...display, ...formData },
			} );
			showNotice( __( 'Display settings saved successfully!', 'botisst-ai-chat-assistant' ) );
		} catch ( error ) {
			showNotice( error.message || __( 'Failed to save settings', 'botisst-ai-chat-assistant' ), 'error' );
		} finally {
			setSaving( false );
		}
	};

	const renderToggleCard = ( id, title, description, checked, onChange, icon = null ) => (
		<div className="baca-bot-setting-card">
			<div className="baca-bot-setting-card__main">
				{ icon }
				<div className="baca-bot-setting-card__text">
					<strong>{ title }</strong>
					<span>{ description }</span>
				</div>
			</div>
			<label className="baca-toggle" htmlFor={ id }>
				<input
					id={ id }
					type="checkbox"
					checked={ checked }
					onChange={ ( e ) => onChange( e.target.checked ) }
				/>
				<span className="baca-toggle-slider" aria-hidden="true" />
			</label>
		</div>
	);

	return (
		<div className="baca-display-settings">
			<form onSubmit={ handleSubmit }>
				{ renderToggleCard(
					'entire_site',
					__( 'Enable Site-wide Chatbot', 'botisst-ai-chat-assistant' ),
					__( 'Activate the chatbot across all pages of your website', 'botisst-ai-chat-assistant' ),
					formData.entire_site,
					( v ) => handleChange( 'entire_site', v )
				) }

				<div className="baca-display-grid">
					<div className="baca-bot-field">
						<label htmlFor="launcher_text">
							{ __( 'Chat Button Text', 'botisst-ai-chat-assistant' ) }
						</label>
						<input
							type="text"
							id="launcher_text"
							className="baca-bot-input"
							value={ formData.launcher_text }
							onChange={ ( e ) => handleChange( 'launcher_text', e.target.value ) }
							placeholder={ __( 'How can we help?', 'botisst-ai-chat-assistant' ) }
						/>
					</div>

					<div className="baca-bot-field">
						<label htmlFor="exclude_pages">
							{ __( 'Exclude Pages (comma-separated page IDs)', 'botisst-ai-chat-assistant' ) }
						</label>
						<input
							type="text"
							id="exclude_pages"
							className="baca-bot-input"
							value={ formData.exclude_pages }
							onChange={ ( e ) => handleChange( 'exclude_pages', e.target.value ) }
							placeholder={ __( 'e.g. 12, 45, 103', 'botisst-ai-chat-assistant' ) }
						/>
					</div>

					<div className="baca-bot-field">
						<label htmlFor="trigger_type">
							{ __( 'Auto-Open Trigger', 'botisst-ai-chat-assistant' ) }
						</label>
						<select
							id="trigger_type"
							className="baca-bot-select"
							value={ formData.trigger_type }
							onChange={ ( e ) => handleChange( 'trigger_type', e.target.value ) }
						>
							<option value="delay">
								{ __( 'On Page Load', 'botisst-ai-chat-assistant' ) }
							</option>
							<option value="click">
								{ __( 'Wait for Click', 'botisst-ai-chat-assistant' ) }
							</option>
						</select>
					</div>

					<div className="baca-bot-field">
						<label htmlFor="position">
							{ __( 'Widget Position on Screen', 'botisst-ai-chat-assistant' ) }
						</label>
						<select
							id="position"
							className="baca-bot-select"
							value={ formData.position }
							onChange={ ( e ) => handleChange( 'position', e.target.value ) }
						>
							<option value="bottom-right">
								{ __( 'Bottom Right', 'botisst-ai-chat-assistant' ) }
							</option>
							<option value="bottom-left">
								{ __( 'Bottom Left', 'botisst-ai-chat-assistant' ) }
							</option>
						</select>
					</div>
				</div>

				{ formData.trigger_type === 'delay' && (
					<div className="baca-bot-field baca-display-delay-field">
						<label htmlFor="trigger_delay">
							{ __( 'Delay (seconds)', 'botisst-ai-chat-assistant' ) }
						</label>
						<input
							type="number"
							id="trigger_delay"
							className="baca-bot-input"
							min="1"
							max="60"
							value={ formData.trigger_delay }
							onChange={ ( e ) => handleChange( 'trigger_delay', e.target.value ) }
						/>
					</div>
				) }

				{ renderToggleCard(
					'show_on_mobile',
					__( 'Show on Mobile', 'botisst-ai-chat-assistant' ),
					__( 'Optimize interface for mobile devices', 'botisst-ai-chat-assistant' ),
					formData.show_on_mobile,
					( v ) => handleChange( 'show_on_mobile', v ),
					<span className="baca-display-mobile-icon" aria-hidden="true">
						<span className="dashicons dashicons-smartphone" />
					</span>
				) }

				<footer className="baca-display-footer">
					<button type="submit" className="baca-btn baca-btn-primary" disabled={ saving }>
						{ saving
							? __( 'Saving…', 'botisst-ai-chat-assistant' )
							: __( 'Save', 'botisst-ai-chat-assistant' ) }
					</button>
				</footer>
			</form>
		</div>
	);
}
