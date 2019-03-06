const axios = require('axios');

async function createChannel(pName, prNum) {
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
		console.log(res.body);
		let result = {
			channelID: res.body.group.id,
			channelName: res.body.group.name
		}
		return result;
	})
	.catch((error) => {
		console.error(error);
  	})
}

async function inviteUser(channelId, userId) {
	axios.post('https://slack.com/api/groups.invite', {
			token: SLACK_TOKEN,
			cannel: channelId,
			user: userId
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
		console.log(res.body);
	})
	.catch((error) => {
		console.error(error);
  	})
}

async function sendMessage(channelId, channelName, contributorId) {
	axios.post('https://slack.com/api/chat.postMessage', {
			token: SLACK_TOKEN,
			channel: channelId,
			text: `Welcome to ${channelName}! You have a new pull request
			 	awaiting review from <@${contributorId}>. Here is the snippet:`
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
		console.log(res.body);
	})
	.catch((error) => {
		console.error(error);
  	})
}

async function sendSnippet(channelId, code, commitNum) {
	axios.post('https://slack.com/api/files.upload', {
			token: SLACK_TOKEN,
			channel: channelId,
			content: code,
			filetype: 'diff',
			title: commitNum
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
		console.log(res.body);
	})
	.catch((error) => {
  		console.error(error);
	})
}

exports.createChannel = createChannel;
exports.inviteUser = inviteUser;
exports.sendMessage = sendMessage;
exports.sendSnippet = sendSnippet;

// new pull request
// Argument
// - pName: project name
// - prNum: Pull request #
// - contributor: contributor Slack user obj
// - code: diff of the code
// - commitNum: commit # of pull request
exports.newPR = async (pName, prNum, contributor, code, commitNum) => {
	let channelInfo = await createChannel(pName, prNum);
	await inviteUser(channelInfo.channelId, contributor.id);
	await sendMessage(channelInfo.channelId, channelInfo.channelName, contributor.id);
	await sendSnippet(channelInfo.channelId, code, commitNum);		
}


// channelId: the channel to invite users to
// emails: a list of emails of the reviewers
exports.inviteReviewers = (channelId, emails) => {
	return;
}

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

exports.comment = (command, message, payload) => {
	return {
		"response_type": "in_channel",
		"text": `<@${payload.user_name}> made a comment: "${message}"`
	}	
}

exports.inlineComment = (command, message, payload) => {
	let line = command.slice("comment".length + 1);
	return {
		"response_type": "in_channel",
		"text": `<@${payload.user_name}> made a comment on ${line}: "${message}"`
	}
}

exports.requestChanges = (command, message, payload) => {
	return {
		"response_type": "in_channel",
		"text": `request changes on pull request :exploding_head:`,
		"attachments": [{
			"text": `${message}, by <@${payload.user_name}>`
		}]
	}
}

exports.approve = (command, message, payload) => {
	return {
		"response_type": "in_channel",
		"text": `pull request approved :rocket:`,
		"attachments": [{
			"text":`${message}, by <@${payload.user_name}>`
		}]
	};
}

exports.help = (command, message, payload) => {
	return {
		"text": `Here's some commands to get you started:`,
		"attachments": [{
			"text": help
		}]
	}
}

exports.unrecognized = (command, message, payload) => {
	return "Command not recognized, try saying `help`!";
}