/*global fetch*/
'use strict';

var React = require( 'react' ),
    Title = require( 'react-document-title' ),
    Router = require( 'react-router' ),
    RouteHandler = Router.RouteHandler,
    mui = require( 'material-ui' ),
    AppCanvas = mui.AppCanvas,
    BaseComponent = require( './Base.component' ),
    Nav = require( './Nav' );

var criticalStyles,
    nonCriticalStyles;

// This adds accessibility warnings to the console in development
// var a11y = require('react-a11y');
// a11y();

var App = React.createClass( {

    mixins: [ Router.State, BaseComponent ],

    componentWillMount: function() {
        if ( this.props.isClient ) {
            criticalStyles = require( '../../build/css/critical/App/main.css' );
            criticalStyles.ref();
            nonCriticalStyles = require( '../../build/css/non-critical/App/main.css' );
            nonCriticalStyles.ref();

            //Remove styles inlined by the server
            //They're now loaded into the JS
            document.getElementById( 'dangerous-styles' ).remove();
        }
    },

    render: function() {
        return (
            <Title title='My App'>
                <div>
                    <Nav/>
                    <AppCanvas predefinedLayout={1} className="content-wrapper">
                        <RouteHandler deviceType={this.props.deviceType} isClient={this.props.isClient} stylesSrc={this.props.stylesSrc} />
                    </AppCanvas>
                </div>
            </Title>
        );
    }

} );

module.exports = App;
