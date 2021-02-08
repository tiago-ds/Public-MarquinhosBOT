require('dotenv').config();
const { prefix } = process.env.PREFIX;
const Discord = require("discord.js");
module.exports = {
    name: "help",
    description: "Eu te ajudo, dã.",
    aliases: ["commands"],
    usage: " <nome do comando>",
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            let fields = commands.filter((cmd) => !cmd.hide).map((command) => {
                const container = {};

                container.name = command.name;
                container.value = command.description;

                return container;
            });
            // data.push(commands.map((command) => command.name).join(", "));
            // data.push(
            //     `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`
            // );
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
                        `Could not send help DM to ${message.author.tag}.\n`,
                        error
                    );
                    message.reply(
                        "it seems like I can't DM you! Do you have DMs disabled?"
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
        let fields = [];
        try{
            if(command.aliases){
                fields.push({"name":"Aliases" , "value":command.aliases});
            }
            if(command.usage){
                fields.push({"name":"Usage", "value":`${command.usage}`});
            }
        }catch(e){
            console.log(e);
        }
        
        
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle(command.name)
            .setDescription(`Descrição: ${command.description}`)
            .addFields(fields);

        message.channel.send(exampleEmbed);
    },
};
