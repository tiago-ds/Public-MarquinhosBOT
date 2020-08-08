module.exports = {
    name: "rauauauda",
    description:
        "Nenhum cachorro foi machucado durante a execução desse comando",
    execute(message, args) {
        newUserChannel = message.member.voiceChannel;
        playSong("./../resources/sounds/rauauauda.mp3", newUserChannel);
        message.delete();
    },
};
