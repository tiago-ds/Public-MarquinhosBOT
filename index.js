const fs = require("fs");
const Discord = require("discord.js");
const config = require("./configs/config.json");
const fileEdit = require("./utils/fileEdit");
const client = new Discord.Client();
const player = require("./utils/player");
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
  });
client.commands = new Discord.Collection();
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js") && file.toString() != "reload.js");
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}
var isReady;
var idPreso;

client.login(config.token);

client.on("ready", () => {
    console.log("logged");
    client.user.setActivity(get_bicho());
    setInterval(function () {
        client.user.setActivity(get_bicho());
    }, 100 * 1000);
    //client.user.setAvatar('./attachments/marquinhoshead.jpg');
});

client.on("warn", console.error);

client.on("disconnect", () => fileEdit.edit("isReady", true));

client.on("message", async (message) => {
    // In case its a bot's message
    if (message.author.bot) return;
    re = new RegExp(/b.*d.*a|g.*m.*n/gi);
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );
    if (!message.content.startsWith(config.prefix)) return;
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("there was an error trying to execute that command!");
    }

    if (re.test(accentsTidy(message.content))) {
        message.delete();
        message.channel.send(`${message.content} é o caralho.`);
        message.channel
            .fetchMessages({ limit: 1 })
            .then((messages) => {
                const lastMessage = messages.first();
                lastMessage.delete(5000);
            })
            .catch((err) => {
                console.error(err);
            });
    }
    // In case the message was sent in the wrong channel
    channel = message.channel;
    if (
        channel.id != 680967084879904778 &&
        channel.id != 680976473926270991 &&
        message.content.charAt(0).match("[-;]")
    ) {
        message.author.send(
            "Este não é o canal apropriado para comandos de bots."
        );
        message.delete();
    }
    if (
        channel.id == "709874875162034266" &&
        !message.content.startsWith("http")
    ) {
        message.author.send("Esse canal é para enviar links! >:(");
        message.delete();
    }
    // In case its not a prefix starting message
    if (message.content.indexOf(config.prefix) !== 0) return;
});

// client.on("guildMemberAdd", (member) => {
//     member.guild.channels.cache
//         .get("680975188581416998")
//         .send(member.user.username + " agora faz parte do motel!");
//     var role = member.guild.roles.cache.find((role) => role.name === "Outsiders");
//     member.addRole(role);
//     member.send(
//         "Olá! Você foi colocado num cargo onde não é possível entrar em canais de voz. Favor contate um " +
//             '"Vice-Dono" ou o "Dono do Motel" e entre no canal de voz "Alone" para que seja atribuído um cargo e você possa ' +
//             "usar o servidor normalmente! :D"
//     );
//     tiago = message.guild.members
//         .filter((user) => user.id === "305838877866721280")
//         .first();
//     tiago.send(
//         `O usuário ${member.user.username} entrou no servidor e quer se registrar!`
//     );
// });

client.on("guildMemberRemove", (member) => {
    member.guild.channels.cache
        .get("680975188581416998")
        .send(member.user.username + " fechou sua diária!");
    member.send("Bem vindo ao devaneios! :)");
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
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
                    playQuinta(newUserChannel);
                    break;
                case 5:
                    playSexta(newUserChannel);
                    break;
            }
        }
    }
});

async function playQuinta(newUserChannel) {
    randint = Math.floor(Math.random() * 2);
    let filepath;
    if (randint === 1) filepath = "./quintafeiradaledale.mp3";
    else filepath = "./resources/sounds/sextaanao.mp3";
    player.execute("", filepath, newUserChannel);
}

async function playSexta(newUserChannel) {
    filepath = "./sextafeirasim.mp3";
    player.execute("", filepath, newUserChannel);
}

//that shit do not work
/* function sleep(milliseconds){
    return new Promise((resolve) => {setTimeout(resolve, milliseconds)});
} */

function get_bicho(numero) {
    bichos = [
        "Easter egg",
        "Avestruz",
        "Àguia",
        "Burro",
        "Borboleta",
        "Cachorro",
        "Cabra",
        "Carneiro",
        "Camelo",
        "Cobra",
        "Coelho",
        "Cavalo",
        "Elefante",
        "Galo",
        "Gato",
        "Jacaré",
        "Leão",
        "Macaco",
        "Porco",
        "Pavão",
        "Peru",
        "Touro",
        "Tigre",
        "Urso",
        "Veado",
        "Vaca",
    ];
    machos = [
        1,
        3,
        5,
        7,
        8,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
    ];
    randint = Math.floor(Math.random() * 99) + 1;
    randCeil = Math.ceil(randint / 4);
    if (machos.includes(randCeil)) return `no ${bichos[randCeil]} ${randint}`;
    return `na ${bichos[randCeil]} ${randint}`;
}

accentsTidy = function (s) {
    var r = s.toLowerCase();
    r = r.replace(new RegExp(/\s/g), "");
    r = r.replace(new RegExp(/[àáâãäå]/g), "a");
    r = r.replace(new RegExp(/æ/g), "ae");
    r = r.replace(new RegExp(/ç/g), "c");
    r = r.replace(new RegExp(/[èéêë]/g), "e");
    r = r.replace(new RegExp(/[ìíîï]/g), "i");
    r = r.replace(new RegExp(/ñ/g), "n");
    r = r.replace(new RegExp(/[òóôõö]/g), "o");
    r = r.replace(new RegExp(/œ/g), "oe");
    r = r.replace(new RegExp(/[ùúûü]/g), "u");
    r = r.replace(new RegExp(/[ýÿ]/g), "y");
    r = r.replace(new RegExp(/\W/g), "");
    return r;
};
