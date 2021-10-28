module.exports = {
    name: "default",
    description: "Default fallback message",
    hide: true,
    execute(message) {
        message.channel.send("Favor digitar um comando válido.");
    },
};
