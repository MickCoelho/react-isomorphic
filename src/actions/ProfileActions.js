/*global fetch*/

'use strict';

var Reflux = require('reflux');

var ProfileActions = Reflux.createActions([
  'createProfile',
  'createProfileMessages',
  'getProfile'
]);

module.exports = ProfileActions;
