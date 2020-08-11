const player = require("./../utils/player");
module.exports = {
    name: "rodaroda",
    description: "Ai Ai roda roda!",
    execute(message, args) {
        newUserChannel = message.member.voiceChannel;
        player.execute(message, "./resources/sounds/rodaroda.mp3", newUserChannel);
    },
};
