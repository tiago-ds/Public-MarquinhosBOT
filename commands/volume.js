const dj = require('./../utils/dj').dj;
module.exports = {
    name: "volume",
    description: "Meu volume, né..",
    execute(message, args) {
        let command = args[0];
        if(!command){
            message.channel.send(`Volume atual: ${Math.round(dj.volume*100)}%`);
        }else if(command == "up" && dj.volume < 2.0){
            dj.volume += 0.2;
            dj.musicDispatcher.setVolume(dj.volume);
            message.channel.send(`Volume aumentado para: ${Math.round(dj.volume*100)}%`);
        }else if(command == "down" && dj.volume > 0.2){
            dj.volume -= 0.2;
            dj.musicDispatcher.setVolume(dj.volume);
            message.channel.send(`Volume diminuido para: ${Math.round(dj.volume*100)}%`);
        }else{
            message.channel.send("Volume só vai pra cima ou pra baixo");
        }
    },
};