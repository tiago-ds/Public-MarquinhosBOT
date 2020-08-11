const player = require("./../utils/player");
module.exports = {
    name: "cabra",
    description: "Bééééééé",
    execute(message, args) {
        newUserChannel = message.member.voiceChannel;
        player.execute(message, "./resources/sounds/cabra.mp3", newUserChannel);
    },
};
