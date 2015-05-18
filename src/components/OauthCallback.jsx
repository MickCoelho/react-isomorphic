
/*global fetch*/

'use strict';

var React = require( 'react' ),
    Title = require( 'react-document-title' ),
    Link = require( 'react-router' ).Link,
    Firebase = require( 'firebase' ),
    mui = require( 'material-ui' ),
    BaseComponent = require( './Base.component' ),
    AppCanvas = mui.AppCanvas,
    RaisedButton = mui.RaisedButton;

require( 'isomorphic-fetch' );

var GConnect = React.createClass( {

    mixins: [ BaseComponent ],

    render: function() {

        return (
            <Title title='rehab social club - connect'>
                <div className='home'>
                    <p>You're now connected</p>
                </div>
            </Title>
        );
    }

} );

module.exports = GConnect;
