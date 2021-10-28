const player = require("./../utils/player");
module.exports = {
    name: "rauauauda",
    description:
        "Nenhum cachorro foi machucado durante a execução desse comando",
    execute(message) {
        newUserChannel = message.member.voice.channel;
        player.execute(message, "./resources/sounds/rauauauda.mp3", newUserChannel);
        message.delete();
    },
};
