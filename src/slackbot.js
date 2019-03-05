const axios = require('axios');

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
			filetype: language,
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

// changes added to pull request
exports.changesAddedPR = (channelId, code, language, commitNum) => {
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
			filetype: language,
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