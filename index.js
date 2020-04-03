const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");
const { clientId, clientSecret } = require("./config2.json");

var SpotifyWebApi = require("spotify-web-api-node");

const links = require("./links.json");
const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
const queue = [];
const fetch = require("node-fetch");
fs = require("fs");

client.login(config.token);

client.on("ready", () => {
    console.log("logged");
    client.user.setActivity("pedra na casa de Manu");
});

client.on("warn", console.error);

client.on("disconnect", () => console.log("Just disconnected!"));

client.on("message", async message => {
    // Music queue
    const serverQueue = queue;

    // In case its a bot's message
    if (message.author.bot) return;
    //In case the message was sent in the wrong channel
    channelId = message.channel.id;
    if (
        channelId != 680967084879904778 &&
        channelId != 680976473926270991 &&
        message.content.charAt(0).match("[-;!]")
    ) {
        message.author.send("Este não é o canal apropriado para comandos de bots.");
        message.delete();
    }
    // In case its not a prefix starting message
    if (message.content.indexOf(config.prefix) !== 0) return;
    //divide a mensagem em um array considerando os espaços.
    const args = message.content.toLowerCase().split(" ");
    //console.log(args);
    if (message.content.startsWith(config.prefix)) {
        const m = args[0].replace(config.prefix, "");
        //message.channel.send(args);
        switch (m) {
            case "play":
                execute(message, serverQueue);
                break;
            case "debug":

                message.channel.send("Ok.");
                break;
            case "queue":
                fila="";
                serverQueue.forEach(element => {
                    fila += element.song.title + "\n"
                });
                message.channel.send("```"+ fila +"```")
            case "disconnect":
                if (message.guild.voice.connection) {
                    message.guild.voice.connection.disconnect();
                } else {
                    message.channel.send("Eu não estou em um canal de voz :/");
                }
                break;
            case "dm":
                message.author.send("Dale menó");
                break;
            default:
                message.channel.send("Favor digitar um comando válido.");
        }
    }
});

function getPlaylist(link) {
    playlist_id = link.split("playlist/")[1].split("?")[0];

    var spotifyApi = new SpotifyWebApi({
        clientId: clientId,
        clientSecret: clientSecret
    });
    return new Promise((resolve, reject) => {
        spotifyApi.clientCredentialsGrant().then(
            function (data) {
                spotifyApi.setAccessToken(data.body["access_token"]);
                spotifyApi.getPlaylist(playlist_id).then(
                    function (data) {
                        tracks = [];
                        data.body.tracks.items.forEach(element => {
                            artists = "";
                            element.track.artists.forEach(artist => {
                                artists += artist.name + ", ";
                            });
                            artists = artists.substring(0, artists.length - 2);
                            //console.log(element.track.name + " - " + artists);
                            tracks.push(element.track.name + " - " + artists);
                        });
                        resolve(tracks);
                        return tracks;
                    },
                    function (err) {
                        reject(err);
                    }
                );
            },
            function (err) {
                reject(err);
            }
        );
    });
}

client.on("guildMemberAdd", member => {
    member.guild.channels
        .get("680975188581416998")
        .send(member.user.username + " agora faz parte do motel!");
});

client.on("guildMemberRemove", member => {
    member.guild.channels
        .get("680975188581416998")
        .send(member.user.username + " fechou sua diária!");
    member.send("Bem vindo ao devaneios! :)");
});

async function execute(message, serverQueue) {
    const arr = message.content.replace("!play ", "");
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
        return message.channel.send(
            "Você precisa estar conectado a um canal de voz!"
        );
    }
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(
            "Painho não me deu permissão pra entrar nesse canal de voz :("
        );
    }
    var connection = await voiceChannel.join();
    if (message.content.replace("!play ", "").match("open.spotify.com")) {
        tracks = await getPlaylist(message.content.replace("!play ", ""));
        await tracks.forEach(async function (element) {
            music = await search(element);
            await console.log(element + ": " + music)
            const info = await ytdl.getInfo(music.split("?v=")[1]);
            const song = {
                title: info.title,
                url: info.video_url
            };

            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                song: song,
                volume: 5,
                playing: false
            };

            queueConstruct.connection = connection;

            await serverQueue.push(queueConstruct);
            try {
                if (!serverQueue[0].playing) {
                    play(message.guild, serverQueue);
                }
            } catch (err) {
                console.log(err)
            }
        });
        
    } else {
        video = await search(arr);

        console.log(video);

        const info = await ytdl.getInfo(video.split("?v=")[1]);
        const song = {
            title: info.title,
            url: info.video_url
        };
        if (!serverQueue) {
            console.log("Teste");
        } else {
            try {
                await message.channel.send(`${song.title} foi adicionada à fila!`);
            } catch (err) {
                console.log(err);
            }
        }

        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            song: song,
            volume: 5,
            playing: false
        };

        try {
            queueConstruct.connection = connection;
            serverQueue.push(queueConstruct);
            console.log(serverQueue[0].playing);
            if (!serverQueue[0].playing) {
                play(message.guild, serverQueue);
            }
        } catch (err) {
            console.log(err);
            //queue.delete(message.guild.id);
            return message.channel.send(err);
        }
    }
}

function search(songName) {
    return new Promise((resolve, reject) => {
        ytsr.getFilters(songName, function (err, filters) {
            if (err) {
                reject(err);
            }
            filter = filters.get("Type").find(o => o.name === "Video");
            ytsr.getFilters(filter.ref, function (err, filters) {
                if (err) {
                    reject(err);
                }
                filter = filters.get("Duration").find(o => o.name.startsWith("Short"));
                var options = {
                    limit: 5,
                    nextpageRef: filter.ref
                };
                ytsr(null, options, function (err, searchResults) {
                    if (err) {
                        reject(err);
                    }
                    video_id = searchResults.items[0].link;
                    console.log(video_id);
                    resolve(video_id);
                    return video_id;
                });
            });
        });
    });
}

function play(guild, serverQueue) {
    console.log(Array.isArray(serverQueue));
    console.log(typeof serverQueue);
    if (serverQueue.length == 0) {
        serverQueue.voiceChannel.leave();
        return;
    }
    console.log(serverQueue.lenght);
    if (serverQueue.length > 0) {
        console.log(serverQueue[0].song.url);
        console.log(serverQueue[0].song.volume);
        const dispatcher = serverQueue[0].connection
            .play(ytdl(serverQueue[0].song.url))
            .on("finish", () => {
                serverQueue.shift();
                console.log(serverQueue.length);
                play(guild, serverQueue);
            })
            .on("error", error => console.error(error));
        serverQueue[0].playing = true;
        dispatcher.setVolumeLogarithmic(serverQueue[0].volume / 5);
        serverQueue[0].textChannel.send(
            `Tocando agora ${serverQueue[0].song.title}`
        );
    }
}
