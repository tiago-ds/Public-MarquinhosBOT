module.exports = {
    name: "disconnect",
    description: "Eu, o grande little marcos, me desconecto do canal de voz",
    execute(message, args) {
        if (message.guild.voiceConnection) {
            message.guild.voiceConnection.disconnect();
        } else {
            message.channel.send("Eu não estou em um canal de voz :/");
        }
    },
};
