const manage = require("./../utils/management").manage;
const searcher = require("./../utils/youtubeSearch");
const dj = require("./../utils/dj").dj;
const Discord = require("discord.js");
module.exports = {
    name: "play",
    description: "Executa uma música",
    async execute(message, args) {
        let newUserChannel = message.member.voice.channel;
        if (args.length == 0)
            return message.channel.send(
                "Você deve informar pelo menos um termo de busca!"
            );
        let searchTerm = args.join(" ");
        if (!newUserChannel) {
            message.channel.send(
                "Você deve estar em um canal de voz para usar esse comando!"
            );
        } else {
            let result = await searcher.search(true, searchTerm);
            if (
                dj.musicQueue.length == 0 &&
                !dj.playingMusic &&
                !dj.playingAudio
            ) {
                dj.musicQueue.push(result);
                dj.playMusic(newUserChannel, 0);
                manage.nowPlaying = criarEmbed("Tocando agora");
                manage.nowPlaying.addField(result.title, result.duration);
                manage.nowPlayingRef = await message.channel.send(
                    manage.nowPlaying
                );
            } else {
                dj.musicQueue.push(result);
                let newEmbed = criarEmbed("Adicionado a fila");
                newEmbed.addField(result.title, result.duration);
                message.channel.send(newEmbed);
            }
        }
    },
};

function criarEmbed(title) {
    let titulo = `${title}`;
    let embed = new Discord.MessageEmbed().setTitle(titulo).setColor("#0099ff");
    return embed;
}
