const config = require("./../configs/config.json");
module.exports = (client, message) => {
    if (message.author.bot) return;
    re = new RegExp(/b.*d.*a|g.*m.*n/gi);
    //if (message.content.indexOf(config.prefix) !== 0) return;

    //if (!cmd) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );
    if (message.content.startsWith(config.prefix)) {
        try {
            command.execute(message, args, client.commands);
        } catch (error) {
            console.error(error);
            message.reply("there was an error trying to execute that command!");
        }
    } else {
        // if (re.test(accentsTidy(message.content))) {
        //     message.delete();
        //     message.channel.send(`${message.content} é o caralho.`);
        //     message.channel
        //         .fetchMessages({ limit: 1 })
        //         .then((messages) => {
        //             const lastMessage = messages.first();
        //             lastMessage.delete(5000);
        //         })
        //         .catch((err) => {
        //             console.error(err);
        //         });
        // }
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
    }
};
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