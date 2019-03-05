// Handlers for events from github webhooks.

require('dotenv').config()
const WebhooksApi = require('@octokit/webhooks');
const webhooks = new WebhooksApi({
  secret: process.env.GITHUB_SECRET
});

webhooks.on('pull_request.opened', ({id, name, payload}) => {
  user = payload.pull_request.user.login;
  pull_request_number = payload.pull_request.number;
  diff_url = payload.pull_request.diff_url;
  title = payload.pull_request.title;
  body = payload.pull_request.body;
  repo = payload.repository.full_name;
  console.log('Pull request opened:')
  console.log({user, pull_request_number, diff_url, title, body, repo});
  // TODO actually do something
});

module.exports = webhooks.middleware