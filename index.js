const Discord = require("discord.js");
const client = new Discord.Client();
var isReady = true;

const config = require('./config.json');
const links = require('./links.json');
const ytdl = require('ytdl-core');


client.login(config.token);

client.on('ready', () =>{
    console.log("logged");
    client.user.setActivity('pedra na casa de Manu');
});

client.on('warn', console.error);

client.on('disconnect', () => console.log('Just disconnected!'));

client.on('message', async message =>{
    // In case its a bot's message
    if(message.author.bot) return;
    // In case the message was sent in the wrong channel
    channel = message.channel;
    if(channel.id != 680967084879904778 && channel.id != 680976473926270991 && message.content.charAt(0).match('[-;]')){
        message.author.send('Este não é o canal apropriado para comandos de bots.');
        message.delete();
    }
    // In case its not a prefix starting message
    if(message.content.indexOf(config.prefix) !== 0) return;
    // Splits the message content in a array
    const args = message.content.toLowerCase().split(' ');
    //console.log(args);
    if(message.content.startsWith(config.prefix)){
        const m = args[0].replace(config.prefix, '');
        switch(m){
            case('debug'):
                message.channel.send('Ok.');
                break;
            case('disconnect'):
                disconnect(message);
                break;
            case('dm'):
                dm(message);
                break;
            case('cavalo'):
                cavalo(message);
                break;
            case('chaos'):
                chaos(message);
                break;
            default:
                message.channel.send('Favor digitar um comando válido.');
        }
    }
});

client.on('guildMemberAdd', member => {
    member.guild.channels.get('680975188581416998').send(member.user.username + ' agora faz parte do motel!');
});

client.on('guildMemberRemove', member => {
    member.guild.channels.get('680975188581416998').send(member.user.username + ' fechou sua diária!');
    member.send('Bem vindo ao devaneios! :)');
});

async function cavalo(message){
    console.log('cavalo!')
    message.channel.send({files: ['attachments/cavalo.gif']});
    channel = message.channel;
    //setTimeout(() => { channel.lastMessage.delete(); }, 1000);
}

async function dm(message){
    console.log('Sending dm to ' + message.author.username);
    message.author.send('Dale menó');
}

async function disconnect(message){
    if(message.guild.voiceConnection){
        message.guild.voiceConnection.disconnect();
    }else{
        message.channel.send('Eu não estou em um canal de voz :/');
    }
}
//Chaos part 1. Here I just play the noisy song and call chaos part 2
async function chaos(message){
    if(isReady){
        //That exists so someone can't call the bot inside the voice channel if he is in one already.
        isReady = false;

        var voiceChannel = message.member.voiceChannel;
        voiceChannel.join().then(connection =>
            {
                const dispatcher = connection.playFile('./caos.mp3');
                dispatcher.on('end', end => {
                    //console.log('finished caos song');
                    chaos2(message);
                    voiceChannel.leave();
                });
            }).catch(err => console.log(err));
            isReady = true;
    }
}

async function chaos2(message){
    //Why do i have to do a try/catch just to delete a message? Dunno >:
    try {
        await message.delete();   
    } catch (error) {
        console.log(error)
    }
    //Gets the voice channel that will (primaly) suffer the chaos
    voiceChannel = message.member.voiceChannel;
    //Gets the list of all voice channels in the guild
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    //Gets the list of all users in the voiceChannel
    activeUsers = voiceChannel.members.filter(user => !user.bot);
    //Gets the channel that the CHAOS started
    msgChannel = message.channel;
    //Finally, calls the function chaos3, that will move people around and create REAL chaos
    chaos3(0, voiceChannel, voiceChannels, activeUsers, msgChannel);
}

//that's not working :<
/* function chaos3(voiceChannel, voiceChannels, activeUsers){
        for(x = 0; x < 5; x++){
            randomKey = activeUsers.randomKey();
            usuario = activeUsers.get(randomKey);
            usuario.setVoiceChannel(voiceChannels.randomKey());
            sleep(1000);
        }
} */

function chaos3(counter, voiceChannel, voiceChannels, activeUsers, msgChannel){
    // That's how I made it work. Recursively calling the function chaos with a counter that goes from 1 to 10.
    if(counter < 2){
        setTimeout(function() {
            // First, incremente the counter to the next call
            counter++;
            // Here, goes the code to randomly switch channels
            randomKey = activeUsers.randomKey();
            usuario = activeUsers.get(randomKey);
            usuario.setVoiceChannel(voiceChannels.randomKey());
            // There's the recursivity
            chaos3(counter, voiceChannel, voiceChannels, activeUsers, msgChannel);
        }, 1500);
    }else{
        // For sure I can improve that.
        usersArray = activeUsers.firstKey(activeUsers.array().length);
        // The last iteration that runs ALL the active userss array, sending them to the original channel.
        for(x = 0; x < usersArray.length; x++){
            usuario = activeUsers.get(usersArray[x]);
            // Console.log('Deslocando ' + usuario.username + ' para o canal ' + voiceChannel.name + '.');
            usuario.setVoiceChannel(voiceChannel.id.toString());
        }
    }
}

//that shit do not work
/* function sleep(milliseconds){
    return new Promise((resolve) => {setTimeout(resolve, milliseconds)});
} */
