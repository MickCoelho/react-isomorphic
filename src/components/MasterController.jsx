
/*global fetch*/

'use strict';

var React = require( 'react' ),
    Title = require( 'react-document-title' ),
    Link = require( 'react-router' ).Link,
    Firebase = require( 'firebase' ),
    Router = require( 'react-router' ),
    mui = require( 'material-ui' ),
    BaseComponent = require( './Base.component' ),
    AppCanvas = mui.AppCanvas,
    RaisedButton = mui.RaisedButton,
    ProfileActions = require('../actions/ProfileActions');

require( 'isomorphic-fetch' );

var GConnect = React.createClass( {

    mixins: [ Router.State, BaseComponent ],

    componentWillMount: function() {
        if ( this.props.isClient ) {
            this.firebaseMaster = new Firebase('https://blistering-torch-8095.firebaseio.com/master');
            this.firebaseMaster.remove();
        }
    },

    _onClickPage: function() {
        this.firebaseMaster.set({ url: '/test' });
    },

    render: function() {

        return (
            <Title title='Master controller'>
                <div className="content-centered">
                    <p>Master controller</p>
                    <RaisedButton label="Go to page" className="centered-button" onClick={this._onClickPage} primary={true} />
                </div>
            </Title>
        );
    }

} );

module.exports = GConnect;
