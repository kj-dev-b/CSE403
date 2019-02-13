# Q Review

When a review is created in GitHub, users are able to interact with it in Slack.

## Setup

#### Create a Slack app

1. Create an app at api.slack.com/apps
1. Navigate to the OAuth & Permissions page and add the following scopes:
    * `users:read`
    * `chat:write:bot`

#### Run locally
1. Get the code
    * Clone this repo and run `npm install`
1. Set the following environment variables to `.env`: (see .env-sample)
    * `SLACK_TOKEN`: Your app's `xoxp-` token (available on the Install App page)
    * `PORT`: The port that you want to run the web server on
    * `SLACK_WEBHOOK`: The webhook URL that you copied off the Incoming Webhook page
    * `SLACK_VERIFICATION_TOKEN`: Your app's Verification Token (available on the Basic Information page)
1. If you're running the app locally:
    1. Start the app (`npm start`)
    1. In another window, start ngrok on the same port as your webserver (`ngrok http $PORT`)

#### Enable Q Review
1. Go back to the app settings and click on Interactive Messages.
1. Set the Request URL to your ngrok URL + /test

#### Say Hello
1. Add Q Review to the channel you are working in
1. Type the command `/qreview`