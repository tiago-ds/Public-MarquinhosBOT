module.exports = {
    name: "miau",
    description: "Coitado do ovo",
    execute(message, args) {
        newUserChannel = message.member.voiceChannel;
        playSong("./miau.mp3", newUserChannel);
    },
};
