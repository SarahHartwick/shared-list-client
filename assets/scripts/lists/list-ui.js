'use strict';
const api = require('./list-api.js');
const app = require('../app.js');

const showEvents = (data) => {
  console.log(data);
};

const eventCreated = (data) => {
  console.log(data);
  $("#create-event-modal").modal('hide');
};

const eventFailure = (data) => {
  console.log(data);
  $('#event-notes').append('<span style="color:red">Do not leave any fields blank. Please check that you have entered a valid date.</span>');
};

module.exports = {
  showEvents,
  eventCreated,
  eventFailure,
};
