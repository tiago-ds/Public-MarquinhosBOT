const dj = require("../utils/dj").dj;
module.exports = {
    name: "play-next",
    description: "Adiciona uma música ao topo da fila",
    async execute(message, args) {
        let newUserChannel = message.member.voice.channel;
        let searchTerm = args.join(" ");
        let result = await searcher.search(true, searchTerm);
        if (!newUserChannel) {
            message.channel.send(
                "Você deve estar em um canal de voz para usar esse comando!"
            );
        } else {
            if (
                dj.musicQueue.length == 0 &&
                !dj.playingMusic &&
                !dj.playingAudio
            ) {
                dj.musicQueue.push(result);
                dj.playMusic(newUserChannel, 0);
                manage.nowPlaying = criarEmbed("Tocando agora");
                manage.nowPlaying.addField(result.title, result.duration);
                manage.nowPlayingRef = await message.channel.send(manage.nowPlaying);
            } else {
                dj.musicQueue.unshift(result);
                let newEmbed = criarEmbed("Adicionado ao topo da fila");
                newEmbed.addField(result.title, result.duration);
                message.channel.send(newEmbed);
            }
        }
    },
};