const Discord = require("discord.js");
module.exports = async (client, member) => {
    member.guild.channels.cache
        .get("680975188581416998")
        .send(member.user.username + " fechou sua diária!");
    member.send("Bem vindo ao devaneios! :)");
};
