
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
    ProfileActions = require('../actions/ProfileActions'),
    config = require('../config'),
    ProfileStore = require('../stores/ProfileStore'),
    ProfileActions = require('../actions/ProfileActions');

require( 'isomorphic-fetch' );

var GConnect = React.createClass( {

    mixins: [ Router.State, BaseComponent ],

    componentWillMount: function() {

        if ( this.props.isClient ) {
            this.hello = require('../libs/hello.all.min');
            this.hello.init(config.oauthClients,config.oauthParams);

            this.hello.on('auth.login', this._onConnected);
        }
    },

    _onConnected: function(r) {
        this.hello( r.network ).api( '/me' ).then( this._onApi);
    },

    _onApi: function(p) {
        //Check if the user already logged-in
        var userID,
            that = this;
        if ( this.readCookie('google_cinema_id')){
            userID = this.readCookie('google_cinema_id');
            this._redirectToProfilePage(userID);
            return;
        }
        var ref = new Firebase('https://blistering-torch-8095.firebaseio.com/users/');
        var users,
            userAlreadySignedUp = false,
            i =0;

        ref.on('value', function(dataSnapshot) {
            users = dataSnapshot.val();
            for (var key in users) {
                if (users[key].email === p.email){
                    userAlreadySignedUp = true;
                    userID = key;
                    break;
                }
            }
            if (userAlreadySignedUp === false){
                var newUserRef = ref.push();
                userID = newUserRef.key();
                newUserRef.set({
                   id: userID,
                   email: p.email,
                   first_name: p.first_name,
                   last_name: p.last_name,
                   gender: p.gender,
                   picture: p.picture.split('?')[0],
                   thumbnail: p.thumbnail.split('?')[0]
                });
                that.bakeCookie('google_cinema_id', userID);
            }else {
                that.bakeCookie('google_cinema_id', userID);
            }
            that._redirectToProfilePage(userID);
        });
    },

    _redirectToProfilePage: function(userID) {
        this.context.router.transitionTo('/');
        // window.location.href = '/';
    },

    _onClickGConnect: function() {
        var that = this;
        this.hello.login('google')
            .then( function() {
                console.log('You are signed in to google');
            }, function( e ) {
                console.log(e.error);
                console.log('Signin error: ' + e.error.message );
            });
    },
    _onClickFConnect: function() {
        var that = this;
        this.hello.login('facebook')
            .then( function() {
                console.log('You are signed in to facebook');
            }, function( e ) {
                console.log(e.error);
                console.log('Signin error: ' + e.error.message );
            });
    },
    _onClickTConnect: function() {
        var that = this;
        this.hello.login('twitter')
            .then( function() {
                console.log('You are signed in to twitter');
            }, function( e ) {
                console.log(e.error);
                console.log('Signin error: ' + e.error.message );
            });
    },

    render: function() {

        return (
            <Title title='rehab social club - connect'>
                <div className="content-centered">
                    <div className='g-connect'>
                        <RaisedButton label="Google Connect" className="centered-button" onClick={this._onClickGConnect} primary={true} />
                        <RaisedButton label="Facebook Connect" disabled={true} className="centered-button" onClick={this._onClickFConnect} primary={true} />
                        <RaisedButton label="Twitter Connect" disabled={true} className="centered-button" onClick={this._onClickTConnect} primary={true} />
                    </div>
                </div>
            </Title>
        );
    }

} );

module.exports = GConnect;
