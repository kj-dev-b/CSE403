function extractCommand(rawInput) {
    const cleanInput = rawInput.trim().toLowerCase();
    if(cleanInput.startsWith("comment")) {
        if( ! (cleanInput.includes("+") || cleanInput.includes("_"))) {
            return "comment";
        } else {
            if(cleanInput.indexOf("+") > cleanInput.indexOf("-")) {
                return cleanInput.slice(0, cleanInput.indexOf("+")+1);
            } else {
                return cleanInput.slice(0, cleanInput.indexOf("-")+1);
            }
        }
    } else if(cleanInput.startsWith("request changes")) {
        return "request changes";
    } else if(cleanInput.startsWith("approve")) {
        return "approve";
    } else if(cleanInput.startsWith("help")) {
        return "help";
    } else {
        return "unrecognized"
    }
};

// if unrecgnized command, return empty string
function extractMessage(rawInput) {
    let cleanInput = rawInput.trim().toLowerCase();
    let command = cleanInput = extractCommand(rawInput);
    if(command == "unrecognized") {
        return "";
    } else {
        let rawMessage = cleanInput.slice(command.length);
        return trimQuotes(rawMessage);
    }

    function trimQuotes(rawMessage) {
        let result = rawMessage.trim();
        if ( 
            (result.startsWith(`\"`) && result.endsWith(`\"`))
            ||
            (result.startsWith(`\'`) && result.endsWith(`\'`))
            ) {
            return result.slice(1, result.length);
        } else {
            return result;
        }
    }
};

exports.extractCommand = extractCommand;
exports.extractMessage = extractMessage;