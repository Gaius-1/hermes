# Project Hermes

Welcome to **Project Hermes**: a pioneering SMS API inspired by the swiftness of the legendary messenger god Hermes! 🕊️✨ Experience seamless transmission without ads or fees. With cutting-edge technology, it's the future of messaging! 🚀📲 #ConnectWithHermes

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/ZXdkAT?referralCode=kFPWuy)

## Fork Notes

This is a fork of the original TextBelt project by Ian Webster. Changes made:

1. Added basic auth to the server.
2. Added support for environment variables for easier deployment.

You shouldn't need to change anything in the code to get it working. Just set the environment variables and run the server.

> **Note:** You will need an SMTP server to send text messages. This project uses an email-to-text gateway to send text messages. We suggest using [SMTP2GO](https://www.smtp2go.com/).

The required environment variables are:
- `SMTP_HOST` e.g., smtp.gmail.com
- `SMTP_PASSWORD` e.g., password123
- `SMTP_USERNAME` e.g., admin
- `SMTP_PORT` e.g., 587
- `BASIC_AUTH_USERNAME` e.g., admin
- `BASIC_AUTH_PASSWORD` e.g., password123
- `FROM_NAME` e.g., DidiJollof
- `FROM_EMAIL` e.g., example@example.com

## TextBelt Open Source

TextBelt Open Source is a REST API that sends outgoing SMS using a free mechanism, different from the more reliable paid version available at [TextBelt](https://textbelt.com). This project uses carrier-specific gateways to deliver your text messages for free and without ads. The service is fairly reliable when configured on a private server and has sent over 1 million texts.

### Send a Text

Send a text with a simple POST request:

```sh
$ curl -X POST http://my_hermes_server/text \
   -d number=5551234567 \
   -d "message=I sent this message for free with hermes"
```

`number` and `message` parameters are required.

If you are using the paid version at [TextBelt](https://textbelt.com), run the following:

```sh
$ curl -X POST https://textbelt.com/text \
   -d number=5551234567 \
   -d "message=I sent this message for free with Textbelt" \
   -d key=abcdef123456
```

### Success and Failure

Sample success:

```json
{"success": true}
```

Sample failure:

```json
{"success": false, "message": "Exceeded quota for this phone number."}
```

## Usage as a Module

You can use this repository to send text messages in your project. 

### Configuration

This project uses [`nodemailer`](https://www.npmjs.com/package/nodemailer) for sending emails. Set up `lib/config.js` with the following:

- **`transport`**: Should be a Nodemailer transport [documented here](https://nodemailer.com/plugins/create/#transports).
- **`mailOptions`**: Fields should include at least the `from` field, but you can include any of the fields [documented here](https://nodemailer.com/message/).

For example, to send a text using the default settings:

```js
var text = require('textbelt');

text.send('9491234567', 'A sample text message!', undefined, function(err) {
  if (err) {
    console.log(err);
  }
});
```

You can also supply a region (valid choices are `us`, `intl`, or `canada`):

```js
var text = require('textbelt');

// Canada
text.send('9491234567', 'A sample text message!', 'canada', function(err) {
  ...
});

// International
text.send('1119491234567', 'Bonjour!', 'intl', function(err) {
  ...
});
```

## Usage as a Standalone Server

Hermes can be run as a standalone server with: `node server/app.js`. Be sure to install dependencies first with `npm install` and ensure you've configured Nodemailer in `lib/config.js`. This project also relies on Redis. To install Redis locally, please see the [Redis documentation](http://redis.io/topics/quickstart). Before launching the app, ensure Redis is running on port 6379 with `redis-server`.

By default, the server listens on port 9090.

Don't forget to set `fromAddress` in `lib/config.js` to the email address you want to send from.

## Canadian and International Endpoints

The /text endpoint supports U.S. phone numbers (and parts of Canada).

For Canadian texts, curl `http://your-server.com/canada`.

For international texts, curl `http://your-server.com/intl`.

Canadian and international support may not be complete. Refer to the list of supported carriers.

## Notes and Limitations

* Some carriers are picky about which messages they deliver. A "success" response from Textbelt means that your message was given to the carrier.
* Some carriers may deliver text messages from "txt@textbelt.com", "foo@bar.com", or whatever you have configured as `fromAddress` in `lib/config.js`.
* Supported U.S. carriers: Alltel, Ameritech, AT&T Wireless, Boost, CellularOne, Cingular, Edge Wireless, Nex-Tech Wireless, Project Fi, Sprint PCS, Telus Mobility, T-Mobile, Metro PCS, Nextel, O2, Orange, Qwest, Rogers Wireless, Ting, US Cellular, Verizon, Virgin Mobile.
* Supported U.S. and Canadian carriers (/canada): 3 River Wireless, ACS Wireless, AT&T, Alltel, BPL Mobile, Bell Canada, Bell Mobility, Bell Mobility (Canada), Blue Sky Frog, Bluegrass Cellular, Boost Mobile, Carolina West Wireless, Cellular One, Cellular South, Centennial Wireless, CenturyTel, Cingular (Now AT&T), Clearnet, Comcast, Corr Wireless Communications, Dobson, Edge Wireless, Fido, Golden Telecom, Helio, Houston Cellular, Idea Cellular, Illinois Valley Cellular, Inland Cellular Telephone, MCI, MTS, Metro PCS, Metrocall, Metrocall 2-way, Microcell, Midwest Wireless, Mobilcomm, Nextel, OnlineBeep, PCS One, President's Choice, Public Service Cellular, Qwest, Republic Wireless, Rogers AT&T Wireless, Rogers Canada, Satellink, Solo Mobile, Southwestern Bell, Sprint, Sumcom, Surewest Communications, T-Mobile, Telus, Tracfone, Triton, US Cellular, US West, Unicel, Verizon, Virgin Mobile, Virgin Mobile Canada, West Central Wireless, Western Wireless.
* Supported international carriers (/intl): Chennai RPG Cellular, Chennai Skycell / Airtel, Comviq, DT T-Mobile, Delhi Aritel, Delhi Hutch, Dutchtone / Orange-NL, EMT, Escotel, German T-Mobile, Goa BPLMobil, Golden Telecom, Gujarat Celforce, JSM Tele-Page, Kerala Escotel, Kolkata Airtel, Kyivstar, LMT, Lauttamus Communication, Maharashtra BPL Mobile, Maharashtra Idea Cellular, Manitoba Telecom Systems, Meteor, MiWorld, Mobileone, Mobilfone, Mobility Bermuda, Mobistar Belgium, Mobitel Tanzania, Mobtel Srbija, Movistar, Mumbai BPL Mobile,

 Netcom, Ntelos, O2, O2 (M-mail), One Connect Austria, OnlineBeep, Optus Mobile, Orange, Orange Mumbai, Orange NL / Dutchtone, Oskar, P&T Luxembourg, Personal Communication, Pondicherry BPL Mobile, Primtel, SCS-900, SFR France, Safaricom, Satelindo GSM, Simple Freedom, Smart Telecom, Southern LINC, Sunrise Mobile, Surewest Communications, Swisscom, Telcel Mexico, T-Mobile Austria, T-Mobile Germany, T-Mobile UK, TIM, TSR Wireless, Tamil Nadu BPL Mobile, Tele2 Latvia, Telefonica Movistar, Telenor, Teletouch, Telia Denmark, UMC, Uraltel, Uttar Pradesh Escotel, Vessotel, Vodafone Italy, Vodafone Japan, Vodafone UK, Wyndtell.
