const player = require("../utils/player");
module.exports = {
    name: "parecido",
    description: "Eu queria explicar pra vocês, que não foi isso...",
    execute(message) {
        newUserChannel = message.member.voice.channel;
        player.execute(message, "./resources/sounds/podeterparecido.mp3", newUserChannel);
    },
};
