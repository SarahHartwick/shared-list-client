'use strict';

// user require with a reference to bundle the file and use it in this file
// let example = require('./example');

const authEvents = require('./auth/events.js');
const listEvents = require('./lists/list-events.js');




// On document ready
$(() => {
  authEvents.addHandlers();
  authEvents.signInOrOut();
  listEvents.addHandlers();
});
