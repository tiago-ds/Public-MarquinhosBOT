const fileEdit = require("./fileEdit.js");
const winston = require("./logger");
module.exports = {
    debug(message) {
        debugMode = fileEdit.read("debug");
        if (debugMode) {
            console.log(message);
        } else {
            winston.info(message);
        }
    },
};
