'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const app = require('../app.js');
const api = require('./list-api');
const ui = require('./list-ui');
const singleEventListing = require('../templates/singleEvent.handlebars');

const viewEvents = (event) => {
  event.preventDefault();
  $('.content').empty();
  api.showEvents()
  .done(ui.showEvents)
  .fail(ui.failure);
};

const createEvent = (event) => {
  event.preventDefault();
  $('.content').empty();
  let data = getFormFields(event.target);
  api.createEvent(data)
  .done(ui.eventCreated)
  .fail(ui.eventFailure);
  $('#event-notes').empty();
};

const viewItems = (event) => {
  event.preventDefault();
  $('.content').empty();
  api.showItems()
  .done(ui.showItems)
  .fail(ui.failure);
};

const clearForms = () => {
  $('#event-notes').empty();
};

const deleteEvent = (event) => {
  event.preventDefault();
  let data = $(event.target).data("id");
  api.deleteEvent(data)
  .done(ui.deleteEventSuccess)
  .fail(ui.failure);
  $(event.target).parent().hide();
};

const setEventId = (event) => {
  let id = $(event.target).data("id");
  $('#item-name').val('');
  $('#item-unit').val('');
  $('#item-event-id').val(id);
  $('#item-notes').empty();
};

const addItem = (event) => {
  event.preventDefault();
  $('#item-notes').empty();
  let data = getFormFields(event.target);
  api.addItem(data)
  .done(ui.itemAdded)
  .fail(ui.itemFailure);
};

const viewEvent = (event) => {
  event.preventDefault();
  let data = $(event.target).data("id");
  api.showEvent(data)
  .done(ui.eventSelected)
  .fail(ui.eventFailure);
};

const deleteItem = (event) => {
  event.preventDefault();
  let data = $(event.target).parent().data("id");
  api.deleteItem(data)
  .done(ui.deleteItemSuccess)
  .fail(ui.failure);
  $(event.target).parent().parent().parent().hide();
};

const claimItem = (event) => {
  let data = $(event.target).data("id");
  api.claimItem(data)
  .done(ui.claimItemSuccess)
  .fail(ui.failure);
  $(event.target).parent().html('<h5>You Claimed!</h5>');
};

const purchaseItem = (event) => {
  let data = $(event.target).data("id");
  api.purchaseItem(data)
  .done(ui.purchaseItemSuccess)
  .fail(ui.failure);
  $(event.target).parent().html('<h5>Purchased!</h5>');
};

const unclaimItem = (event) => {
  let data = $(event.target).parent().data("id");
  api.unclaimItem(data)
  .done(ui.unclaimItemSuccess)
  .fail(ui.failure);
  $(event.target).parent().parent().parent().hide();
};

const addHandlers = () => {
  $('#view-my-events').on('click', viewEvents);
  $('#create-event').on('click', clearForms);
  $('#create-event-form').on('submit', createEvent);
  $('#view-my-items').on('click', viewItems);
  $('#add-item-form').on('submit', addItem);
  $(document).on('click','#selectEvent', viewEvent);
  $(document).on('click','#deleteThis', deleteEvent);
  $(document).on('click','#addItem', setEventId);
  $(document).on('click','#deleteItem', deleteItem);
  $(document).on('click','#claim', claimItem);
  $(document).on('click','#purchase', purchaseItem);
  $(document).on('click','#unclaimItem', unclaimItem);
};

module.exports = {
  addHandlers,
};
