const request = require('request');
// set up by "npm install superagent@3.5.2"
const superagent = require('superagent');

let data = {
	'channelId': '',
	'channelName': ''
}

// new pull request
// Argument
// - pName: project name
// - prNum: Pull request #
// - code: content of pull request
// - language: language of the code
// - commitNum: commit # of pull request
exports.newPR = (pName, prNum, emails, code, language, commitNum, res) => {
	// create a channel
	request.post('https://slack.com/api/groups.create', {
		json: {
		  token: 'xoxb-532206985459-547721571825-lLSuvbKRtcccboaILRjw2Gc1',
		  // name of channel = name of project - pull request #
		  name: `${pName} - ${prNum}`
		}
	  }, (error, res, body) => {
		if (error) {
		  console.error(error)
		  return;
		}
		console.log(`statusCode: ${res.statusCode}`);
		console.log(body.ok);
		if (body.ok === false) {
			// if create channel fails
			return;
		}
		// successful
		console.log(body.group.id);
		// save the channelId for later use
		data.channelId = body.group.id;
		// save channel name
		data.channelName = body.group.name;
	})

	// get each reviewer & contributor's userId from email and invite them
	var i;
	for (i = 0; i < emails.length; i++) {
		let userId = {'id': ''};

		// look up users id by email
		superagent.get('https://slack.com/api/users.lookupByEmail')
		.query({ token: 'xoxb-532206985459-547721571825-lLSuvbKRtcccboaILRjw2Gc1',
		email: emails[i] }).end((err, res) => {
			if (err) { return console.log(err); }
			console.log(res.body.ok);
			// if user not found
			if (res.body.ok === false) {
				// do something if user not found
				return;
			}
			// successful
			console.log(res.body.user.id);
			// save the userId
			userId.id = res.body.user.id;
		});

		// invite user by id
		request.post('https://slack.com/api/groups.invite', {
			json: {
				token: 'xoxb-532206985459-547721571825-lLSuvbKRtcccboaILRjw2Gc1',
				channel: data.channelId,
				user: userId.id
			}
		  }, (error, res, body) => {
			if (error) {
			  console.error(error)
			  return;
			}
			console.log(`statusCode: ${res.statusCode}`);
			console.log(body.ok);
			if (body.ok === false) {
				// failed to invite user
				return;
			}
			// success
		})

	}

	// send welcome message to channel
	request.post('https://slack.com/api/chat.postMessage', {
		json: {
			token: 'xoxb-532206985459-547721571825-lLSuvbKRtcccboaILRjw2Gc1',
			channel: data.channelId,
			text: `Welcome to ${data.channelName},`
		}
	}, (error, res, body) => {
		if (error) {
			console.error(error)
			return;
		}
		console.log(`statusCode: ${res.statusCode}`);
		
	})
	// send code snippet
	
};

// changes added to pull request
exports.changesAddedPR = (prNum, code, language, commitNum, res) => {
	// send message to channel
	// send code snippet
};

exports.respond = (payload, res) => {
	res.send("Hello, " + payload.user_name + "!");
}