'use strict';

var express = require('express');
var router = express.Router();

var answer = require('./controllers/answer');
var dial = require('./controllers/dial');

router.post('/answer', xml, answer.call);
router.post('/dial', xml, dial.user);

function xml(req, res, next) {
  res.header('content-type', 'text/xml');
  next();
}

module.exports = router;
