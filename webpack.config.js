const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	entry: {
		'admin/baca-dashboard': './src/admin/index.js',
		'frontend/baca-frontend': './src/frontend/index.js',
	},
};
