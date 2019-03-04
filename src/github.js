exports.message = (payload) => {
	return "Hello from GitHub!";
}

// From https://github.com/probot/probot/issues/780#issuecomment-446644194

const express = require('@runkit/runkit/express-endpoint/1.0.0')
const { createProbot } = require('probot') 

const probot = createProbot({
  id: process.env.APP_ID,
  port: process.env.PROBOT_PORT,
  secret: process.env.WEBHOOK_SECRET,
  cert: process.env.PRIVATE_KEY
})

const myProbotApp = app => {
  app.on('...')
}

probot.load(myProbotApp)

// Register the sub-app against Runkit's special Express app
const runkitApp = express(exports)
runkitApp.use(probot.server)