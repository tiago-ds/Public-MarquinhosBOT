const fileEdit = require("./../utils/fileEdit");
const dj = require("./../utils/dj").dj;
module.exports = {
    name: "clear-queue",
    description: "Limpa fila de músicas que vão ser tocadas",
    execute(message, args) {
        dj.musicQueue = [];
        message.channel.send("Limpando a fila");
    },
};