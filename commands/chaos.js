const dj  = require("../utils/dj").dj;
const manage = require("./../utils/management").manage;
module.exports = {
    name: "chaos",
    description: "Instaura o CHAOS nos canais de voz",
    execute(message, args) {
        let num = parseInt(args[0]);
        if (isNaN(num) || num > 25) {
            num = 10;
        } else {
            num = args[0];
        }
        // This just gets the voice channel that the user called;
        var voiceChannel = message.member.voice.channel;
        if (voiceChannel) {
            dj.audioQueue.unshift('./resources/sounds/caos.mp3');
            dj.playingAudio = true;
            dj.playAudio(voiceChannel, true).then(() => {
                dj.audioDispatcher.on("finish", (end) => {
                    chaos2(message, num);
                });
            });
        } else {
            // If the person isn't inside a voice channel
            message.channel.send("Você não está num canal de voz!");
        }
    },
};

async function chaos2(message, num) {
    //Why do I have to do a try/catch just to delete a message? Dunno >:
    try {
        message.delete();
    } catch (error) {
        console.log(error);
    }
    //Gets the voice channel that will (primaly) suffer the chaos
    voiceChannel = message.member.voice.channel;
    //Gets the list of all voice channels in the guild
    const voiceChannels = message.guild.channels.cache.filter(
        (c) => c.type === "voice"
    );
    //Gets the list of all users in the voiceChannel
    activeUsers = voiceChannel.members.filter((user) => !user.user.bot);
    //Gets the channel that the CHAOS started
    // msgChannel = message.channel;
    //Finally, calls the function chaos3, that will move people around and create REAL chaos
    counter = 0;
    chaos3(counter, voiceChannel, voiceChannels, activeUsers, num);
}

async function chaos3(counter, voiceChannel, voiceChannels, activeUsers, num) {
    // That's how I made it work. Recursively calling the function chaos with a counter that goes from 1 to 10.
    if (counter < num) {
        await setTimeout(function () {
            // First, increment the counter to the next call
            counter++;
            // Here, goes the code to randomly switch channels
            randomKey = activeUsers.randomKey();
            usuario = activeUsers.get(randomKey);
            usuario.voice.setChannel(voiceChannels.randomKey());
            // Check if the user disconnected from a voice channel during the recursivity
            if (usuario.voice.channel) {
                console.log(`${usuario.voice.channel}`);
                // There's the recursivity
                try {
                    chaos3(
                        counter,
                        voiceChannel,
                        voiceChannels,
                        activeUsers,
                        num
                    );
                } catch (error) {
                    console.log("erro!");
                }
            }
        }, 1500);
    } else {
        // For sure I can improve that.
        usersArray = activeUsers.firstKey(activeUsers.array().length);
        // The last iteration that runs ALL the active users array, sending them to the original channel.
        for (x = 0; x < usersArray.length; x++) {
            usuario = activeUsers.get(usersArray[x]);
            // Console.log('Deslocando ' + usuario.username + ' para o canal ' + voiceChannel.name + '.');
            usuario.voice.setChannel(voiceChannel.id.toString());
        }
        if(dj.playingMusic){
            dj.playingAudio = false;
            dj.playMusic(voiceChannel, dj.seek);
        }else{
            dj.audioDispatcher.destroy();
            voiceChannel.leave();
        }
    }
}
