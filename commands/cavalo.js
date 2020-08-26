module.exports = {
    name: "cavalo",
    description: "CAVALO?",
    execute(message, args) {
        message.channel.send({ files: ["./resources/animations/cavalo.gif"] });
    },
};
