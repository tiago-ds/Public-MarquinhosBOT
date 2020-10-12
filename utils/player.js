const { Message } = require("discord.js");
const { dj } = require("./dj");
module.exports = {
    execute(message, inputStream, channel) {
        if (!channel) {
            message.channel.send(
                "Canal de voz indisponível!"
            );
        } else {
            if(dj.audioQueue.length == 0){
                dj.audioQueue.push(inputStream);
                dj.playAudio(channel, false);
            }else{
                dj.audioQueue.push(inputStream);
            }
            
        }
    },
};
