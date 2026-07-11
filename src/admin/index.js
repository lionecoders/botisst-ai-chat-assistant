import './baca-dashboard.css';
import { render } from '@wordpress/element';
import Dashboard from './Dashboard';

document.addEventListener( 'DOMContentLoaded', () => {
	const root = document.getElementById( 'baca-admin-root' );
	if ( root ) {
		render( <Dashboard settings={window.baca_data.settings} />, root );
	}
} );
