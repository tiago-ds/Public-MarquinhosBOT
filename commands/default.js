module.exports = {
    name: "deafult",
    description: "Default fallback message",
    execute(message, args) {
        message.channel.send("Favor digitar um comando válido.");
    },
};
