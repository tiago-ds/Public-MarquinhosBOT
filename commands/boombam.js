module.exports = {
    name: "boombam",
    description: "Boombam pow",
    execute(message, args) {
        newUserChannel = message.member.voiceChannel;
        playSong("./boombam.mp3", newUserChannel);
    },
};
