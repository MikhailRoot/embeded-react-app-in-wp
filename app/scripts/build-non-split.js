const externals = require( './externals' );
const rewire = require( 'rewire' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const defaults = rewire( 'react-scripts/scripts/build.js' );
const config = defaults.__get__( 'config' );

/* we inject our Externals to keep our bundles clean and slim */
config.externals = {
	...config.externals,
	...externals,
};

/*
 * we set jsonFunction of webpack to our custom one
 * so multiple js bundles built with webpack could be safely loaded,
 * as we are aware that our plugin isn't the only one which can be potentially built with webpack.
 */
config.output.jsonpFunction = 'YourReactApp_webpackJsonpjs';

/* we disable chunks optimization because we want single js\css file to be loaded by plugin. */
config.optimization.splitChunks = {
	cacheGroups: {
		default: false,
	},
};
config.optimization.runtimeChunk = false;
config.output.filename = 'static/js/[name].js';
config.output.chunkFilename = 'static/js/[name].js';

/*
* lets find `MiniCssExtractPlugin` type of object in plugins array and redefine it's options.
* And remove all unnecessary plugins.
*/
const disabledPlugins = [
	'GenerateSW',
	'ManifestPlugin',
	'InterpolateHtmlPlugin',
	'InlineChunkHtmlPlugin',
	'HtmlWebpackPlugin',
];
config.plugins = config.plugins.reduce( ( plugins, pluginItem ) => {

	if ( disabledPlugins.indexOf( pluginItem.constructor.name ) >= 0 ) {
		return plugins;
	}

	if ( pluginItem instanceof MiniCssExtractPlugin ) {
		plugins.push(
			new MiniCssExtractPlugin( {
				filename: 'static/css/[name].css',
				chunkFilename: 'static/css/[name].css',
			} )
		);
	} else {
		plugins.push( pluginItem );
	}

	return plugins;
}, [] );
