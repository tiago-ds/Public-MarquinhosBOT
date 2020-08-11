module.exports = {
    name: "olavac",
    description: "!oirártnoC",
    execute(message, args) {
        message.channel.send({files: ["./resources/animations/olavac.gif"]});
    },
};
