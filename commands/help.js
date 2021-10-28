require('dotenv').config();
const { prefix } = process.env.PREFIX;
const Discord = require("discord.js");
module.exports = {
    name: "help",
    description: "Eu te ajudo, dã.",
    aliases: ["commands"],
    usage: "[command name]",
    cooldown: 5,
    execute(message, args) {

        const { commands } = message.client;

        if (!args.length) {
            let fields = commands.filter((cmd) => !cmd.hide).map((command) => {
                const container = {};

                container.name = command.name;
                container.value = command.description;

                return container;
            });

            const exampleEmbed = new Discord.MessageEmbed()
                .setColor("#0099ff")
                .setTitle("Commands")
                .setDescription("Eu faço isso aqui ó:")
                .addFields(fields);

            return message.author
                .send(exampleEmbed)
                .then(() => {
                    if (message.channel.type === "dm") return;
                    message.reply("Te enviei uma DM com meus comandos ;)");
                })
                .catch((error) => {
                    console.error(
                        `Não pude enviar uma Mensagem privada pra ${message.author.tag}.\n`,
                        error
                    );
                    message.reply(
                        "Ativa tuas DM aí, irmão (ou se tu me deu block, eu te odeio)"
                    );
                });
        }
        const name = args[0].toLowerCase();
        const command =
            commands.get(name) ||
            commands.find((c) => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply("that's not a valid command!");
        }
        let fields;
        try{
            fields = [
                {"name":"Aliases" , "value":command.aliases.join("| ")},
                {"name":"Usage", "value":`${prefix}${command.name}`}
            ];
        }catch(e){
            console.log(e);
            fields = [
                {"name":"Usage", "value":`${prefix}${command.name}`}
            ];
        }
        
        
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle(command.name)
            .setDescription(command.description)
            .addFields(fields);

        message.channel.send(exampleEmbed);
    },
};
