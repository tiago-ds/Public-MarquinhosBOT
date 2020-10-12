const Discord = require("discord.js");
const dj = require("./../utils/dj").dj;
module.exports = {
    name: "clear-queue",
    description: "Limpa fila de músicas que vão ser tocadas",
    execute(message, args) {
        dj.musicQueue = [];
        let embed = new Discord.MessageEmbed().setTitle("Fila esvaziada").setColor("#0099ff");
        if(dj.playingMusic){
            embed.setDescription(`Tocando agora: ${dj.music.title}`);
        }
        message.channel.send(embed);
    },
};