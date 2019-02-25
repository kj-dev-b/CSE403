# Q Review

## End User Manual
1. Go to slack.com/apps and search for QReview (TODO, please use instructions for running locally below for now)
2. Install QReview to your workplace
3. QReview creates a new channel when a new pull request is made on GitHub. Use the following commands to interact with QReview:
	* `Inline comment`
	/qreview comment line+ “...”
	/qreview comment line- “...”
	* `General comment`
	/qreview comment "..."
	* `Request changes`
	/qreview request changes “...”
	* `Approve`
	/qreview approve "..."
	* `Learn more`
	/qreview help


### Demo
![1](https://github.com/KeegJordan/CSE403/blob/master/reports/week5/PullRequestCreate.jpg?raw=true)
When a new pull request is made on Github, Q Review fetches the basic information of it, such as the code and requested reviewers. From here, our bot creates a new channel (in this demo called “pull-request-1293”), adds the contributor and requested reviewers to the channel, and sends a snippet of the code to the chat. In this demo, Annabelle and Ethan are the reviewers and Keegan is the contributor.


![2](https://github.com/KeegJordan/CSE403/blob/master/reports/week5/2.png?raw=true)
Ethan says /qreview request changes “please remove the debug code in our production build”, QReview requests changes to the pull request on GitHub and inform the user whether the action has succeeded.  


![3](https://github.com/KeegJordan/CSE403/blob/master/reports/week5/3edited.jpg?raw=true)
When changes are made to the pull request, the bot sends the updated code snippet to the chat. Annabelle says /qreview comment 178+ “Is this line also for debugging?”, QReview adds this comment to line 178+ of the pull request code on GitHub. Then Keegan says /qreview comment 178+ “It was initially…”, QReview adds another comment to line 178+ of the code on GitHub and informs the users.


![4](https://github.com/KeegJordan/CSE403/blob/master/reports/week5/4.png?raw=true)
After that Annabelle tells QReview to request changes again and QReview requests changes for the commit on GitHub.


![5](https://github.com/KeegJordan/CSE403/blob/master/reports/week5/5edited.jpg?raw=true)
When they finally reach an agreement on the code, Annabelle calls the bot to approve the changes by saying /qreview approve “Good Job!...”. QReview then informs the user that the pull request has been approved. 




## Developer Manual

When a review is created in GitHub, users are able to interact with it in Slack.

### Setup

##### Create a Slack app

1. Create an app at api.slack.com/apps
2. Navigate to the OAuth & Permissions page and add the following scopes:
    * `users:read`
    * `chat:write:bot`
3. Click on "Install App to Workspace"
3. Navigate to the Slash Commands page and add a command (e.g., `/qreview`). Put anything for the request URL and short description for now.

##### Run locally
1. Get the code
    * Clone this repo and run `npm install` Information page) (install npm first if you havn't, available at here:          	  https://www.npmjs.com/get-npm)
1. If you're running the app locally:
		1. You must have ngrok installed in order to run the app locally: ([install ngrok](https://ngrok.com/download))
    1. Start the dev environment by running `npm run dev`

##### Enable Q Review
1. Go back to the app settings and click on Q Review.
2. Navigate to the Slash Commands page and set the Request URL to your ngrok URL (printed by `npm run dev`) + /test
    * For example, `https://ade1f065.ngrok.io/test`
3. You should now be able to try out the command in Slack.
