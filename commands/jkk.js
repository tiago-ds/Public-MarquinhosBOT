const player = require("./../utils/player");
module.exports = {
    name: "jkk",
    description: "sadaaaip ,semeeeeM",
    execute(message) {
        newUserChannel = message.member.voice.channel;
        player.execute(message, "./resources/sounds/jkk.mp3", newUserChannel);
    },
};
