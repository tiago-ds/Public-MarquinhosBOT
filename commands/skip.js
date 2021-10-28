const dj = require("./../utils/dj").dj;

module.exports = {
    name: "skip",
    description: "Passo pra próxima música",
    execute(message) {
        let newUserChannel = message.member.voice.channel;
        if (dj.musicQueue.length == 0 && dj.playingMusic){
            dj.musicDispatcher.destroy();
            dj.playingMusic = false;
        }else if(dj.musicQueue.length == 0 && !dj.playingMusic){
            message.channel.send("```Não possui mídia sendo executada```")
        }else{
            dj.playMusic(newUserChannel, 0);
        }
    },
};