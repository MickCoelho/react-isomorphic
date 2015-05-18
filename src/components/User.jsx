
/*global fetch*/

'use strict';

var React = require( 'react' ),
    Title = require( 'react-document-title' ),
    Link = require( 'react-router' ).Link,
    Firebase = require( 'firebase' ),
    Router = require( 'react-router' ),
    RouteHandler = Router.RouteHandler,
    mui = require( 'material-ui' ),
    Router = require( 'react-router' ),
    UserProfile = require( './partials/UserProfile' ),
    UserProfilePicture = require( './partials/UserProfilePicture' ),
    BaseComponent = require( './Base.component' ),
    Messages = require( './partials/Messages' ),
    AppCanvas = mui.AppCanvas,
    TextField = mui.TextField,
    Tabs = mui.Tabs,
    Tab = mui.Tab,
    RaisedButton = mui.RaisedButton,
    UsersStore = require('../stores/UsersStore'),
    ProfileActions = require('../actions/ProfileActions'),
    ProfileStore = require('../stores/ProfileStore');

require( 'isomorphic-fetch' );

var Home = React.createClass( {

    mixins: [ Router.State, BaseComponent ],

    getInitialState: function() {
        var userID = this.context.router.getCurrentParams().userId
        return {
            users: UsersStore.getUsers(),
            user: UsersStore.getUserById(userID),
            formDisabled: false,
            buttonMessage: 'Send message',
            textFieldLabel: '',
            userID: ''
        };
    },

    onChange: function() {
        var userID = this.context.router.getCurrentParams().userId;
        var user = UsersStore.getUserById(userID);
        this.setState({
            userID: userID,
            formDisabled: false,
            buttonMessage: 'Send message',
            user: user,
            textFieldLabel: 'Your message to ' + user.first_name
        });
    },

    componentDidMount: function() {
        this.unsubscribe = UsersStore.listen(this.onChange);
    },
    componentWillUnmount: function() {
        this.unsubscribe();
    },

    _onChangeTab: function(tabIndex, tab) {
    },

    _onCLickSend: function() {
        var that = this;
        var messageToSend = this.refs.messageToSend.getValue();
        if (messageToSend ===''){
            this.refs.messageToSend.setErrorText('An empty message, really?');
            return;
        }

        this.firebaseRef = new Firebase('https://blistering-torch-8095.firebaseio.com/users/' + this.readCookie('google_cinema_id'));
        this.firebaseRef.on("value", function(dataSnapshot) {
            // ProfileActions.createProfile( dataSnapshot.exportVal() );
            that._onGetProfileForMessages( dataSnapshot.exportVal());
        });

    },

    _onGetProfileForMessages: function(profile) {
        var messageToSend = this.refs.messageToSend.getValue();
        var timestamp = new Date().getTime();
        this.setState({
            userID: this.state.userID,
            formDisabled: false,
            buttonMessage: 'Message sent',
            textFieldLabel: '',
            user: this.state.user
        });
        this.refs.messageToSend.setErrorText('');
        this.refs.messageToSend.setValue('');
        this.refs.messageToSend.clearValue();

        var currentUser = this.state.user;
        var usersInfos = {
                sender:{
                    id: profile.id,
                    email: profile.email,
                    first_name: profile.first_name,
                    thumbnail: profile.thumbnail,
                    last_name: profile.last_name },
                receiver:{
                    id: currentUser.id,
                    email: currentUser.email,
                    first_name: currentUser.first_name,
                    thumbnail: currentUser.thumbnail,
                    last_name: currentUser.last_name }
            };
        var message = { type: 'message', message: messageToSend };

        var refReceiver = new Firebase('https://blistering-torch-8095.firebaseio.com/users_messages/' + currentUser.id + '/received_messages');
        var newReceivedMessage = refReceiver.push();
        newReceivedMessage.set({ user_info:usersInfos, message: message, timestamp: timestamp });

        var refSender = new Firebase('https://blistering-torch-8095.firebaseio.com/users_messages/' + profile.id + '/sent_messages');
        var newSentMessage = refSender.push();
        newSentMessage.set({ user_info:usersInfos, message: message, timestamp: timestamp });
    },

    render: function() {
        var currentUser = this.state.user;
        if (currentUser){
            this.state.textFieldLabel = 'Your message to ' + currentUser.first_name;
            return (
                <Title title='react-isomorphic - User'>
                    <div className='user-page'>
                        <Tabs onChange={this._onChangeTab}>
                            <Tab label="Messages" >
                                <div className="content-centered full-height">
                                    <Messages/>
                                    <div className='form'>
                                        <TextField
                                            ref="messageToSend"
                                            floatingLabelText={this.state.textFieldLabel}
                                            disabled={this.state.formDisabled}
                                            multiLine={false} />
                                        <RaisedButton
                                            ref="sendButton"
                                            label={this.state.buttonMessage}
                                            className="centered-button large-button"
                                            disabled={this.state.formDisabled}
                                            onClick={this._onCLickSend} primary={true} />
                                    </div>
                                </div>
                            </Tab>
                            <Tab label={"Profile"} >
                                <div className="content-centered">
                                    <UserProfile currentUser={currentUser}/>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </Title>
            );
        }else {
            return (<div></div>)
        }
    }

} );

module.exports = Home;
