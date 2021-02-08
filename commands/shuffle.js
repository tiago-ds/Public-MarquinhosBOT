
const dj = require("./../utils/dj").dj;
module.exports = {
    name: "shuffle",
    description: "Eu embaralho as músicas que cês coloraram na fila",
    execute(message, args) {
        for (let i = dj.musicQueue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [dj.musicQueue[i], dj.musicQueue[j]] = [dj.musicQueue[j], dj.musicQueue[i]];
        }
        message.channel.send("Embaralhando as músicas");
    },
};