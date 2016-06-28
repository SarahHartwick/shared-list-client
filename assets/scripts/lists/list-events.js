'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const app = require('../app.js');
const api = require('./list-api');
const ui = require('./list-ui');
const singleEventListing = require('../templates/singleEvent.handlebars');

const viewEvents = (event) => {
  event.preventDefault();
  $('.content').empty();
  $('.jumbotron').hide();
  api.showEvents()
  .done(ui.showEvents)
  .fail(ui.failure);
  api.showMyEvents()
  .done(ui.showMyEvents)
  .fail(ui.failure);
};

const createEvent = (event) => {
  event.preventDefault();
  $('.content').empty();
  $('.jumbotron').hide();
  let data = getFormFields(event.target);
  api.createEvent(data)
  .done(ui.eventCreated)
  .fail(ui.eventFailure);
  $('#event-notes').empty();
};

const viewItems = (event) => {
  event.preventDefault();
  $('.content').empty();
  $('.jumbotron').hide();
  api.showItems()
  .done(ui.showItems)
  .fail(ui.failure);
};

const searchEvents = (event) => {
  event.preventDefault();
  $('.content').empty();
  $('#welcome').empty();
  // $('.jumbotron').show();
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

const setEventIdForSharing = (event) => {
  let id = $(event.target).data("id");
  $('#invite-email').val('');
  $('#invite-event-id').val(id);
  $('#event-notes').empty();
  $('#add-friends').empty();
  $('#add-friends').html('<center><h3 style="color:#000">Friends Invited:</h3>');
  ui.listInvites(id)
  .done(ui.allFriendsInvited)
  .fail(ui.failure);
};

const addItem = (event) => {
  event.preventDefault();
  $('#item-notes').empty();
  let data = getFormFields(event.target);
  api.addItem(data)
  .done(ui.itemAdded)
  .fail(ui.itemFailure);
};

const inviteFriend = (event) => {
  event.preventDefault();
  let profile = $(event.target).data("id");
  let eventid = $('#invite-event-id').val();
  let data = { "profileId": profile , "eventId": eventid  };
  $('#event-notes').empty();
  api.inviteFriend(data)
  .done(ui.friendInvited)
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
  $(event.target).parent().html('<h5><span style="color:#236167" class="glyphicon glyphicon-user"></span> You Claimed!</div></h5>');
};

const purchaseItem = (event) => {
  let data = $(event.target).data("id");
  api.purchaseItem(data)
  .done(ui.purchaseItemSuccess)
  .fail(ui.failure);
  $(event.target).closest('#purchased').html('<h5><span style="color:#236167" id="unpurchase" data-id=' + data + ' class="glyphicon glyphicon-ok"></span></h5>');
};

const unclaimItem = (event) => {
  let data = $(event.target).parent().data("id");
  api.unclaimItem(data)
  .done(ui.unclaimItemSuccess)
  .fail(ui.failure);
  $(event.target).parent().parent().parent().hide();
};

const unpurchaseItem = (event) => {
  let data = $(event.target).data("id");
  api.unpurchaseItem(data)
  .done(ui.unpurchaseItemSuccess)
  .fail(ui.failure);
  $(event.target).closest('#purchased').html('<div class="checkbox" style="text-align:center; margin-left: 7px;"><td id="purchased"><label><input type="checkbox" id="purchase" data-id=' + data + '></label></td></div>');
};

const searchEventList = () => {
  let data = $('#search-field').val();
  api.showAllEvents(data)
  .done(ui.showAllEvents)
  .fail(ui.failure);
};

const searchUsers = () => {
  event.preventDefault();
  let data = $('#invite-email').val();
  api.showAllProfiles(data)
  .done(ui.showAllProfiles)
  .fail(ui.failure);
};

const uninvite = (event) => {
  event.preventDefault();
  let data = $(event.target).data("id");
  api.uninvite(data)
  .done(ui.uninviteSuccess)
  .fail(ui.failure);
  $(event.target).parent().hide();
};

const addHandlers = () => {
  $('#view-my-events').on('click', viewEvents);
  $('#create-event').on('click', clearForms);
  $('#create-event-form').on('submit', createEvent);
  $('#view-my-items').on('click', viewItems);
  $('#view-my-events').on('click', searchEvents);
  $('#add-item-form').on('submit', addItem);
  $('#search').on('click', searchEventList);
  $('#search-friend').on('click', searchUsers);
  $(document).on('click','#selectEvent', viewEvent);
  $(document).on('click','#deleteThis', deleteEvent);
  $(document).on('click','#addItem', setEventId);
  $(document).on('click','#deleteItem', deleteItem);
  $(document).on('click','#claim', claimItem);
  $(document).on('click','#purchase', purchaseItem);
  $(document).on('click','#unclaimItem', unclaimItem);
  $(document).on('click','#unpurchase', unpurchaseItem);
  $(document).on('click','#invite-button', setEventIdForSharing);
  $(document).on('click', '#invite-friend', inviteFriend);
  $(document).on('click','#uninvite', uninvite);
};

module.exports = {
  addHandlers,
};
