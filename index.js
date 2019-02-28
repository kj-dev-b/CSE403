require('dotenv').config();
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var github = require('./src/github');
var bot = require('./src/slackbot');
var path = require('path');
var port = process.env.PORT || 5000;

const handler = require('./src/handler');
const textProcessor = require('./src/textProcessor');

const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/test', function(req, res) {
    var payload = req.body;
    res.send(bot.respond(payload));
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