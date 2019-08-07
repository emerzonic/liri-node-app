const fs = require("fs");

function logCommand({command, input = 'input not available'}) {
    if (command || input) {
        fs.appendFile('logs.txt', `command: ${command} input: ${input}\n`, function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
}

module.exports = {
    logCommand
};