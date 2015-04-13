'use strict';
require( 'babel/register' );

// require("babel").register;
require( 'node-jsx' ).install( {
    extension: '.jsx'
} );
var express = require( 'express' );
var compression = require( 'compression' );
var cors = require( 'cors' );
var React = require( 'react' );
var routes = require( './routes' );
var Head = React.createFactory( require( './components/Head' ) );
var Router = require( 'react-router' );
var ReactDocumentTitle = require( 'react-document-title' );
var UAParser = require( 'ua-parser-js' );
var path = require( 'path' );
var fs = require( 'fs' );
var url = require( 'url' );
var proxy = require( 'proxy-middleware' );
var clc = require( 'cli-color' );

// Setup the express server
var server = express();

// Gzip all the things
server.use( compression() );

// Serve a static directory for the webpack-compiled Javascript and CSS. Only in production since the webpack dev server handles this otherwise.
// if (process.env.NODE_ENV === "production") {
server.use( '/build', express.static( path.join( __dirname, '../build' ) ) );

// }

// Proxy setup to redirect to webpack hot load server if dev mode
if ( process.env.NODE_ENV === 'development' ) {
    var hotLoadPort = process.env.HOT_LOAD_PORT || 1337;
    server.use( '/build', proxy( url.parse( 'http://localhost:' + hotLoadPort + '/build' ) ) );
}

// Cross-origin resource sharing
server.use( cors() );

// Our handler for all incoming requests
server.use( function( req, res ) {

    // In order to handle "media queries" server-side (preventing FOUT), we parse the user agent string,
    // and pass a string down through the router that lets components style and render themselves
    // For the correct viewport. Client.js uses window width, which resolves any problems with
    // browser sniffing.
    var parser = new UAParser();
    var ua = parser.setUA( req.headers['user-agent'] ).getResult();
    var deviceType = '';
    if ( ua.device.type === undefined ) {
        deviceType = 'desktop';
    } else {
        if ( ua.device.type !== 'mobile' && ua.device.type !== 'tablet' ) {
            deviceType = 'desktop';
        } else {
            deviceType = ua.device.type;
        }
    }

    // We customize the onAbort method in order to handle redirects
    var router = Router.create( {
        routes: routes,
        location: req.path,
        onAbort: function defaultAbortHandler( abortReason ) {
            if ( abortReason && abortReason.to ) {
                res.redirect( 301, abortReason.to );
            } else {
                res.redirect( 404, '404' );
            }
        }
    } );

    var content = '';
    var criticalCompStylesSrc = '';
    var route;

    // Run the router, and render the result to string
    router.run( function( Handler, state ) {
        route = state.routes[state.routes.length - 1];
        if ( route ) {
            criticalCompStylesSrc = '/' + route.name + '/' + deviceType + '.css';
        }
        content = React.renderToString( React.createElement( Handler, {
            stylesSrc: criticalCompStylesSrc,
            routerState: state,
            deviceType: deviceType,
            isClient: false,
            environment: 'server'
        } ), null );
    } );

    // Resets the document title on each request
    var title = ReactDocumentTitle.rewind();

    // Render <head> to string
    var head = React.renderToStaticMarkup( new Head( {
        title: title
    } ) );

    // Write the response
    res.write( '<html>' );
    res.write( head );

    var criticalStylePath = path.join( __dirname, '..', 'build', 'css', 'critical' );

    //Load global critical styles
    var criticalMainStyles = fs.readFileSync( criticalStylePath + '/App/main.css' );
    res.write( '<style type="text/css" id="dangerous-styles">' );
    res.write( criticalMainStyles );

    //Load current componenet critical styles (only if exists)
    if ( fs.existsSync( criticalStylePath + criticalCompStylesSrc ) ) {
        var criticalCompStyles = fs.readFileSync( criticalStylePath + criticalCompStylesSrc );
        res.write( criticalCompStyles );
    }
    res.write( '</style>' );

    res.write( '<body>' );
    res.write( '<div id="wrapper">' );
    res.write( content );
    res.write( '</div>' );
    res.write( '</body>' );

    // Inject the compiled javascript (served by a WebpackDevServer on dev mode, which lets us 'hot load' scripts in for live editing)
    if ( process.env.NODE_ENV === 'development' ) {

        //Build is separated in two files
        //so when we update the components, webpack will only reload that piece of code
        //instead of loading it with all the libs
        res.write( '<script src="/build/commons.chunk.js" async></script>' );
        res.write( '<script src="/build/app.js" async></script>' );
    }
    if ( process.env.NODE_ENV !== 'development' ) {
        res.write( '<script src="/build/app.build.js" async></script>' );
    }

    res.write( '</html>' );
    res.end();

} );

var port = process.env.PORT || 8080;
server.listen( port );

if ( process.env.NODE_ENV === 'development' ) {
    console.log( clc.green( 'server.js is listening on port ' + port ) );
}
