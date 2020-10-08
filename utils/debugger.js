
const winston = require("./logger");
module.exports = {
    debug(message) {
        debugMode = true;
        if (debugMode) {
            console.log(message);
        } else {
            winston.info(message);
        }
    },
};
