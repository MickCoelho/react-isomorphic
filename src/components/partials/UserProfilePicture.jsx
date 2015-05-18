/*global fetch*/
'use strict';

var React = require( 'react' ),
    Title = require( 'react-document-title' ),
    Link = require( 'react-router' ).Link,
    mui = require( 'material-ui' );

var UserProfile = React.createClass( {

    render: function( ) {
        if (this.props.currentUser && this.props.currentUser.first_name){
            return (
                <div className='user-picture-container'>
                    <img className="user-picture" src={this.props.currentUser.picture}/>
                </div>
            );
        }else {
            return (
                <div className='user-picture-container'>
                </div>
            );
        }

    }

} );

module.exports = UserProfile;
