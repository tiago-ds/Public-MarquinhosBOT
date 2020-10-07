const dj = require('./../utils/dj').dj;
module.exports = {
    name: "pause",
    description: "Pauso a música",
    execute(message, args) {
        dj.musicDispatcher.pause();
        console.log(dj.titlePlaying);
        console.log(dj.musicDispatcher.player.dispatcher._pausedTime);
        message.channel.send("Pausando música");
    },
};
