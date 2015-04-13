
/*global fetch*/

'use strict';

var React = require( 'react' );
var Title = require( 'react-document-title' );
var Link = require( 'react-router' ).Link;
require( 'isomorphic-fetch' );
var criticalStyles;
var nonCriticalStyles;

var BaseComponent = {

    componentWillMount: function() {
        if ( this.props.isClient ) {
            criticalStyles = require( '../../build/css/critical' + this.props.stylesSrc + '/main.css' );
            criticalStyles.ref();
            nonCriticalStyles = require( '../../build/css/non-critical' + this.props.stylesSrc + '/main.css' );
            nonCriticalStyles.ref();
        }
    }

};

module.exports = BaseComponent;
