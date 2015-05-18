/*global fetch*/
'use strict';

var React = require( 'react' ),
    Title = require( 'react-document-title' ),
    Link = require( 'react-router' ).Link,
    UserProfilePicture = require( './UserProfilePicture' ),
    mui = require( 'material-ui' );

var UserProfile = React.createClass( {

    render: function( ) {
        if (this.props.currentUser && this.props.currentUser.first_name){
            return (
                <div className='profile'>
                    <UserProfilePicture currentUser={this.props.currentUser}/>
                    <h3 className="user-first-name">{this.props.currentUser.first_name +' ' + this.props.currentUser.last_name}</h3>
                    <em className="user-email">{this.props.currentUser.email}</em>
                </div>
            );
        }else {
            return (
            <div className='profile'>
                <em className="user-email">Loading user's infos...</em>
            </div>
            );
        }

    }

} );

module.exports = UserProfile;
