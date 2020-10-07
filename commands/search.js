const searcher = require("./../utils/youtubeSearch");
const Discord = require("discord.js");
module.exports = {
    name: "pesquisa",
    description: "Pesquisa por um termo no youtube",
    async execute(message, args) {
        searchTerm = args.join(" ");
        let answer = await searcher.search(false, searchTerm);
        let searchEmbed = await criarEmbed();
        let text = "```";
        let videoCount = 0;
        for (let index = 0; index < answer.length; index++) {
            const element = answer[index];
            if (element) {
                searchEmbed.addField(element.title, element.duration, false);
                text +=
                    index +
                    1 +
                    " - " +
                    element.title +
                    " - " +
                    element.duration +
                    "\n";
                videoCount++;
            }
            if (videoCount == 10) break;
        }
        text += "```";
        message.channel.send(text);
    },
};

function criarEmbed() {
    return new Promise((resolve, reject) => {
        let titulo = `Resultado da pesquisa`;
        let embed = new Discord.MessageEmbed()
            .setTitle(titulo)
            .setColor("#0099ff");
        resolve(embed);
    });
}
