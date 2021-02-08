const dj = require("./../utils/dj").dj;
const ytdl = require("ytdl-core");
module.exports = {
    name: "skip",
    description: "Passo pra próxima música",
    execute(message, args) {
        let newUserChannel = message.member.voice.channel;
        if (dj.musicQueue.length == 0 && dj.playingMusic){
            dj.musicDispatcher.destroy();
            dj.playingMusic = false;
            newUserChannel.leave();
            message.channel.send("```Fila vazia, saindo do canal```")
        }else if(dj.musicQueue.length == 0 && !dj.playingMusic){
            message.channel.send("```Não possui mídia sendo executada```")
        }else{
            dj.playMusic(newUserChannel, 0);
        }
    },
};