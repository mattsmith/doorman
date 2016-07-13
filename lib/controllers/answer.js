'use strict';

var answer = exports;

var _ = require('lodash');
var twilio = require('twilio');
var Slack = require('slack-node');

answer.call = function(req, res, next) {
  var domain = process.env.DOORMAN_DOMAIN;
  var greeting = process.env.DOORMAN_GREETING;
  var defaultUser = process.env.DOORMAN_DEFAULT;
  var people = process.env.DOORMAN_USERS.split(',');
  var partyMode = process.env.DOORMAN_PARTYMODE;

  var opts = {
    method: 'post',
    action: `${domain}/dial`
  };

  var resp = new twilio.TwimlResponse();

  if (partyMode == 'true') {
    var acceptDigit = process.env.DOORMAN_ACCEPT_DIGIT || 9;

    resp.say("Welcome to the Party! Head to the left and up to the 5th floor.");
    resp.pause(1).play({digits: acceptDigit});
    return res.send(resp.toString());

  } else {
    resp.gather(opts, function() {
      var self = this;

      self.say(greeting);

      var names = _.map(people, person => person.split('@')[0]);
      var index = 1;
      names.forEach(name => {
        self.say(`for ${name}, press, ${index}, `);
        index++;
      });

      if (defaultUser) {
        self.say('If you do not have an extension, press 0');
      }
    });
  }

  res.send(resp.toString());
};
