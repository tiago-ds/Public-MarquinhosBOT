const player = require("./../utils/player");
module.exports = {
    name: "inferno",
    description: "Carminha gritando inferno",
    execute(message, args) {
        newUserChannel = message.member.voiceChannel;
        player.execute(message, "./resources/sounds/inferno.mp3", newUserChannel);
        message.delete();
    },
};
