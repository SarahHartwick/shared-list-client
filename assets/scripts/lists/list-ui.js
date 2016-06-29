'use strict';
const api = require('./list-api');
const app = require('../app.js');
const singleEventListing = require('../templates/singleEvent.handlebars');
const myEventsListing = require('../templates/myEvents.handlebars');
const itemListing = require('../templates/newItem.handlebars');
const myItemsListing = require('../templates/myItems.handlebars');
const singleItem = require('../templates/singleItem.handlebars');
const searchEvents = require('../templates/searchEvents.handlebars');
const userListing = require('../templates/userListing.handlebars');
const friendsListing = require('../templates/friendsListing.handlebars');
const searchEventsListing = require('../templates/searchEventsListing.handlebars');
const yourEventsListing = require('../templates/yourEvents.handlebars');

const showEvents = (data) => {
  $('.content').append(myEventsListing(data));
};

const showMyEvents = (data) => {
  $('.content').append(yourEventsListing(data));
};

const showItems = (data) => {
  $('.content').append(myItemsListing(data));
};

const eventCreated = (data) => {
  $("#create-event-modal").modal('hide');
  $('#event-name').val('');
  $('#event-location').val('');
  $('#event-date').val('');
  $('.content').append(singleEventListing(data));
};

// const addUser = (event) => {
//   return $.ajax({
//     url: app.host + '/sharings/',
//     method: 'POST',
//     headers: {
//       Authorization: 'Token token=' + app.user.token,
//     },
//     data: {
//       "sharing": {
//         "profile_id": app.user.profile.id,
//         "event_id": event.id
//       }
//     },
//   });
// };

const eventFailure = (data) => {
  $('#event-notes').append('<span style="color:red">Do not leave any fields blank. Please check that you have entered a valid date.</span>');
};

const deleteEventSuccess = (data) => {
};

const eventSelected = (data) => {
  function isProfileId(p) {
    if (p.id === app.profile) {
      return true;
    };
};
  let arr = data.event.profiles.filter(isProfileId);
  if ((data.event.user_id === app.user.id) || arr.length > 0) {
  $('.content').empty();
  $('.jumbotron').hide();
  $('.content').append(singleEventListing(data)); }
  else {
  $('#' + data.event.id).append('<h3 style="color:red">You have not been invited to this Event.</h3>');
  };
};

const itemAdded = (item) => {
  $('#add-item-modal').modal('hide');
  $('#item-table').append(itemListing(item));

};

const claimItemSuccess = (data) => {

};

const purchaseItemSuccess = (data) => {

};

const failure = (data) => {
};

const unpurchaseItemSuccess = (data) => {
};

const itemFailure = (data) => {
  $('#item-notes').append('<span style="color:red">Do not leave any fields blank.</span>');
};

const showAllEvents = (data) => {
  $('#search-field').val('');
  $('.content').empty();
  $('.content').append(searchEventsListing(data));
};

const showAllProfiles = (data) => {
  $('#invite-email').val('');
  $('#add-friends').html(userListing(data));
};

const listInvites = (id) => {
  return $.ajax({
    url: app.host + '/sharings/find/' +  id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const friendInvited = (data) => {
  let id = data.sharing.event_id;
  $('#add-friends').empty();
  $('#add-friends').html('<center><h3 style="color:#000">People Invited:</h3>');
  listInvites(id)
  .done(allFriendsInvited)
  .fail(failure);
};


const allFriendsInvited = (data) => {
  $('#add-friends').append(friendsListing(data));
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
  showAllProfiles,
  friendInvited,
  allFriendsInvited,
  listInvites,
  showMyEvents,
};
