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
    responseObject = links;
    // In case its a bot's message
    if(message.author.bot) return;
    //In case the message was sent in the wrong channel
    channelId = message.channel.id;
    //console.log(message.author.id);
    if(channelId != 680967084879904778 && channelId != 680976473926270991 && message.content.charAt(0).match('[-;]')){
        message.author.send('Este não é o canal apropriado para comandos de bots.');
        message.delete();
    }
    //responder fernando
    if(message.author.id == /*id de fernando*/ 260634178784067585){
        message.reply('Tu é um vacilão de último nível.');
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
                message.channel.send('W.I.P.');
                args.shift();
                console.log(args);
                //fim do case 'play'
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
