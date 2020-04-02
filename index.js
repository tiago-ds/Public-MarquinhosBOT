const Discord = require("discord.js");
const client = new Discord.Client();

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
    // Music queue
    //const serverQueue = queue.get(message.guild.id);
    const queue = new Map();

    // In case its a bot's message
    if(message.author.bot) return;
    //In case the message was sent in the wrong channel
    channelId = message.channel.id;
    if(channelId != 680967084879904778 && channelId != 680976473926270991 && message.content.charAt(0).match('[-;]')){
        message.author.send('Este não é o canal apropriado para comandos de bots.');
        message.delete();
    }
    // In case its not a prefix starting message
    if(message.content.indexOf(config.prefix) !== 0) return;
    //divide a mensagem em um array considerando os espaços.
    const args = message.content.toLowerCase().split(' ');
    //console.log(args);
    if(message.content.startsWith(config.prefix)){
        const m = args[0].replace(config.prefix, '');
        //message.channel.send(args);
        switch(m){
            case('play'):
                execute(message, serverQueue);
                break;
            case('debug'):
                message.channel.send('Ok.');
                break;
            case('disconnect'):
                if(message.guild.voiceConnection){
                    message.guild.voiceConnection.disconnect();
                }else{
                    message.channel.send('Eu não estou em um canal de voz :/');
                }
                break;
            case('dm'):
                message.author.send('Dale menó');
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

async function execute(message, serverQueue){
    const arr = message.content.split(" ");
    const voiceChannel = message.member.voiceChannel;
    if(!voiceChannel){
        return message.channel.send("Você precisa estar conectado a um canal de voz!");
    }
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if(!permissions.has("CONNECT") || !permissions.has("SPEAK")){
        return message.channel.send("Painho não me deu permissão pra entrar nesse canal de voz :(");
    }
    const info = await ytdl.getInfo(args[1]);
    const song = {
        title: songInfo.title,
        url: songInfo.video_url,
    };
    if(!serverQueue){

    }else{
        serverQueue.push(song);
        console.log(serverQueue.songs);
        return message.channel.send(`${song.title} foi adicionada à fila!`);
    }

    const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true,
    };

    queue.set(message.guild.id, queueContruct);
    queueContruct.songs.push(song);

    try{
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;

        play(message.guild, queueContruct.songs[0]);
    } catch (err){
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
    }
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if(!song){
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Tocando agora ${song.title}`);

}