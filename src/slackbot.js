//const request = require('request');
const axios = require('axios');
// set up by "npm install superagent@3.5.2"
const superagent = require('superagent');

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
	var data = {
		channelId: '',
		channelName: '',
		contributorId: '',
		contributorName: ''
	};

	// create channel
	axios.post('https://slack.com/api/groups.create', {
		token: SLACK_TOKEN,
		// name of channel = name of project - pull request #
		name: `${pName} - ${prNum}`
	})
	.then((res) => {
  		console.log(`statusCode: ${res.statusCode}`);
		// log result
		console.log(res.body.ok);
		// request failed
		if (res.body.ok === false) {
			// log error
			console.log(res.body.error);
			return;
		}
		// success
		// save channel info
		data.channelId = res.body.group.id;
		data.channelName = res.body.group.name;
		
		// get users list 
		return axios.get('https://slack.com/api/users.list', {
			params: {
			  token: SLACK_TOKEN,			  
			}
		});
	})
	.then((res) => {
		// log result
		console.log(res.body.ok);
		// request failed
		if (res.body.ok === false) {
			// log error
			console.log(res.body.error);
			return;
		}
		// success
		// loop the users list to find users with the given emails
		var ids = [];
		for (var i = 0; i < res.body.members.length; ++i) {
			// find reviewers, push ids to list
			for (var j = 0; j < rEmails.length; ++j) {
				if (res.body.members[i].profile.email === rEmails[j]) {
					ids.push(res.body.members[i].id);
				}
			}
			// find contributor, push id to list, save their id/name
			if (res.body.members[i].profile.email === cEmail) {
				ids.push(res.body.members[i].id);
				data.contributorId = res.body.members[i].id;
				data.contributorName = res.body.members[i].name;
			}
		}
		// invite involved users
		return axios.post('https://slack.com/api/groups.invite', {
			token: SLACK_TOKEN,
			cannel: data.channelId,
			users: ids
		});
	})
	.then((res) => {
		// log result
		console.log(res.body.ok);
		// request failed
		if (res.body.ok === false) {
			// log error
			console.log(res.body.error);
			return;
		}
		// success
		// send welcome messages
		return axios.post('https://slack.com/api/chat.postMessage', {
			token: SLACK_TOKEN,
			channel: data.channelId,
			text: `Welcome to ${data.channelName}! You have a new pull request
			 	awaiting review from <@${data.contributorId}>. Here is the snippet:`
		});
	})
	.then ((res) => {
		// log result
		console.log(res.body.ok);
		// request failed
		if (res.body.ok === false) {
			// log error
			console.log(res.body.error);
			return;
		}
		// success
		// send code snippet
		return axios.post('https://slack.com/api/files.upload', {
			token: SLACK_TOKEN,
			channel: data.channelId,
			content: code,
			filetype: language,
			title: commitNum
		});
	})
	.then ((res) => {
		// log result
		console.log(res.body.ok);
		// request failed
		if (res.body.ok === false) {
			// log error
			console.log(res.body.error);
			return;
		}
		// success
	})
	.catch((error) => {
  		console.error(error);
	})
}
	/*
	var ret = {
		json: {}
	};
	callback = (body) => {ret.json = JSON.parse(body)};

	// create a channel
	var createChannelObj = {
		json: {
			token: SLACK_TOKEN,
		  // name of channel = name of project - pull request #
			name: `${pName} - ${prNum}`
		}
	};
	sendPostReq('https://slack.com/api/groups.create', createChannelObj.json, callback);
	
	// save channel info
	data.channelId = ret.json.id;
	data.channelName = res.json.name;

	// get contributor's info from email and invite
	var lookupByEmailObj = {
		json : {
			token: SLACK_TOKEN,
			// email address
			name: cEmail
		}
	};
	sendGetQeq('https://slack.com/api/users.lookupByEmail', lookupByEmailObj.json, callback);

	// save contributor info
	data.contributorId = ret.json.user.id;
	data.contributorName = ret.json.user.name;

	// invite contributor
	var inviteContributorObj = {
		token: SLACK_TOKEN,
		channel: data.channelId,
		user: data.contributorId
	};
	sendPostReq('https://slack.com/api/groups.invite', inviteContributorObj.json);

	// get each reviewer's info from email and invite them
	var i;
	for (i = 0; i < rEmails.length; ++i) {

		// look up reviewer's info by email
		var lookupReviewersByEmailObj = {
			json : {
				token: SLACK_TOKEN,
				// email address
				name: rEmails[i]
			}
		};
		sendGetQeq('https://slack.com/api/users.lookupByEmail', lookupReviewersByEmailObj.json, callback);

		// invite user by id
		var inviteReviewerObj = {
			token: SLACK_TOKEN,
			channel: data.channelId,
			user: ret.json.user.id
		};
		sendPostReq('https://slack.com/api/groups.invite', inviteReviewerObj.json);
	}

	// send welcome message to channel
	var sendMessageObj = {
		json : {
			token: SLACK_TOKEN,
			channel: data.channelId,
			text: `Welcome to ${data.channelName}! You have a new pull request
			 	awaiting review from <@${data.contributorId}>. Here is the snippet:`
		}
	};
	sendPostReq('https://slack.com/api/chat.postMessage', sendMessageObj.json);
	
	// send code snippet
	var sendCodeObj = {
		json: {
			token: SLACK_TOKEN,
			channel: data.channelId,
			content: code,
			filetype: language,
			title: commitNum
		}
	};
	sendPostReq('https://slack.com/api/files.upload', sendCodeObj.json);*/
/*
// helper function
// send HTTP GET request
function sendGetQeq(url, param) {
	superagent.get(url)
		.query(param).end((err, res) => {
			if (err) { return console.log(err); }
			// log result
			console.log(res.body.ok);
			// request failed
			if (res.body.ok === false) {
				// log error
				console.log(res.body.error);
				return;
			}
			// success 
			callback(res.body)
		});
}; 

// helper function
// send HTTP POST request
function sendPostReq(url, obj) {
	request.post(url, obj, (error, res, body) => {
		if (error) {
			console.error(error)
			return;
		}
		console.log(`statusCode: ${res.statusCode}`);
		// log result
		console.log(body.ok);
		// request failed
		if (body.ok === false) {
			// log error
			console.log(body.error);
			return;
		}
		// success
		callback(body);
	});
};
*/

// changes added to pull request
exports.changesAddedPR = (prNum, code, language, commitNum) => {
	// send message to channel
	// send code snippet
	return;
};

exports.respond = (payload, res) => {
	res.send("Hello, " + payload.user_name + "!");
}