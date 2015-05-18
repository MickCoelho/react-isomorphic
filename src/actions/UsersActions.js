/*global fetch*/

'use strict';

var Reflux = require('reflux');

var UsersActions = Reflux.createActions([
  'createUsers',
  'createUsersRoutes',
  'getUsers'
]);

module.exports = UsersActions;
