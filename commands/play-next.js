const manage = require("./../utils/management").manage;
const dj = require("../utils/dj").dj;
const searcher = require("./../utils/youtubeSearch");
const Discord = require("discord.js");
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
                console.log("Tocando agora");
                dj.musicQueue.push(result);
                dj.playMusic(newUserChannel, 0);
                manage.nowPlaying = criarEmbed("Tocando agora");
                manage.nowPlaying.addField(result.title, result.duration);
                manage.nowPlayingRef = await message.channel.send(
                    manage.nowPlaying
                );
            } else {
                dj.musicQueue.unshift(result);
                let newEmbed = criarEmbed("Adicionado ao topo da fila");
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