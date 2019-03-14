require('dotenv').config();
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var github = require('./src/github');
var bot = require('./src/slackbot');
var path = require('path');
var githubHandler = require('./handlers/github')
var db = require('./src/db');
var handler = require('./src/handler');
var textProcessor = require('./src/text-processor');
var port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/githubWebhook', githubHandler);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/test', function(req, res) {
    const raw = req.body.text;
    const command = textProcessor.extractCommand(raw);
    const message = textProcessor.extractMessage(raw);
    const response = (handler.handle(command, message));
    res.send(response);
})

app.post('/qreview', async function(req, res) {
    const raw = req.body.text;
    // pass the request data
    // raw only
    // or add only
    // add comment of what the request look like
    githubUser = await db.getGitHubNameByUid(req.body.user_id);
    if(textProcessor.extractCommand(raw)==="configure") {
        const newGithubUser = textProcessor.extractMessage(raw);
        console.log("new-user", newGithubUser);
        console.log(req.body.user_id);
        db.insertNewUser(req.body.user_id, newGithubUser)
        .then(result=>{
            console.log(result);
            res.send(`github user ${newGithubUser} added to your account! :clap:`);
        })
        .catch(err=>{
            console.log(err);
            res.send("something went wrong!");
        });
        // await db.insertNewUser(req.body.user_id, newGithubUser);
        // res.send(`github user ${newGithubUser} added to your account! :clap:`);
    } else if (githubUser) {
        const command = textProcessor.extractCommand(raw);
        const message = textProcessor.extractMessage(raw);
        console.log('processing command: ' + command);
        const response = (handler.handle(command, message, req.body));
        res.send(response);
    } else {
        res.send(bot.newUser(req.body));
    }
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