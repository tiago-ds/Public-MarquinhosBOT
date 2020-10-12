const logging = require("./../utils/debugger");
const manage = require("./../utils/management").manage
module.exports = {
    name: "debug",
    description: "Incorporo o Rammus",
    execute(message, args) {
        message.channel.send("Ok?");
    },
};
