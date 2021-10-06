const player = require("../utils/player");
module.exports = {
    name: "festinha",
    description: "Hoje vai ter festinha aqui no meu barraco? D E S C U B R A",
    execute(message, args) {
        newUserChannel = message.member.voice.channel;
        player.execute(message, "./resources/sounds/festinha.mp3", newUserChannel);
        message.channel.send({files: ["./resources/animations/yoshi.gif"]});
    },
};
