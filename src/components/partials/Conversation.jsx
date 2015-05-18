/*global fetch*/
'use strict';

var React = require( 'react' ),
    Title = require( 'react-document-title' ),
    Link = require( 'react-router' ).Link,
    mui = require( 'material-ui' ),
    Paper = mui.Paper,
    Router = require( 'react-router' ),
    FlatButton = mui.FlatButton;

var UsersStore = require('../../stores/UsersStore');

var Conversation = React.createClass( {
    mixins: [ Router.State ],

    renderConversation: function() {
        var messageTime = new Date(this.props.conversation.timestamp);
        var messageHour = messageTime.getHours();
        var messageMinutes = messageTime.getMinutes();
        if (messageMinutes < 10) messageMinutes = '0' + messageMinutes;
        var messageTimeStr = messageHour + ':' + messageMinutes;
        return (
            <div>
                <div className='conversation'>
                    <div className='user-picture-container'>
                        <img className="user-picture" src={UsersStore.getUserById(this.props.conversation.id).thumbnail}/>
                    </div>
                    <p className="user-name">{this.props.conversation.first_name + ' ' + this.props.conversation.last_name.substr(0, 1) +'.'}</p>
                    <p className="message-time">{messageTimeStr}</p>
                    <p className="message">{this.props.conversation.message}</p>
                    <br/>
                </div>
            </div>
        );
    },

    _onClickConversation: function() {
        var that = this;
        setTimeout(function() {
            that.context.router.transitionTo( '/user/' + that.props.conversation.id );
        }, 100);
    },

    render: function( ) {
        return (
            <div>
                <FlatButton to="/user" className="conversation-button"
                    label={this.renderConversation()} primary={true}
                    onClick={this._onClickConversation}>
                </FlatButton>
            </div>
        );

    }

} );

module.exports = Conversation;
