const fs = require("fs");
const Discord = require("discord.js");
require('dotenv').config();

/**
 * Main function of the bot
 * 
 * @name main
 * @type {function}
 */
var main = function () {

    /**
     * An instance of discord client
     * @name client
     * @type {Discord Client}
     */
    const client = new Discord.Client();

    /**
     * An array of event files under the events folder
     * @name eventFiles
     * @type {array}
     */
    const eventFiles = fs
        .readdirSync("./events")
        .filter((file) => file.endsWith(".js"));

    // Iterate through the eventFiles array
    // binding each one of them to the client event listener
    for (const file of eventFiles) {

        /**
         * An event module under the events folder
         * @name event
         * @type {Node module}
         */
        const event = require(`./events/${file}`);

        /**
         * A string containing the name of the event
         * @name eventName
         * @type {string}
         */
        let eventName = file.split(".")[0];

        // Start a listerner for the client
        // with the event name as the command name
        // and the bind the event with the exported module
        client.on(eventName, event.bind(null, client));
    }

    /**
     * An discord collection containing the bot commands
     * @name client.commands
     * @type {Discord Collection}
     */
    client.commands = new Discord.Collection();

    /**
     * An array of command files under the commands folder
     * @name commandFiles
     * @type {array}
     */
    const commandFiles = fs
        .readdirSync("./commands")
        .filter((file) => file.endsWith(".js"));
    
    // Iterate through the commandFile array
    // setting each one of them in the client commands
    for (const file of commandFiles) {

        /**
         * A string containing the name of the event
         * @name eventName
         * @type {string}
         */
        const command = require(`./commands/${file}`);

        // Set a new item in the Collection
        // with the key as the command name and the value as the exported module
        client.commands.set(command.name, command);
    }

    // Start the bot calling the login function
    // and passing the application token as parameter
    client.login(process.env.TOKEN);
};

// Start the bot main 
main();