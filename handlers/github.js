var bot = require('../src/slackbot.js');
var db = require('../src/db.js');
// Handlers for events from github webhooks.

require('dotenv').config();
const axios = require('axios');
const WebhooksApi = require('@octokit/webhooks');
const webhooks = new WebhooksApi({
  secret: process.env.GITHUB_SECRET
});
const Octokit = require('@octokit/rest');
const octokit = new Octokit();

webhooks.on('pull_request.opened', async ({id, name, payload}) => {
  repo = payload.repository.full_name;
  pull_request_number = payload.pull_request.number;
  pull_request_link = payload.pull_request.html_url

  username = payload.pull_request.user.login; 

  diff_url = payload.pull_request.diff_url;
  diff_promise = axios.get(diff_url).then((response) => response.data);

  commits_url = payload.pull_request.commits_url;
  latest_commit_promise = axios.get(commits_url).then((response) => response.data[0].sha);
  
  var uid = await db.getUidByGitHubName(username);
  var diff = await diff_promise;

  bot.newPR('test', 'ill-quit', uid.uid, diff, pull_request_number)
});

module.exports = webhooks.middleware