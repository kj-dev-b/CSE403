var bot = require('./slackbot.js');

// still need github params such as owner, repo, pr number, etc.
exports.handle = (command, message, payload) => {
    let result;
    if(command.startsWith("comment")) {
        if(!(command.includes("+") || command.includes("-"))) { //general comment
            result = bot.comment(command, message, payload);
        } else { //comment with line number
            let line = command.slice("comment".length + 1);
            result = bot.inlineComment(command, message, payload);
        }
    } else if (command == "request changes") {
        // call github module
        // wait for response
        //   if success -> "XXX requested a change to pull request XXX "
        //   if fail -> err message
        result = bot.requestChanges(command, message, payload);
    } else if (command == "approve") {
        result = bot.approve(command, message, payload);
    } else if (command == "help") {
        result = bot.help()
    } else { //unrecognized 
        result = bot.unrecognized()
    }
    return result;
}