'use strict';

const app = require('../app.js');
const ui = require('./list-ui.js');

const showEvents = () => {
  return $.ajax({
    url: app.host + '/users/' + app.user.id + '/events',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const createEvent = (data) => {
  return $.ajax({
    url: app.host + '/events/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: {
      "event": {
        "name": data.name,
        "location": data.location,
        "date": data.date,
        "user_id": app.user.id
      }
    }
  });
};

const showItems = () => {
  return $.ajax({
    url: app.host + '/users/' + app.user.id + '/items',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const deleteEvent = function(data){
  return $.ajax({
    url: app.host + "/events/" + data,
    method: 'DELETE',
    dataType: 'json',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const addItem = (data) => {
  return $.ajax({
    url: app.host + '/items/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: {
      "item": {
        "event_id": data.eventId,
        "name": data.name,
        "unit": data.unit,
        "purchased": false,
        "claimed": false,
      }
    }
  });
};

const showEvent = function(data){
  return $.ajax({
    url: app.host + "/events/" + data,
    method: 'GET',
    dataType: 'json',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const deleteItem = function(data){
  return $.ajax({
    url: app.host + "/items/" + data,
    method: 'DELETE',
    dataType: 'json',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const claimItem = (data) => {
  return $.ajax({
    url: app.host + '/items/' + data,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: {
      "item": {
        "user_id": app.user.id,
        "claimed": "true"
      }
    }
  });
};

const purchaseItem = (data) => {
  return $.ajax({
    url: app.host + '/items/' + data,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: {
      "item": {
        "purchased": "true"
      }
    }
  });
};

const unclaimItem = (data) => {
  return $.ajax({
    url: app.host + '/items/' + data,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: {
      "item": {
        "user_id": null,
        "claimed": "false"
      }
    }
  });
};

const unpurchaseItem = (data) => {
  return $.ajax({
    url: app.host + '/items/' + data,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: {
      "item": {
        "purchased": "false"
      }
    }
  });
};

const showAllEvents = (data) => {
  return $.ajax({
    url: app.host + '/events/search/' +  data,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

module.exports = {
  showEvents,
  createEvent,
  showItems,
  deleteEvent,
  addItem,
  showEvent,
  deleteItem,
  claimItem,
  purchaseItem,
  unclaimItem,
  unpurchaseItem,
  showAllEvents,
};
