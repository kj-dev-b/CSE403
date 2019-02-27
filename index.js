require('dotenv').config();
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const github = require('./src/github');
const bot = require('./src/slackbot');
const port = process.env.PORT || 3000;

const handler = require('./src/handler');
const textProcessor = require('./src/textProcessor');

const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
  github.message(res);
});

app.post('/test', function(req, res) {
    var payload = req.body;
    bot.respond(payload, res);
})

app.post('/qreview', function(req, res) {
    const raw = req.body.text;
    // pass the request data
    // raw only
    // or add only
    // add comment of what the request look like
    const command = textProcessor.extractCommand(raw);
    const message = textProcessor.extractMessage(raw);
    const response = (handler.handle(command, message));
    res.send(response);
});


app.get('/oauth', function(req, res) {
    if (!req.query.code) {
        res.status(500);
        res.send({"Error": "No OAuth Code"});
        console.log("No OAuth code");
    } else {
        request({
            url: 'https://slack.com/api/oauth.access',
            qs: {code: req.query.code, client_id: process.env.CLIENT_ID, client_secret: process.env.CLIENT_SECRET},
            method: 'GET',
        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                res.json(body);
            }
        })
    }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});