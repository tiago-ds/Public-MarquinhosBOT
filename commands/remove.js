const dj = require("./../utils/dj").dj;
module.exports = {
    name: "remove",
    description: "Move a posição das músicas na fila",
    execute(message, args) {
        let position = parseInt(args[0]);
        if (isNaN(position) || position - 1 < 0 || position - 1 > dj.musicQueue.length - 1) {
            message.channel.send("Você deve informar uma posição válida!");
        } else {
            message.channel.send(
                `${dj.musicQueue[position - 1].title} removida`
            );
            dj.musicQueue.splice(position - 1, 1);
        }
    },
};