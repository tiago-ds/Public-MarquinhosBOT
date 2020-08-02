const Discord = require("discord.js");
const client = new Discord.Client();
var isReady = true;
var idPreso = [];


const config = require('./config.json');
const links = require('./links.json');
const ytdl = require('ytdl-core');


client.login(config.token);

client.on('ready', () =>{
    console.log("logged");
    client.user.setActivity('bexiga na casa de Talita');
    //client.user.setAvatar('./attachments/marquinhoshead.jpg');
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
    if(channel.id == '709874875162034266' && (!message.content.startsWith('http'))){
        message.author.send('Esse canal é para enviar links! >:(');
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
            case('olavac'):
                olavac(message);
                break;
            case('chaos'):
                chaos(message);
                break;
            case('moeda'):
                moeda(message);
                break;
            case('horario'):
                horario(message);
                break;
            case('prender'):
                prender(message);
                break;
            case('desprender'):
                desprender(message);
                break;
            case('soltar'):
                desprender(message);
                break;
            case('help'):
                help(message);
                break;
            case('encarcerados'):
                encarcerados(message);
                break;
            case('miau'):
                miau(message);
                break;
            case('cabra'):
                cabra(message);
                break;
            case('boombam'):
                boombam(message);
                break;
            case('importunar'):
                importunar(message);
                break;
            default:
                message.channel.send('Favor digitar um comando válido.');
        }
    }
});

client.on('guildMemberAdd', member => {
    member.guild.channels.get('680975188581416998').send(member.user.username + ' agora faz parte do motel!');
    var role = member.guild.roles.find(role => role.name === "Outsiders");
    member.addRole(role);
    member.send('Olá! Você foi colocado num cargo onde não é possível entrar em canais de voz. Favor contate um '+
    '"Vice-Dono" ou o "Dono do Motel" e entre no canal de voz "Alone" para que seja atribuído um cargo e você possa ' +
    'usar o servidor normalmente! :D');
    tiago = message.guild.members.filter(user => user.id === '305838877866721280').first();
    tiago.send(`O usuário ${member.user.username} entrou no servidor e quer se registrar!`);
});

client.on('guildMemberRemove', member => {
    member.guild.channels.get('680975188581416998').send(member.user.username + ' fechou sua diária!');
    member.send('Bem vindo ao devaneios! :)');
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel
    //console.log(newUserChannel);
    let oldUserChannel = oldMember.voiceChannel
    today = new Date();

    // Every time that someone enters a voice channel, we check if that person its arrested.
    if(idPreso.length > 0){
        // It's inside a try/catch so if the person disconnect, marquinhos don't break
        try {
            // We check if the person that joined the voice channel it's arrested AND if the arrested person
            // didn't just joined the arrested channel (it prevents that the person from being moved infinitely)
            // to the arrested channel.
            if(idPreso.includes(newMember.id) && newUserChannel.id != '597641313180975174'){
                newMember.setVoiceChannel('597641313180975174');node .
                newMember.send('Você está preso! :(');
            }
        } catch (error) {
            console.log('erro');
        }
        
    }
     // User Joins a voice channel and wasn't already in one
    if(oldUserChannel === undefined && newUserChannel !== undefined) {
        if(isReady){
            switch(today.getDay()){
                case (4):
                    playQuinta(newUserChannel);
                    break;
                case (5):
                    playSexta(newUserChannel);
                    break;
            }
        }
    }
});

async function cavalo(message){
    //console.log('cavalo!')
    message.channel.send({files: ['attachments/cavalo.gif']});
    channel = message.channel;
    //setTimeout(() => { channel.lastMessage.delete(); }, 1000);
}

async function olavac(message){
    //console.log('cavalo!')
    message.channel.send({files: ['attachments/olavac.gif']});
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
     // This just gets the voice channel that the user called;
    var voiceChannel = message.member.voiceChannel;
    if(isReady && voiceChannel){
        //That exists so someone can't call the bot inside the voice channel if he is in one already.
        isReady = false;
        // Just the method to play the caos song
        // I don't use the playSong() here so the Chaos2 can be called when the song finish
        // Yeah I could pass a boolean saying if this was the chaos song, but I would need two more parameters.
        voiceChannel.join().then(connection => {
                const dispatcher = connection.playFile('./caos.mp3');
                dispatcher.on('end', end => {
                    voiceChannel.leave();
                    chaos2(message);      
                });
            }).catch(err => console.log(err)); 
            isReady = true;
            chaos2(message); 
    }else{
        // If the person isn't inside a voice channel
        message.channel.send('Você não está num canal de voz!');
    }
}

async function chaos2(message){
    //Why do I have to do a try/catch just to delete a message? Dunno >:
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
    if(counter < 10){
        setTimeout(function() {
            // First, incremente the counter to the next call
            counter++;
            // Here, goes the code to randomly switch channels
            randomKey = activeUsers.randomKey();
            usuario = activeUsers.get(randomKey);
            usuario.setVoiceChannel(voiceChannels.randomKey());
            // Check if the user disconnected from a voice channel during the recursivity 
            if(usuario.voiceChannel){
                // There's the recursivity
                try {
                    chaos3(counter, voiceChannel, voiceChannels, activeUsers, msgChannel);
                } catch (error) {
                    console.log('erro!');
                }
            }
        }, 1500);
    }else{
        // For sure I can improve that.
        usersArray = activeUsers.firstKey(activeUsers.array().length);
        // The last iteration that runs ALL the active users array, sending them to the original channel.
        for(x = 0; x < usersArray.length; x++){
            usuario = activeUsers.get(usersArray[x]);
            // Console.log('Deslocando ' + usuario.username + ' para o canal ' + voiceChannel.name + '.');
            usuario.setVoiceChannel(voiceChannel.id.toString());       
        }
    }
}

async function playQuinta(newUserChannel){
    randint = Math.floor(Math.random() * 2);
    if(randint === 1)
        filepath = './quintafeiradaledale.mp3';
    else
        filepath = './sextaanao.mp3';
    playSong(filepath, newUserChannel);
}

async function playSexta(newUserChannel){
    filepath = './sextafeirasim.mp3';
    playSong(filepath, newUserChannel);
}

//that shit do not work
/* function sleep(milliseconds){
    return new Promise((resolve) => {setTimeout(resolve, milliseconds)});
} */

async function moeda(message){
    // Just a function that gets a random number between 0 or 1
    randint = Math.floor(Math.random() * 2);
    // If the random number is 1, print CARA!
    if(randint === 1){
        message.channel.send('CARA!');
    }else{
    // Just print COROA!
        message.channel.send('COROA!');
    }
}

async function horario(message){
    hoje = new Date();
    newUserChannel = message.member.voiceChannel;
    // If its midnight, Marquinhos enter the voice channel and ANNOUNCES that its OLEO DE MACACO TIME
    if(hoje.getHours() == 00 && isReady){
        filepath = './macaco.mp3';
        playSong(filepath, newUserChannel);
    }else{
        // If its not midnight, Marquinhos send the time in the channel
        if(hoje.getHours < 10){
            message.channel.send('Agora são 0' + hoje.getHours() + ':' + hoje.getMinutes());
        }else{
            message.channel.send('Agora são ' + hoje.getHours() + ':' + hoje.getMinutes());
        }
    }
}

async function prender(message){
    // idPreso can be undefined (wich will activate the function)
    /* Transforms the content of the message in an array and excludes the !prender part
    arrayPreso = message.content.split(' ');
    arrayPreso.shift();
    // Retransforms the name in a String without the !prender part (why didn't I just used replace()?)
    nomePreso = arrayPreso.join(' ');
    */
    // Get the person who should be arrested
    nomePreso = message.content.replace('!prender ', '');
    // Try to find a user with a nickname equals to the given name, and put into the collection presoCollection
    presoCollection = message.guild.members.filter(user => user.nickname === nomePreso);
    // If we don't find the nickname user, try with his real username
    if(presoCollection.array().length != 1){
        presoCollection = message.guild.members.filter(user => user.user.username === nomePreso);
    }
    // And the variable preso gets the user itself.
    preso = presoCollection.first();
    if(preso.user.username == 'MarquinhosBOT'){
        return
    }
    if(!preso){
        message.channel.send('Não pude achar essa pessoa no servidor!');
    }else{
        if(!idPreso.includes(preso.id)){
            // Then the id its assigned for the person who'll be arrested
            idPreso.push(preso.id);
            // Here we warn to the sent message's channel that the person will be arrested
            message.channel.send(message.author.username + ' prendeu ' + preso.user.username + '!');
             // Move the arrested person to the 'alone' channel
            preso.setVoiceChannel('597641313180975174');
        }else{
            message.channel.send(preso.user.username + ' já está preso!');
        }
    }
}

async function desprender(message){
    // Checks if the person who sent the !desprender request its not the arrested one
    // (Also checks if its not the father of Marquinhos :))
    if(idPreso.includes(message.author.id) && message.author.id != '305838877866721280'){
        return;
    }else{
        // If its not one of the above, the person can be (de?)arrested
        nomeSolto = message.content.replace('!desprender ', '').replace('!soltar ', '');
        // Try to find a user with a nickname equals to the given name, and put into the collection presoCollection
        solto = message.guild.members.filter(user => user.nickname === nomeSolto).first();
        // If we don't find the nickname user, try with his real username
        if(!solto){
            solto = message.guild.members.filter(user => user.user.username === nomeSolto).first();
        }
        if(solto && idPreso.indexOf(solto.id) != -1){
            tiago = message.guild.members.filter(user => user.id === '305838877866721280').first();
            tiago.send(solto.user.username + ' foi solto no Devaneios!!');
            idPreso.splice(idPreso.indexOf(solto.id), 1);
            try {
                solto.send('Você foi solto no Devaneios!! :)');
            } catch (error) {
                console.log(error)
            }
            
        }else{
            message.channel.send(nomeSolto + ' não está preso!');
        }
    }
}

async function playSong(filepath, newUserChannel){
    try {
        isReady = false;
        newUserChannel.join().then(connection => {
        const dispatcher = connection.playFile(filepath);
        dispatcher.on('end', end => {
            newUserChannel.leave();
            isReady = true;
        });
    }).catch(err => console.log(err));
    } catch (error) {
        console.log(error)
    }  
}

async function encarcerados(message){
    lista = '';
    for(x = 0; x < idPreso.length; x++)
        lista += idPreso[x] + '\n';
    if(lista != '')
        message.author.send(lista);
    else   
        message.author.send('Ninguém preso!');
}

async function miau(message){
    newUserChannel = message.member.voiceChannel;
    playSong('./miau.mp3', newUserChannel)
}

async function cabra(message){
    newUserChannel = message.member.voiceChannel;
    playSong('./cabra.mp3', newUserChannel)
}

async function boombam(message){
    newUserChannel = message.member.voiceChannel;
    playSong('./boombam.mp3', newUserChannel)
}

async function importunar(message){
    randint = Math.floor(Math.random() * 3);
    pessoaImportunada = message.content.split(' ')[1];
    console.log(pessoaImportunada)
    importunada = message.guild.members.filter(user => user.user.username === pessoaImportunada).first();
    if(!importunada){
        importunada = message.guild.members.filter(user => user.nickname === pessoaImportunada).first();
    }
    //console.log(importunada)
    switch(randint){
        case(1):
            filepath = './miau.mp3';
            break;
        case(2):
            filepath = './cabra.mp3';
            break;
        case(3):
            filepath = './boombam';
            break;
    }
    try {
        playSong(filepath, importunada.voiceChannel) ;   
    } catch (error) {
        console.log()   
    }
}

async function help(message){
    args = message.content.split(' ');
    // Just !help function
    if(!args[1]){
        message.channel.send(links.help);
    }
    // Help to a specific command
    else{
        var bool = false;
        comando = args[1];
        if(links[comando] != undefined){
            message.channel.send(links[comando]);
        }else{
            // Command not found
            message.channel.send('O comando !' + args[1] + ' não existe ainda!');
        }
    }
        
}