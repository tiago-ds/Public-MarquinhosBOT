module.exports = {
    name: "cabra",
    description: "Bééééééé",
    execute(message, args) {
        newUserChannel = message.member.voiceChannel;
        playSong("./../resources/sounds/cabra.mp3", newUserChannel);
    },
};
