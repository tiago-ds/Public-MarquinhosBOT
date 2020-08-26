const player = require("./../utils/player");
module.exports = {
    name: "boombam",
    description: "Boombam pow",
    execute(message, args) {
        newUserChannel = message.member.voice.channel;
        player.execute(message, "./resource/sounds/boombam.mp3", newUserChannel);
    },
};
