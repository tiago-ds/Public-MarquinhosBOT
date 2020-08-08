module.exports = {
    name: "rodaroda",
    description: "Ai Ai roda roda!",
    execute(message, args) {
        newUserChannel = message.member.voiceChannel;
        playSong("./../resources/sounds/rodaroda.mp3", newUserChannel);
    },
};
