/*global fetch*/

'use strict';

var Reflux = require('reflux');
var UsersActions = require('../actions/UsersActions');

var _users = []; //This is private notes array
var _usersRoutes = []; //This is private notes array

var ProfileStore = Reflux.createStore({

    init: function() {
        // Here we listen to actions and register callbacks
        this.listenTo(UsersActions.createUsers, this.onCreate);
        this.listenTo(UsersActions.createUsersRoutes, this.onCreateRoutes);
        this.listenTo(UsersActions.getUsers, this.onGet);
    },
    onCreateRoutes: function(usersRoutes) {
        _usersRoutes = usersRoutes;
        this.trigger(_usersRoutes);
    },
    onCreate: function(users) {
        _users = users;
        this.trigger(_users);
    },

    getUsers: function() {
        return _users;
    },

    getUsersRoutes: function() {
        return _usersRoutes;
    },
    getUserById: function(userID) {
        return _users[userID];
    }
});

module.exports = ProfileStore;
