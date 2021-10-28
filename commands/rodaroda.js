const player = require("./../utils/player");
module.exports = {
    name: "rodaroda",
    description: "Ai Ai roda roda!",
    execute(message) {
        newUserChannel = message.member.voice.channel;
        player.execute(message, "./resources/sounds/rodaroda.mp3", newUserChannel);
    },
};
