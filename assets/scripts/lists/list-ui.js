'use strict';
const api = require('./list-api.js');
const app = require('../app.js');
const singleEventListing = require('../templates/singleEvent.handlebars');
const myEventsListing = require('../templates/myEvents.handlebars');
const itemListing = require('../templates/newItem.handlebars');
const myItemsListing = require('../templates/myItems.handlebars');
const singleItem = require('../templates/singleItem.handlebars');
const searchEvents = require('../templates/searchEvents.handlebars');

const showEvents = (data) => {
  console.log(data);
  $('.content').append(myEventsListing(data));
};

const showItems = (data) => {
  console.log(data);
  $('.content').append(myItemsListing(data));
};

const eventCreated = (event) => {
  console.log(event);
  $("#create-event-modal").modal('hide');
  $('#event-name').val('');
  $('#event-location').val('');
  $('#event-date').val('');
  $('.content').append(singleEventListing(event));
};

const eventFailure = (data) => {
  console.log(data);
  $('#event-notes').append('<span style="color:red">Do not leave any fields blank. Please check that you have entered a valid date.</span>');
};

const deleteEventSuccess = (data) => {
};

const eventSelected = (event) => {
  $('.content').empty();
  $('.jumbotron').hide();
  $('.content').append(singleEventListing(event));
};

const itemAdded = (item) => {
  $('#add-item-modal').modal('hide');
  $('#item-table').append(itemListing(item));

};

const claimItemSuccess = (data) => {

};

const purchaseItemSuccess = (data) => {

};

const unpurchaseItemSuccess = (data) => {
  console.log(data);
};

const itemFailure = (data) => {
  $('#item-notes').append('<span style="color:red">Do not leave any fields blank.</span>');
};

const showAllEvents = (data) => {
  $('#search-field').val('');
  $('.content').empty();
  $('.content').append(myEventsListing(data));
};



module.exports = {
  showEvents,
  eventCreated,
  eventFailure,
  deleteEventSuccess,
  eventSelected,
  itemAdded,
  itemFailure,
  showItems,
  unpurchaseItemSuccess,
  showAllEvents,
};
