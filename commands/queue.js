const fileEdit = require("./../utils/fileEdit");
const dj = require("./../utils/dj").dj;
module.exports = {
    name: "queue",
    description: "Mostra fila de músicas que vão ser tocadas",
    execute(message, args) {
        console.log(dj.musicQueue);
        if (dj.musicQueue.length == 0) {
            message.channel.send("A fila está vazia");
        } else {
            let text = "```";
            for (let index = 0; index < dj.musicQueue.length; index++) {
                const element = dj.musicQueue[index];
                if (element) {
                    text +=
                        (index + 1) +
                        " - " +
                        element.title +
                        " - " +
                        element.duration +
                        "\n";
                }
            }
            text += "```";
            message.channel.send(text);
        }
    },
};
