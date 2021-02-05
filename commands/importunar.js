const player = require("./../utils/player");
module.exports = {
    name: "importunar",
    description: "Eu vou lá atazanar a vida de quem tu quiser.",
    execute(message, args) {
        let filepath;
        randint = Math.floor(Math.random() * 3);
        pessoaImportunada = message.content.split(" ")[1];
        importunada = message.guild.members.cache
            .filter((user) => user.user.username === pessoaImportunada)
            .first();
        if (!importunada) {
            importunada = message.guild.members.cache
                .filter((user) => user.nickname === pessoaImportunada)
                .first();
        }
        switch (randint) {
            case 1:
                filepath = "./resources/sounds/miau.mp3";
                break;
            case 2:
                filepath = "./resources/sounds/cabra.mp3";
                break;
            case 3:
                filepath = "./resources/sounds/boombam.mp3";
                break;
        }
        try {
            player.execute(message, filepath, importunada.voice.channel);
        } catch (error) {
            if (!importunada.voice.channel) {
                console.log("Essa pessoa não está num canal de voz.");
            } else {
                console.log(error);
            }
        }
    },
};
