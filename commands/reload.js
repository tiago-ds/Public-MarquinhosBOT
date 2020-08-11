const fs = require("fs");
const clearModule = require("clear-module");
module.exports = {
    name: "reload",
    description: "comando de admin",
    execute(message, args, commands) {
        if (!args || args.length == 0) {
            message.reply("⚠️ Escreva o comando que deseja dar reload!");
        }
        const commandFiles = fs
            .readdirSync("./commands")
            .filter((file) => file.toString() == `${args[0]}.js`);
        const file = commandFiles[0];
        if (file) {
            clearModule(`./${args[0]}.js`);
            const command = require(`./${file}`);
            commands.set(command.name, command);
        } else {
            message.reply("⚠️ Você deve escrever um comando existente!");
        }
    },
};
