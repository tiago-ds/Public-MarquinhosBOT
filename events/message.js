const config = require("./../configs/config.json");
module.exports = async (client, message) => {
    if (message.author.bot) return;
    re = new RegExp(/^b.*d.*a/gi);
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
        if(!command){
            message.reply(" esse comando não existe! Digite !help para uma lista de comandos.");
            return;
        }
        try {
            console.log(`Executando ${commandName}`);
            command.execute(message, args, client.commands);
        } catch (error) {
            console.error(error);
            message.reply("quebrei! :(");
        }
    } else {
        if (re.test(message.content)) {
            message.delete();
            message_sent = await message.channel.send(`${message.content} é o caralho.`);
            setTimeout(() => {
                message_sent.delete();
            }, 5000);
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
    }
};
