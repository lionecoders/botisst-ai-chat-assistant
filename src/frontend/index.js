import './baca-frontend.css';
import { render } from '@wordpress/element';
import ChatWidget from './ChatWidget';

document.addEventListener( 'DOMContentLoaded', () => {
	const root = document.getElementById( 'baca-frontend-root' );
	if ( root ) {
        const isInline = root.getAttribute('data-inline') === 'true';
		render( <ChatWidget settings={window.baca_frontend_data.settings} inline={isInline} />, root );
	}
} );
