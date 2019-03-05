const axios = require('axios');

// new pull request
// Argument
// - pName: project name
// - prNum: Pull request #
// - email: contributor's email address
// - code: diff of the code
// - commitNum: commit # of pull request
exports.newPR = (pName, prNum, email, code, commitNum) => {
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
		
		// look up contributor's user info by email
		return axios.get('https://slack.com/api/users.lookupByEmail', {
			token: SLACK_TOKEN,
			email: email
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
		// save user info
		data.contributorId = res.body.user.id;
		data.channelName = res.body.user.name;
		// invite user
		return axios.post('https://slack.com/api/groups.invite', {
			token: SLACK_TOKEN,
			cannel: data.channelId,
			user: data.contributorId
		});
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
		// send welcome messages
		return axios.post('https://slack.com/api/chat.postMessage', {
			token: SLACK_TOKEN,
			channel: data.channelId,
			text: `Welcome to ${data.channelName}! You have a new pull request
			 	awaiting review from <@${data.contributorId}>. Here is the snippet:`
		});
	})
	.then ((res) => {
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
		// send code snippet
		return axios.post('https://slack.com/api/files.upload', {
			token: SLACK_TOKEN,
			channel: data.channelId,
			content: code,
			filetype: 'diff',
			title: commitNum
		});
	})
	.then ((res) => {
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
	})
	.catch((error) => {
  		console.error(error);
	})
}

/*
// channelId: the channel to invite users to
// emails: a list of emails of the reviewers
exports.inviteReviewers = (channelId, emails) => {
	return axios.get('https://slack.com/api/users.list', {
			params: {
			  token: SLACK_TOKEN,			  
			}
		});
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
}
*/

// changes added to pull request
// channelId: the channel to send message to
// code: diff of the code
// commitNum: commit # of the latest change
exports.changesAddedPR = (channelId, code, commitNum) => {
	// send message to channel
	axios.post('https://slack.com/api/chat.postMessage', {
			token: SLACK_TOKEN,
			channel: channelId,
			text: `Changes were made to this pull request by <@${data.contributorId}>`
	})
	.then ((res) => {
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
		// send new code snippet
		return axios.post('https://slack.com/api/files.upload', {
			token: SLACK_TOKEN,
			channel: channelId,
			content: code,
			filetype: 'diff',
			title: commitNum
		});
	})
	.then ((res) => {
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
	})
	.catch((error) => {
  		console.error(error);
	})
	
}

exports.respond = (payload, res) => {
	res.send("Hello, " + payload.user_name + "!");
}