const dj = require("./../utils/dj").dj;
const fileEdit = require("./../utils/fileEdit");
const ytdl = require("ytdl-core");
module.exports = {
    name: "skip",
    description: "Passo pra próxima música",
    execute(message, args) {
        if (dj.musicQueue.length == 0) return;
        let newUserChannel = message.member.voice.channel;
        dj.playMusic(newUserChannel, 0);
    },
};
