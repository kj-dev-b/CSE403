require('dotenv').config();
const express = require('express');
const request = require('request');
const apiRouter = require('./routes/APIRouter');

const app = express();

app.get('/', (req, res) => {
  res.send('Success! Q Review is active.');
});

app.use('/api', apiRouter);

app.post('/test', function(req, res) {
	res.send('Success! Q Review is in Slack!');
})

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

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});