# doorman
Twilio integration for answering buzzer systems.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Twilio

You need an active Twilio account and phone number to use this module.

Simply deploy the application, then specify the application's `/answer` url as the `Voice Request URL` with `HTTP POST` in the configuration for your Twilio number.

If your domain is https://example.com, specify https://example.com/answer
