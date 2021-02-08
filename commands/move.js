const dj = require("./../utils/dj").dj;
module.exports = {
    name: "move",
    description: "Move a posição das músicas na fila",
    execute(message, args) {
        let origin = parseInt(args[0]);
        let destiny = parseInt(args[1]);
        if (isNaN(origin) || isNaN(destiny)) {
            message.channel.send("Você deve informar as duas posições!");
        } else if (
            origin - 1 < 0 ||
            origin - 1 > dj.musicQueue.length - 1 ||
            destiny - 1 < 0 ||
            destiny - 1 > dj.musicQueue.length - 1
        ) {
            message.channel.send(
                "Nullpointer aqui não!"
            );
        } else {
            message.channel.send(
                `${dj.musicQueue[origin - 1].title} movida para posição ${destiny}`
            );
            var element = dj.musicQueue[origin - 1];
            dj.musicQueue.splice(origin - 1, 1);
            dj.musicQueue.splice(destiny - 1, 0, element);
        }
    },
};
