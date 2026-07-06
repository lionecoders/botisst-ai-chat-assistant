import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { ConfirmDialog } from './ui';

const PROVIDERS = {
	openai: {
		name: __('OpenAI', 'botisst-ai-chat-assistant'),
		link: 'https://platform.openai.com/settings/organization/api-keys',
	},
	google: {
		name: __('Google Gemini', 'botisst-ai-chat-assistant'),
		link: 'https://aistudio.google.com/api-keys',
	},
	anthropic: {
		name: __('Anthropic', 'botisst-ai-chat-assistant'),
		link: 'https://platform.claude.com/settings/keys',
	},
};

export default function ApiKeysTab({ settings, onSave, showNotice }) {
	const [ saving, setSaving ] = useState( false );
	const [ resetting, setResetting ] = useState( {} );
	const [ confirmingProvider, setConfirmingProvider ] = useState( null );
	const [ formData, setFormData ] = useState( {
		openai_key: '',
		google_key: '',
		anthropic_key: '',
		models: settings?.models || {},
	} );

	const isConnected = ( id ) => !! settings.api_keys?.[ id ];
	const getMaskedKey = ( id ) => settings.api_keys?.[ id ] || '';

	const handleModelChange = ( id, value ) => {
		setFormData( ( prev ) => ( { ...prev, models: { ...prev.models, [ id ]: value } } ) );
	};

	const handleKeyChange = ( id, value ) => {
		setFormData( ( prev ) => ( { ...prev, [ `${ id }_key` ]: value } ) );
	};

	const handleReset = async ( provider ) => {
		setResetting( ( prev ) => ( { ...prev, [ provider ]: true } ) );
		try {
			await apiFetch( {
				path: '/baca/v1/reset-key',
				method: 'POST',
				data: { provider },
			} );
			showNotice( __( 'Key reset successfully!', 'botisst-ai-chat-assistant' ), 'success' );
			setTimeout( () => window.location.reload(), 1000 );
		} catch ( error ) {
			showNotice( error.message || __( 'Failed to reset key', 'botisst-ai-chat-assistant' ), 'error' );
		} finally {
			setResetting( ( prev ) => ( { ...prev, [ provider ]: false } ) );
		}
	};

	const handleSubmit = async ( e ) => {
		e.preventDefault();
		setSaving( true );
		try {
			await apiFetch( {
				path: '/baca/v1/save-settings',
				method: 'POST',
				data: formData,
			} );
			showNotice( __( 'Settings saved successfully! Reloading...', 'botisst-ai-chat-assistant' ), 'success' );
			setTimeout( () => window.location.reload(), 1000 );
		} catch ( error ) {
			let errorMsg = error.message;
			if ( error.errors && typeof error.errors === 'object' ) {
				errorMsg = Object.values( error.errors ).join( ' | ' );
			}
			showNotice( errorMsg || __( 'Failed to save settings', 'botisst-ai-chat-assistant' ), 'error' );
		} finally {
			setSaving( false );
		}
	};

	const modelsList = window.baca_data?.models_list || {};

	return (
		<div className="baca-api-keys">
			<form onSubmit={ handleSubmit }>
				{ Object.entries( PROVIDERS ).map( ( [ id, providerData ] ) => (
					<article key={ id } className="baca-api-provider-card">
						<header className="baca-api-provider-card__header">
							<h3>{ providerData.name }</h3>
						</header>

						<div className="baca-api-provider-card__body">
							<div className="baca-api-field">
								<div className="baca-api-field__label-row">
									<label htmlFor={ `${ id }_key` }>
										{ __( 'API Key', 'botisst-ai-chat-assistant' ) }
									</label>
									{ isConnected( id ) && (
										<button
											type="button"
											className="baca-api-btn-reset"
											onClick={ () => setConfirmingProvider( id ) }
											disabled={ resetting[ id ] }
										>
											{ resetting[ id ]
												? <span className="baca-spinner" aria-hidden="true" />
												: __( 'Reset Key', 'botisst-ai-chat-assistant' ) }
										</button>
									) }
								</div>
								<input
									type="text"
									id={ `${ id }_key` }
									className={ `baca-api-input${ isConnected( id ) ? ' baca-api-input--masked' : '' }` }
									value={ isConnected( id ) ? getMaskedKey( id ) : formData[ `${ id }_key` ] }
									onChange={ ( e ) => handleKeyChange( id, e.target.value ) }
									placeholder={ __( `Enter your ${ providerData.name } API key`, 'botisst-ai-chat-assistant' ) }
									disabled={ isConnected( id ) }
								/>
								<a
									href={ providerData.link }
									className="baca-api-help-link"
									target="_blank"
									rel="noopener noreferrer"
								>
									{ __( `Generate your ${ providerData.name } API key here`, 'botisst-ai-chat-assistant' ) }
									<span className="dashicons dashicons-external" aria-hidden="true" />
								</a>
							</div>

							{ isConnected( id ) && modelsList[ id ] && Object.keys( modelsList[ id ] ).length > 0 && (
								<div className="baca-api-field">
									<label htmlFor={ `models_${ id }` }>
										{ __( 'Select Model', 'botisst-ai-chat-assistant' ) }
									</label>
									<select
										id={ `models_${ id }` }
										className="baca-api-select"
										value={ formData.models[ id ] || '' }
										onChange={ ( e ) => handleModelChange( id, e.target.value ) }
									>
										{ Object.entries( modelsList[ id ] ).map( ( [ modelId, modelName ] ) => (
											<option key={ modelId } value={ modelId }>
												{ modelName }
											</option>
										) ) }
									</select>
								</div>
							) }
						</div>
					</article>
				) ) }

				<footer className="baca-api-keys-footer">
					<button type="submit" className="baca-btn baca-btn-primary" disabled={ saving }>
						{ saving
							? <><span className="baca-spinner" aria-hidden="true" /> { __( 'Saving…', 'botisst-ai-chat-assistant' ) }</>
							: __( 'Save Settings', 'botisst-ai-chat-assistant' ) }
					</button>
				</footer>
			</form>

			<ConfirmDialog
				open={ !! confirmingProvider }
				title={ __( 'Reset API key', 'botisst-ai-chat-assistant' ) }
				message={ __( `Are you sure you want to reset the ${ PROVIDERS[ confirmingProvider ]?.name || '' } API key? This cannot be undone.`, 'botisst-ai-chat-assistant' ) }
				confirmLabel={ __( 'Reset Key', 'botisst-ai-chat-assistant' ) }
				busy={ resetting[ confirmingProvider ] }
				onCancel={ () => setConfirmingProvider( null ) }
				onConfirm={ () => {
					const provider = confirmingProvider;
					setConfirmingProvider( null );
					handleReset( provider );
				} }
			/>
		</div>
	);
}
