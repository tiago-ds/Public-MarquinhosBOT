const player = require("./../utils/player");
module.exports = {
    name: "miau",
    description: "Coitado do ovo",
    execute(message) {
        newUserChannel = message.member.voice.channel;
        player.execute(message, "./resources/sounds/miau.mp3", newUserChannel);
    },
};
