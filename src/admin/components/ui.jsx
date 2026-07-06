import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Shared confirmation dialog, replacing native window.confirm() calls so
 * destructive actions look consistent with the rest of the dashboard.
 */
export function ConfirmDialog( { open, title, message, confirmLabel, danger = true, busy = false, onConfirm, onCancel } ) {
	useEffect( () => {
		if ( ! open ) {
			return undefined;
		}
		document.body.classList.add( 'baca-modal-open' );
		const handleKeyDown = ( event ) => {
			if ( event.key === 'Escape' ) {
				onCancel();
			}
		};
		document.addEventListener( 'keydown', handleKeyDown );
		return () => {
			document.body.classList.remove( 'baca-modal-open' );
			document.removeEventListener( 'keydown', handleKeyDown );
		};
	}, [ open, onCancel ] );

	if ( ! open ) {
		return null;
	}

	return (
		<div className="baca-modal baca-confirm-modal is-visible" role="dialog" aria-modal="true" aria-labelledby="baca-confirm-title">
			<div className="baca-modal-overlay" onClick={ onCancel } />
			<div className="baca-modal-content baca-confirm-modal__content">
				<div className="baca-modal-header">
					<div className="baca-modal-title">
						<span className="baca-modal-title-icon" aria-hidden="true">
							<span className="dashicons dashicons-warning" />
						</span>
						<h3 id="baca-confirm-title">{ title }</h3>
					</div>
					<button type="button" className="baca-modal-close" onClick={ onCancel } aria-label={ __( 'Close', 'botisst-ai-chat-assistant' ) }>
						<span className="dashicons dashicons-no-alt" aria-hidden="true" />
					</button>
				</div>
				<div className="baca-modal-body baca-confirm-modal__body">
					<p>{ message }</p>
				</div>
				<div className="baca-modal-footer baca-confirm-modal__footer">
					<button type="button" className="baca-btn baca-btn-secondary" onClick={ onCancel } disabled={ busy }>
						{ __( 'Cancel', 'botisst-ai-chat-assistant' ) }
					</button>
					<button
						type="button"
						className={ `baca-btn ${ danger ? 'baca-btn-danger' : 'baca-btn-primary' }` }
						onClick={ onConfirm }
						disabled={ busy }
					>
						{ busy
							? <span className="baca-spinner" aria-hidden="true" />
							: ( confirmLabel || __( 'Confirm', 'botisst-ai-chat-assistant' ) ) }
					</button>
				</div>
			</div>
		</div>
	);
}
