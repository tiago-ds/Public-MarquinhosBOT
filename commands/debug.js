const manage = require("./../utils/management").manage;

module.exports = {
    name: "debug",
    description: "Incorporo o Rammus",
    execute(message) {
        message.channel.send("Ok?");
    },
};
