const fs = require("fs");

function readFile(callback) {
    fs.readFile("random.txt", "utf8", (error, data) => {
        if (error) {
            return console.log(error);
        }
       
        const [command, input] = data.split(",");
        return callback({
            command,
            input
        })
    });
}

module.exports = {
    readFile
}