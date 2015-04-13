"use strict";

// This little dev server is basically a wrapped express server that
// 'hot loads' our javascript for super fast live reload in development
var webpack = require( 'webpack' );
var WebpackDevServer = require( 'webpack-dev-server' );
var clientConfig = require( './webpack.config' );
var clc = require( 'cli-color' );

var port = process.env.HOT_LOAD_PORT || 1337;

var compiler = new WebpackDevServer( webpack( clientConfig ), {
    name: 'server-side rendering',
    target: 'node',
    publicPath: 'http://localhost:' + port + '/build/',
    noInfo: false,
    inline: true,
    verbose: true,
    progress: true,
    colors: true,
    hot: true,
    lazy: false,
    quiet: true,
    debug: false,
    headers: { "Access-Control-Allow-Origin": "*" },
    stats: { colors: true }
} );

compiler.listen( port, 'localhost', function( err, result ) {
    if ( err ) {
        console.log( err );
        console.log( clc.red( err ) );
    }
    console.log( clc.green( 'Hot load server listening at localhost:' + port ) );
} );

module.exports = compiler;
