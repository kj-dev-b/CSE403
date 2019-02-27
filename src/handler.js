// still need github params such as owner, repo, pr number, etc.
exports.handle = (command, message) => {
    let result;
    if(command.startrsWith("comment")) {
        if(!(command.includes("+") || command.includes("-"))) { //general comment

        } else { //comment with line number

        }
    } else if (command == "requestChanges") {
        // call github module
        // wait for response
        //   if success -> "XXX requested a change to pull request XXX "
        //   if fail -> err message
        result = "person requested changes on commit 103";
    } else if (command == "approve") {

    } else if (command == "help") {
        result = "help menu"
    } else { //unrecognized 
        result = "command not recognized, here are accepted commands for Qreview: "
    }
    return result;
}