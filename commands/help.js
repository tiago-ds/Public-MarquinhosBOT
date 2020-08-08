const { prefix } = require("./../configs/config.json");
const Discord = require("discord.js");
module.exports = {
    name: "help",
    description: "List all of my commands or info about a specific command.",
    aliases: ["commands"],
    usage: "[command name]",
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            let fields = commands.map((command) => {
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
                .setDescription("Here's a list of all my commands:")
                .addFields(fields);

            return message.author
                .send(exampleEmbed)
                .then(() => {
                    if (message.channel.type === "dm") return;
                    message.reply("I've sent you a DM with all my commands!");
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
