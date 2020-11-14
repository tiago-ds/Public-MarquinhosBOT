require('dotenv').config();
module.exports = async (client, message) => {
    if (message.author.bot) return;
    re = new RegExp(/b*.dia/gi);
    re2 = new RegExp(/(^[Pp]arab[ée]ns.*[Mm]arquinhos)/gi);
    //if (message.content.indexOf(config.prefix) !== 0) return;

    //if (!cmd) return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );
    if (message.content.startsWith(process.env.PREFIX)) {
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
        } else if(re2.test(message.content)){
            await message.reply("parabéns pra VOCÊ! Você é incrível! :)");
        }
        // In case the message was sent in the wrong channel
        channel = message.channel;
        if (
            channel.id != process.env.BOT_CHANNEL_ID &&
            message.content.charAt(0).match("[-;]")
        ) {
            message.author.send(
                "Este não é o canal apropriado para comandos de bots."
            );
            message.delete();
        }
        if (
            channel.id == process.env.LINKS_CHANNEL_ID &&
            !message.content.startsWith("http")
        ) {
            message.author.send("Esse canal é para enviar links! >:(");
            message.delete();
        }
    }
};
