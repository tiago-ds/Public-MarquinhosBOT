const Discord = require("discord.js");
const manage = require("./../utils/management").manage;
const player = require("./../utils/player");
module.exports = async (client, oldState, newState) => {
    let newStateChannel = newState.channel;
    //console.log(newUserChannel);
    let oldStateChannel = oldState.channel;
    // Every time that someone enters a voice channel, we check if that person its arrested.
    if (manage.idPreso.length > 0) {
        // It's inside a try/catch so if the person disconnect, marquinhos don't break
        try {
            // We check if the person that joined the voice channel it's arrested AND if the arrested person
            // didn't just joined the arrested channel (it prevents that the person from being moved infinitely)
            // to the arrested channel.
            if (
                manage.idPreso.includes(newState.member.id) &&
                newState.channel &&
                newState.channel.id != newState.member.guild.afkChannelID
            ) {
                newState.member.voice.setChannel(
                    newState.member.guild.afkChannelID
                );
                newState.member.send("Você está preso! :(");
            }
        } catch (error) {
            console.log(error);
        }
    }
    // User Joins a voice channel and wasn't already in one
    if (
        oldState.channel === null &&
        newState.channel !== null &&
        !newState.member.bot &&
        !(newState.member.id == "598992394616307807")
    ) {
        let filepath;
        let hoje = new Date();
        let today = hoje.getDay();

        // Condition to switch to GMT -3
        if(hoje.getHours() >= 21)
            today -= 1;
        if(today < 0)
            today = 6;

        switch (today) {
            case 4:
                randint = Math.floor(Math.random() * 2);
                if (randint === 1)
                    filepath = "./resources/sounds/quintafeiradaledale.mp3";
                else 
                    filepath = "./resources/sounds/sextaanao.mp3";
                player.execute("", filepath, newStateChannel);
                break;
            case 5:
                filepath = "./resources/sounds/sextafeirasim.mp3";
                player.execute("", filepath, newStateChannel);
                break;
        }
    }
};
