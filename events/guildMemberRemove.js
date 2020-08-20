const Discord = require("discord.js");
module.exports = async (client, member) => {
    member.guild.channels.cache
        .get(member.guild.systemChannelID)
        .send(member.user.username + " fechou sua diária!");
};
