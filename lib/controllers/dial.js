'use strict';

var dial = exports;

var twilio = require('twilio');

dial.user = function(req, res, next) {
  var domain = process.env.DOORMAN_DOMAIN;
  var defaultUser = process.env.DOORMAN_DEFAULT;
  var secrets = process.env.DOORMAN_SECRETS;
  secrets = secrets? secrets.split(',') : [];

  var resp = new twilio.TwimlResponse();
  var digits = req.body.Digits;

  if (secrets && Array.isArray(secrets) && secrets.indexOf(digits) > -1) {
    var acceptDigit = process.env.DOORMAN_ACCEPT_DIGIT || 9;
    resp.pause(1).play({digits: acceptDigit});
    return res.end(resp.toString());
  }

  var people = process.env.DOORMAN_USERS.split(',');
  var person = people[digits - 1] && people[digits - 1].split('@');

  // Allows you to set a default person to contact
  var usingDefault = false;
  if (!person && defaultUser) {
    usingDefault = true;
    person = defaultUser.split('@');
  }

  // If nobody is found, apologize and hangup
  if (!person) {
    resp.say('We\'re sorry, we could not connect you. Please try again')
      .redirect(`${domain}/answer`);

    return res.end(resp.toString());
  }

  var name = person[0];
  var number = person[1];

  var named = usingDefault? '' : ` to ${name}`;
  var greeting = `Please wait while we connect you${named}`;
  var defaultMsg = 'Sorry we are currently unavailable';
  var unavail = usingDefault? `${name} is currently unavailable` : defaultMsg;

  resp.say(greeting)
    .dial(number)
    .say(unavail)
    .pause(2)
    .say('You will be redirect to the main menu.')
    .redirect(`${domain}/answer`);

  res.end(resp.toString());
};
