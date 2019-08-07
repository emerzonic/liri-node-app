const fs = require("fs");

function logCommand(input) {
    if (input) {
        fs.appendFile('logs.txt', `${input}\n`, function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
}

module.exports = {
    logCommand
};