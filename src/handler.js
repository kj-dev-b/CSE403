const help = `
Inline Comment: /qreview comment line+ “...” /qreview comment line- “...” \n
General Comment: /qreview comment "..."\n
Request Changes: /qreview request changes “...”\n
Approve: /qreview approve "..."\n
`;

// still need github params such as owner, repo, pr number, etc.
exports.handle = (command, message, payload) => {
    let user = "keegan";
    let result;
    if(command.startsWith("comment")) {
        if(!(command.includes("+") || command.includes("-"))) { //general comment
            result = `${user} made a comment: "${message}"`;
        } else { //comment with line number
            let line = command.slice("comment".length + 1);
            result = `${user} made a comment on ${line}: "${message}"`
        }
    } else if (command == "requestChanges") {
        // call github module
        // wait for response
        //   if success -> "XXX requested a change to pull request XXX "
        //   if fail -> err message
        result = `${user} requested changes on pull request: "${message}"`;
    } else if (command == "approve") {
        result = `pull request approved by ${user}`;
    } else if (command == "help") {
        result = help
    } else { //unrecognized 
        result = "command not recognized, here are accepted commands for Qreview: \n" + help;
    }
    return result;
}