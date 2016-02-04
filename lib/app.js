'use strict';

var app = exports;

var express = require('express');
var bodyParser = require('body-parser');

class App {
  constructor() {
    this.app = null;
    this.port = process.env.PORT || 5000;
  }

  configure() {
    return new Promise((resolve, reject) => {
      this.app = express();
      this.app.disable('x-powered-by');
      this._middleware();
      this._router();
      resolve();
    });
  }

  listen() {
    return new Promise((resolve, reject) => {
      // Configure has not yet been called
      if (!this.app) {
        return reject(new Error('App not configured'));
      }

      resolve();
    }).then(() => {

      // Begin listening
      this.app.listen(this.port);
    });
  }

  _middleware() {
    this.app.use(bodyParser.json({ type: 'application/json' }));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.static('public'));
  }

  _router() {
    this.app.use('/', require('./router'));
  }
}

app.App = App;
