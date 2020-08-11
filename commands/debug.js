const logging = require("./utils/debugger");
module.exports = {
    name: "debug",
    description: "Incorporo o Rammus",
    execute(message, args) {
        message.channel.send("Ok?");
    },
};
