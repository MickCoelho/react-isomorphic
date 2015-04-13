"use strict";

var webpack = require( 'webpack' );
var path = require( 'path' );
var CommonsChunkPlugin = require( "webpack/lib/optimize/CommonsChunkPlugin" )

var port = process.env.HOT_LOAD_PORT || 1337;

var commonLoaders = [
    { test: /\.js$/, loader: "jsx-loader" },
    { test: /\.jsx$/, loader: "jsx-loader" },
    { test: /\.png$/, loader: "url-loader" },
    { test: /\.jpg$/, loader: "file-loader" },
];

var config = {
    verbose: true,
    progress: true,
    colors: true,
    debug: true,
    stats: { colors: true },
    name: 'browser',
    resolve: {
        extensions: [ '', '.js', '.jsx' ]
    },
    output: {
        path: path.join( __dirname, '/build/' ),
        filename: '[name].js',
        publicPath: 'http://localhost:' + port + '/build/',
        hotUpdateMainFilename: 'update/[hash]/update.json',
        hotUpdateChunkFilename: 'update/[hash]/[id].update.js'
    },
    module: {
        loaders: [ {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loaders: [ 'react-hot', 'babel' ]
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [ 'react-hot', 'babel' ]
            },
            {
                test: /\.scss$/,
                loader: "style!css!sass?outputStyle=compressed&" +
                    "includePaths[]=" +
                    ( path.resolve( __dirname, "./src/styles" ) ) +
                    "includePaths[]=" +
                    ( path.resolve( __dirname, "./node_modules" ) )
            }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ] },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            {
                test: /\.css$/,
                loader: "style/useable!style-loader!css-loader"
            }
        ]
    }
};

if ( process.env.NODE_ENV === "development" ) {
    config.devtool = 'eval';
    config.entry = {
        app: [
            'webpack-dev-server/client?http://localhost:' + port,

 // WebpackDevServer host and port
            'webpack/hot/dev-server',
            './src/client.jsx'
        ]
    };
    config.plugins = [
        new CommonsChunkPlugin( 'commons.chunk.js' ),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
}

if ( process.env.NODE_ENV !== "development" ) {
    config.entry = {
        app: [
            './src/client.jsx'
        ]
    };
    config.output.filename =  '[name].build.js';
    config.plugins = [
        new webpack.DefinePlugin( {
          "process.env": {
            "NODE_ENV": JSON.stringify( "production" )

 // This has effect on the react lib size
          }
        } ),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin( {
          compress: {
            warnings: false
          }
        } )
    ]

    // config.resolve.alias = {'react-a11y': function() {}}; // Aliases react-a11y to nothing in production
}

module.exports = config;
