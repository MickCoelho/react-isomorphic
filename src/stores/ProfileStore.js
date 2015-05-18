/*global fetch*/

'use strict';

var Reflux = require('reflux');
var ProfileActions = require('../actions/ProfileActions');

var _profileID = '';
var _profile = [];

var ProfileStore = Reflux.createStore({

    init: function() {
        // Here we listen to actions and register callbacks
        this.listenTo(ProfileActions.createProfile, this.onCreate);
        this.listenTo(ProfileActions.createProfileMessages, this.onCreateMessages);
        this.listenTo(ProfileActions.getProfile, this.onGet);
    },
    onCreate: function(profile) {
        _profile = profile;
        this.trigger(_profile);
    },
    onCreateMessages: function(messagesSnapshot) {
        var profileMessages,
            that = this,
            messagesSnapshot,
            message,
            key;

        profileMessages = [];
        if (!messagesSnapshot) return
        for (var key in messagesSnapshot.received_messages) {
            message = messagesSnapshot.received_messages[key];
            profileMessages.push({
                timestamp: message.timestamp,
                id: message.user_info.sender.id,
                isSender: false,
                thumbnail: message.user_info.sender.thumbnail,
                email: message.user_info.sender.email,
                first_name: message.user_info.sender.first_name,
                last_name: message.user_info.sender.last_name,
                message: message.message.message
            });
        }
        for (var key in messagesSnapshot.sent_messages) {
            message = messagesSnapshot.sent_messages[key];
            profileMessages.push({
                timestamp: message.timestamp,
                id: message.user_info.receiver.id,
                isSender: true,
                thumbnail: message.user_info.sender.thumbnail,
                email: message.user_info.receiver.email,
                first_name: message.user_info.receiver.first_name,
                last_name: message.user_info.receiver.last_name,
                message: message.message.message
            });
        }
        _profile.messages = this.filterBy(this.sortByKey(profileMessages, 'timestamp'), 'email') ;
        this.trigger(_profile);
    },
    // onGet: function(profile) {
    //     _profile.push(profile);
    // },

    getProfile: function() {
        return _profile;
    },

    getProfileID: function() {
        return _profileID;
    },

    getMessagesWith: function(email) {
        var i = 0,
            conversation,
            currentLoopEmail = '';
        if ( _profile ){
            if ( _profile.messages ){
                for ( i = 0; i < _profile.messages.length ; i++){
                    conversation = _profile.messages[i];
                    currentLoopEmail = conversation[0].email;
                    if (currentLoopEmail === email){
                        return this.sortByKey(conversation, 'timestamp', true);
                    }
                }
            }
        }
        return [];
    },

    sortByKey: function(array, key, descending) {
        return array.sort(function(a, b) {
            if (descending){
                var x = a[key];
                var y = b[key];
            }else {
                var y = a[key];
                var x = b[key];
            }
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    },

    groupBy:function( array , f, filterProperty ) {
        var groups = {};
        array.forEach( function( o ) {
            var group = JSON.stringify( f(o) );
            groups[group] = groups[group] || [];
            groups[group].push( o );
        });
        return Object.keys(groups).map( function( group ) {
            return groups[group];
        })
    },

    filterBy: function(array, filterProperty) {
        var result = this.groupBy(array, function(item) {
            var arr = [ item[filterProperty] ]
            return arr;
        }, filterProperty);
        return result;
    }
});

module.exports = ProfileStore;
