module.exports = async (client, member) => {
    member.guild.channels.cache
        .get(member.guild.publicUpdatesChannelId)
        .send(member.user.username + " fechou sua diária!");
};
