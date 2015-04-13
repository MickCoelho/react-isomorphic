/*global fetch*/
'use strict';

var React = require( 'react' );
var routes = require( './routes' );
var Router = require( 'react-router' );
var injectTapEventPlugin = require( "react-tap-event-plugin" );
injectTapEventPlugin();

var deviceType;
if ( window.matchMedia( "(max-width: 639px)" ).matches ) {
    deviceType = "mobile";
} else if ( window.matchMedia( "(max-width: 768px)" ).matches ) {
    deviceType = "tablet";
} else {
    deviceType = "desktop";
}

Router.run( routes, Router.HistoryLocation, function( Handler, state ) {
    var route = state.routes[state.routes.length - 1];
    if ( route ) {
        var stylesSrc = '/' + route.name;
    }

    React.render(
        <Handler routerState = { state }
        stylesSrc = { stylesSrc }
        isClient = { true }
        deviceType = { deviceType }
        environment = "browser" / >, document.getElementById( 'wrapper' ) );
} );

