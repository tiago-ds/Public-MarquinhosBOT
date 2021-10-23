const Discord = require("discord.js");
const dj = require("./../utils/dj").dj;
module.exports = {
    name: "queue",
    description: "Mostra fila de músicas que vão ser tocadas",
    execute(message, args) {
        let embed = new Discord.MessageEmbed().setTitle("Fila").setColor("#0099ff");
        if(dj.playingMusic){
            embed.setDescription(`Tocando agora: ${dj.music.title}`);
        }
        if (dj.musicQueue.length == 0) {
            embed.setTitle("Fila vazia");
            message.channel.send(embed);
        } else {
            let text = "```";
            for (let index = 0; index < dj.musicQueue.length; index++) {
                const element = dj.musicQueue[index];
                if (element) {
                    embed.addField(`${index + 1} - ${element.title}`, element.duration)
                }
            }
            text += "```";
            message.channel.send(embed);
        }
    },
};
