const searcher = require("./../utils/youtubeSearch");
const manage = require("./../utils/management").manage;
const dj = require("./../utils/dj").dj;
const Discord = require("discord.js");
module.exports = {
    name: "search",
    description: "Pesquisa por um termo no youtube",
    async execute(message, args) {
        if (args.length == 0) return message.channel.send("Digite um termo de busca");
        searchTerm = args.join(" ");
        let answer = await searcher.search(false, searchTerm);
        if (!answer) return message.channel.send("Erro na busca, favor tentar novamente");
        let showedList = [];
        let text = "```"
        let len = 10;
        if (answer.length < 10) len = answer.length;
        for (let index = 0; index < len; index++) {
            const element = answer[index];
            showedList[index] = element;
            if (element) {
                text += `${index + 1} - ${element.title} - ${element.duration}\n`
            }
        }
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        collector.on('collect', async message => {
            let choice = parseInt(message.content);
            console.log(choice);
            if(isNaN(choice) || (choice < 1 || choice > 10)) return message.channel.send("Opção inválida!");
            let newUserChannel = message.member.voice.channel;
            let choosed = showedList[choice-1];
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
                    dj.musicQueue.push(choosed);
                    dj.playMusic(newUserChannel, 0);
                    manage.nowPlaying = criarEmbed("Tocando agora");
                    manage.nowPlaying.addField(choosed.title, choosed.duration);
                    manage.nowPlayingRef = await message.channel.send(manage.nowPlaying);
                    collector.stop();
                } else {
                    dj.musicQueue.push(choosed);
                    let newEmbed = criarEmbed("Adicionado a fila");
                    newEmbed.addField(choosed.title, choosed.duration);
                    message.channel.send(newEmbed);
                    collector.stop();
                }
            }
        });
        text += "```"
        message.channel.send(text);
    },
};

function criarEmbed(title) {
    let titulo = `${title}`;
    let embed = new Discord.MessageEmbed().setTitle(titulo).setColor("#0099ff");
    return embed;
}