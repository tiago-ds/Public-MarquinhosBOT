const fileEdit = require("./../utils/fileEdit");
const searcher = require("./../utils/youtubeSearch");
const dj = require("./../utils/dj").dj;
const ytdl = require("ytdl-core");
module.exports = {
    name: "play",
    description: "Executa uma música",
    async execute(message, args) {
        let newUserChannel = message.member.voice.channel;
        let searchTerm = args.join(" ");
        let result = await searcher.search(true, searchTerm);
        if (!newUserChannel) {
            message.channel.send(
                "Você deve estar em um canal de voz para usar esse comando!"
            );
        } else {
            if (dj.musicQueue.length == 0 && !dj.playingMusic && !dj.playingAudio) {
                dj.musicQueue.push(result);
                dj.playMusic(newUserChannel, 0);
            } else {
                dj.musicQueue.push(result);
                //message.channel.send("Já estou em um canal de voz");
            }
        }
    },
};

function criarEmbed() {
    return new Promise((resolve, reject) => {
        let titulo = `Tocando agora`;
        let embed = new Discord.MessageEmbed()
            .setTitle(titulo)
            .setColor("#0099ff");
        resolve(embed);
    });
}
