const request = require('request');
const help = `
Inline Comment: /qreview comment line+ “...” /qreview comment line- “...”
General Comment: /qreview comment "..."
Request Changes: /qreview request changes “...”
Approve: /qreview approve "..."`;
let data = {
	'channelId': '',
}

// new pull request
exports.newPR = (pName, prNum, emails, code, language, commitNum, res) => {
    // create a channel
	// invite members
	// send message to channel
    // send code snippet
};

// changes added to pull request
exports.changesAddedPR = (prNum, code, language, commitNum, res) => {
	// send message to channel
	// send code snippet
};

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
			"text": `${message} by <@${payload.user_name}>`
		}]
	}
}

exports.approve = (command, message, payload) => {
	return {
		"response_type": "in_channel",
		"text": `pull request approved :rocket:`,
		"attachments": [{
			"text":`${message} by <@${payload.user_name}>`
		}]
	};
}

exports.help = (command, message, payload) => {
	return {
		"response_type": "in_channel",
		"text": `Here's some commands to get you started:`,
		"attachments": [{
			"text": help
		}]
	}
}

exports.unrecognized = (command, message, payload) => {
	return "Command not recognized, try saying `help`!";
}