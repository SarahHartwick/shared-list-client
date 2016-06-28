'use strict';

const app = require('../app.js');
const api = require('./api.js');

const failure = (error) => {
  console.error(error);
};

const signInFailure = () => {
  $('#sign-in-notes').empty();
  $('#sign-in-notes').append('Incorrect Username or Password. Try Again.');
};

const signUpFailure = () => {
  $('#sign-up-notes').empty();
  $('#sign-up-notes').append("Passwords don't match or this username already exists. Try Again.");
};

const signUpSuccess = function(data){
  $('#signin-email').val($('#signup-email').val());
  $('#signin-password').val($('#signup-password').val());
  $('#sign-in').submit();
  app.user = data.user;
  let id = app.user.id;
  api.createProfile(id)
  .done(profilecreated)
  .fail(failure);
  $('#signin-modal').modal('hide');
  $('#signup-modal').modal('hide');
  $('#signed-out').hide();
  $('#signed-in').show();
};

const profileCreated = (data) => {
  app.profile = data.profiles[0].id;
  console.log(app.profile);
};

const profilecreated = (data) => {
  app.profile = data.profile.id;
  console.log(app.profile);
};

const getProfile = (data) => {
  return $.ajax({
    url: app.host + '/profiles/find/' + data.user.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const signInSuccess = (data) => {
  app.user = data.user;
  $('#signin-modal').modal('hide');
  $('#signup-modal').modal('hide');
  $('#signed-out').hide();
  $('#signed-in').show();
  $('.jumbotron').show();
  $('#welcome').html('<h1>Hello, ' + app.user.name +'</h1>');
  getProfile(data)
    .done(profileCreated)
    .fail(failure);
};

const signOutSuccess = (data) => {
  app.user = null;
  $('#signout-modal').modal('hide');
  $('#password-modal').modal('hide');
  $('#signed-in').hide();
  $('#signed-out').show();
  $('.content').empty();
  $('#signup-email').val('');
  $('#signup-password').val('');
  $('#signup-password-confirmation').val('');
  $('#signin-email').val('');
  $('#signin-password').val('');
};

const changePasswordSuccess = (data) => {
  console.log('User #' + app.user.id + ' has successfully changed password.');
  $('#password-modal').modal('hide');
};

const changePasswordFailure = () => {
  $('#change-password').append('Password is incorrect. Try Again.');
};


module.exports = {
  failure,
  signInSuccess,
  signUpSuccess,
  signOutSuccess,
  signInFailure,
  signUpFailure,
  changePasswordSuccess,
  changePasswordFailure
};
