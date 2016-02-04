# doorman
Twilio integration for answering buzzer systems.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## What does it do?

Buzzer systems only dial a single number, and this sucks when you have roommates.

This project allows you to set up an phone tree to direct the buzzer to a specific person the visitor selects. It also allows you to specify secret codes for automatic entry.

## Twilio

You need an active Twilio account and phone number to use this module.

Simply deploy the application, then specify the application's `/answer` url as the `Voice Request URL` with `HTTP POST` in the configuration for your Twilio number.

If your domain is https://example.com, specify https://example.com/answer

## Configuration Examples

Allow three people (Jeff, Sally, Jim) to be selectively paged from the buzzer:

```
DOORMAN_USERS=Jeff@345-678-9012,Sally@123-456-7890,Jim@987-654-3210
```

Allow someone to enter `1234#` or `1867#` to enter after dialing the buzzer:

```
DOORMAN_SECRETS=1234,1867
```

Have the buzzer fall back to a specific user's number:

```
DOORMAN_DEFAULT=Jeff@345-678-9012
```

Your buzzer uses 0 to accept someone instead of 9:

```
DOORMAN_ACCEPT_DIGIT=0
```
