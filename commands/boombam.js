const player = require("./../utils/player");
module.exports = {
    name: "boombam",
    description: "Boombam pow",
    execute(message, args) {
        newUserChannel = message.member.voiceChannel;
        player.execute(message, "./resource/sounds/boombam.mp3", newUserChannel);
    },
};
