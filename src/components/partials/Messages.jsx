/*global fetch*/
'use strict';

var React = require( 'react' ),
    Title = require( 'react-document-title' ),
    Link = require( 'react-router' ).Link,
    mui = require( 'material-ui' ),
    Paper = mui.Paper,
    Router = require( 'react-router' ),
    FlatButton = mui.FlatButton;

var UsersStore = require('../../stores/UsersStore'),
    ProfileActions = require('../../actions/ProfileActions'),
    ProfileStore = require('../../stores/ProfileStore');

var Messages = React.createClass( {
    mixins: [ Router.State ],

    getInitialState: function() {
        var userID = this.context.router.getCurrentParams().userId
        var user = UsersStore.getUserById(userID);
        return {
            profile: ProfileStore.getProfile(),
            user: UsersStore.getUserById(userID),
            messagesWithUser: ProfileStore.getMessagesWith(user.email),
            userID: userID
        };
    },

    readCookie: function(name) {
        var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
        result && (result = JSON.parse(result[1]));
        return result;
    },

    onChange: function() {
        var userID = this.context.router.getCurrentParams().userId;
        var user = UsersStore.getUserById(userID);
        this.setState({
            profile: ProfileStore.getProfile(),
            user: UsersStore.getUserById(userID),
            messagesWithUser: ProfileStore.getMessagesWith(user.email),
            userID: this.state.userID
        });

        var objDiv = document.getElementById('messages');
        objDiv.scrollTop = objDiv.scrollHeight;
    },

    componentDidMount: function() {
        this.unsubscribe = UsersStore.listen(this.onChange);
        // this.unsubscribeProfile = ProfileStore.listen(this.onChange);

    },
    componentWillUnmount: function() {
        this.unsubscribe();
        // this.unsubscribeProfile();
    },
    renderMessage: function(message, i) {
        var messageTime = new Date(message.timestamp);
        var messageHour = messageTime.getHours();
        var messageMinutes = messageTime.getMinutes();
        if (messageMinutes < 10) messageMinutes = '0' + messageMinutes;
        var messageTimeStr = messageHour + ':' + messageMinutes;

        var className = 'right';
        if (message.isSender){
            className = 'left';
        }
            return (<div className={className + ' message-wrapper'} key={i} zDepth={1}>
                        <div className='user-picture-container'>
                            <img className="user-picture" src={message.thumbnail}/>
                        </div>
                        <div className='message'>
                            <p className='text'>{message.message}</p>
                            <p className='time'>{messageTimeStr}</p>
                        </div>
                </div>
            )
    },

    render: function( ) {
        var userID = this.context.router.getCurrentParams().userId
        var user = UsersStore.getUserById(userID);
        var that = this;
        return (
            <div>
                <div className='messages' id='messages'>
                    {this.state.messagesWithUser.map(function(message, i) {
                        return <div key={i}>{that.renderMessage(message, i)}</div>
                    })}
                </div>
            </div>
        );

    }

} );

module.exports = Messages;
