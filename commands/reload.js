const fs = require("fs");
const clearModule = require("clear-module");
module.exports = {
    name: "reload",
    description: "comando de admin",
    hide: true,
    execute(message, args, commands) {
        if (!args || args.length == 0) {
            message.reply("Diga aí o comando, man ;D");
        }
        const commandFiles = fs
            .readdirSync("./commands")
            .filter((file) => file.toString() == `${args[0]}.js`);
        const file = commandFiles[0];
        if (file) {
            clearModule(`./${args[0]}.js`);
            const command = require(`./${file}`);
            console.log(`Atualizando ${command.name}`);
            commands.set(command.name, command);
        } else {
            message.reply("Que comando é esse, doido?");
        }
    },
};
