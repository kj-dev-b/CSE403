const bot = require('./slackbot');

// still need github params such as owner, repo, pr number, etc.
exports.handle = (command, message, payload) => {
    if(command.startsWith("comment")) {
        if(!(command.includes("+") || command.includes("-"))) { //general comment
            return bot.comment(command, message, payload);
        } else { //comment with line number
            return bot.inlineComment(command, message, payload);
        }
    } else if (command == "request changes") {
        // call github module
        // wait for response
        //   if success -> "XXX requested a change to pull request XXX "
        //   if fail -> err message
        return bot.requestChanges(command, message, payload);
    } else if (command == "approve") {
        return bot.approve(command, message, payload);
    } else if (command == "help") {
        return bot.help(command, message, payload);
    } else { //unrecognized 
        return bot.unrecognized();
    }
}