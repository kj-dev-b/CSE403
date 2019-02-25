const request = require('request');
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

exports.respond = (payload, res) => {
	res.send("Hello, " + payload.user_name + "!");
}