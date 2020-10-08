const dj = require('./../utils/dj').dj;
module.exports = {
    name: "resume",
    description: "Retomo a música",
    execute(message, args) {
        dj.musicDispatcher.resume();
        console.log(dj.titlePlaying);
        console.log(dj.musicDispatcher.StreamDispatcher);
        message.channel.send("Retomando música");
    },
};
