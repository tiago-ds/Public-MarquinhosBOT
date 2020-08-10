const Discord = require("discord.js");
const player = require("./../utils/player");
module.exports = async (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel;
    //console.log(newUserChannel);
    let oldUserChannel = oldMember.voiceChannel;
    today = new Date();
    idPreso = fileEdit.read("idPreso");
    isReady = fileEdit.read("isReady");
    // Every time that someone enters a voice channel, we check if that person its arrested.
    if (idPreso.length > 0) {
        // It's inside a try/catch so if the person disconnect, marquinhos don't break
        try {
            // We check if the person that joined the voice channel it's arrested AND if the arrested person
            // didn't just joined the arrested channel (it prevents that the person from being moved infinitely)
            // to the arrested channel.
            if (
                idPreso.includes(newMember.id) &&
                !newUserChannel.bot &&
                newUserChannel.id != "597641313180975174"
            ) {
                console.log("Passou aqui");
                newMember.setVoiceChannel("597641313180975174");
                newMember.send("Você está preso! :(");
            }
        } catch (error) {
            console.log("erro");
        }
    }
    // User Joins a voice channel and wasn't already in one
    if (
        oldUserChannel === undefined &&
        newUserChannel !== undefined &&
        newMember.id != "bot"
    ) {
        if (isReady) {
            hoje = 4;
            switch (hoje) {
                case 4:
                    randint = Math.floor(Math.random() * 2);
                    let filepath;
                    if (randint === 1) filepath = "./quintafeiradaledale.mp3";
                    else filepath = "./resources/sounds/sextaanao.mp3";
                    player.execute("", filepath, newUserChannel);
                    break;
                case 5:
                    filepath = "./sextafeirasim.mp3";
                    player.execute("", filepath, newUserChannel);
                    break;
            }
        }
    }
};
