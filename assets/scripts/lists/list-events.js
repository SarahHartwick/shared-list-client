'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const app = require('../app.js');
const api = require('./list-api');
const ui = require('./list-ui');

const viewEvents = (event) => {
  event.preventDefault();
  api.showEvents()
  .done(ui.showEvents)
  .fail(ui.failure);
};

const createEvent = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.createEvent(data)
  .done(ui.eventCreated)
  .fail(ui.eventFailure);
  $('#event-notes').empty();
};

const viewItems = (event) => {
  event.preventDefault();
  api.showItems()
  .done(ui.showEvents)
  .fail(ui.failure);
};

const clearForms = () => {
  $('#event-notes').empty();
};

const addHandlers = () => {
  $('#view-my-events').on('click', viewEvents);
  $('#create-event').on('click', clearForms);
  $('#create-event-form').on('submit', createEvent);
  $('#view-my-items').on('click', viewItems);
};

module.exports = {
  addHandlers,
};
