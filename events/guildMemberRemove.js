require('dotenv').config();
module.exports = async (client, member) => {
    member.guild.channels.cache
        .get(process.env.DEFAULT_CHANNEL_ID)
        .send(member.user.username + " fechou sua diária!");
};
