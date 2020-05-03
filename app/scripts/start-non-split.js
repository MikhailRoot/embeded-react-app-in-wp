const externals = require( './externals' );
const rewire = require( 'rewire' );
const defaults = rewire( 'react-scripts/scripts/start.js' );
const configFactory = defaults.__get__( 'configFactory' );

defaults.__set__( 'configFactory', ( env ) => {
	const config = configFactory( env );

	config.externals = {
		...config.externals,
		...externals,
	};

	config.optimization.splitChunks = {
		cacheGroups: {
			default: false,
		},
	};
	config.optimization.runtimeChunk = false;
	config.output.filename = 'static/js/[name].js';
	config.output.chunkFilename = 'static/js/[name].js';
	return config;
} );
