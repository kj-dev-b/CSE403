const request = require('request');
// set up by "npm install superagent@3.5.2"
const superagent = require('superagent');

let data = {
	'channelId': '',
	'channelName': '',
	'contributor': {
		'id': '',
		'name': ''
	}
}

// new pull request
// Argument
// - pName: project name
// - prNum: Pull request #
// - cEmail: contributor's email address
// - rEmails: a list of reviewers' email address
// - code: content of pull request
// - language: language of the code
// - commitNum: commit # of pull request
exports.newPR = (pName, prNum, cEmail, rEmails, code, language, commitNum) => {
	// create a channel
	request.post('https://slack.com/api/groups.create', {
		json: {
		  token: SLACK_TOKEN,
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
			console.log(body.error);
			return;
		}
		// successful
		console.log(body.group.id);
		// save the channelId for later use
		data.channelId = body.group.id;
		// save channel name
		data.channelName = body.group.name;
	})

	// get contributor's info from email and invite
	let contributor = {'id': '', 'name':''};
	getUserInfo(contributor, cEmail);
	// save contributor to data
	data.contributor = contributor;
	inviteUser(contributor);

	// get each reviewer's info from email and invite them
	var i;
	for (i = 0; i < rEmails.length; i++) {
		let reviewer = {'id': '', 'name': ''};

		// look up reviewer's info by email
		getUserInfo(reviewer, rEmail[i]);

		// invite user by id
		inviteUser(reviewer);
	}

	// send welcome message to channel
	request.post('https://slack.com/api/chat.postMessage', {
		json: {
			token: SLACK_TOKEN,
			channel: data.channelId,
			text: `Welcome to ${data.channelName}! You have a new pull request
			 	awaiting review from @${data.contributor.name}. Here is the snippet:`
		}
	}, (error, res, body) => {
		if (error) {
			console.error(error)
			return;
		}
		console.log(`statusCode: ${res.statusCode}`);
		console.log(body.ok);
		if (body.ok === false) {
			// failed to post message
			console.log(body.error);
			return;
		}
		// successful
	})

	// send code snippet
	request.post('https://slack.com/api/files.upload', {
		json: {
			token: SLACK_TOKEN,
			channel: data.channelId,
			content: code,
			filetype: language,
			title: commitNum
		}
	}, (error, res, body) => {
		if (error) {
			console.error(error)
			return;
		}
		console.log(`statusCode: ${res.statusCode}`);
		console.log(body.ok);
		if (body.ok === false) {
			// failed upload file
			console.log(body.error);
			return;
		}
		// successful
	})
}

// helper function
// get user id and name by user's email
function getUserInfo(user, email) {
	superagent.get('https://slack.com/api/users.lookupByEmail')
		.query({ token: SLACK_TOKEN,
		email: email }).end((err, res) => {
			if (err) { return console.log(err); }
			console.log(res.body.ok);
			// if user not found
			if (res.body.ok === false) {
				// do something if user not found
				console.log(res.body.error);
				return;
			}
			// successful
			console.log(res.body.user.id);
			// save the userId
			user.id = res.body.user.id;
			// save user name
			user.name = res.body.user.name;
		});
}; 

// helper function
// invite user
function inviteUser(user) {
	request.post('https://slack.com/api/groups.invite', {
		json: {
			token: SLACK_TOKEN,
			channel: data.channelId,
			user: user.id
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
			console.log(body.error);
			return;
		}
		// success
	});
};

// changes added to pull request
exports.changesAddedPR = (prNum, code, language, commitNum) => {
	// send message to channel
	// send code snippet
	return;
};

exports.respond = (payload, res) => {
	res.send("Hello, " + payload.user_name + "!");
}