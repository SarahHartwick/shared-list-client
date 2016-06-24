'use strict';

const app = require('../app.js');

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

module.exports = {
  showEvents,
  createEvent,
  showItems,
};
