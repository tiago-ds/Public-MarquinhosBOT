module.exports = {
    name: "inferno",
    description: "Carminha gritando inferno",
    execute(message, args) {
        newUserChannel = message.member.voiceChannel;
        playSong("./../resources/sounds/inferno.mp3", newUserChannel);
        message.delete();
    },
};
