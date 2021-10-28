const Discord = require("discord.js");
require('dotenv').config();
module.exports = async (client, member) => {
    member.guild.channels.cache
        .get(member.guild.publicUpdatesChannelId)
        .send(member.user.username + " agora faz parte do motel!");
    let role = member.guild.roles.cache.find((r) => r.name === process.env.OUTSIDER_ROLE_NAME);
    member.roles.add(role);
    member.send(
        "Olá! Você foi colocado num cargo onde não é possível entrar em canais de voz. Favor contate um " +
            '"Vice-Dono" ou o "Dono do Motel" e entre no canal de voz "Alone" para que seja atribuído um cargo e você possa ' +
            "usar o servidor normalmente! :D"
    );
    let admin = member.guild.members.cache
        .filter((user) => user.id === member.guild.ownerID)
        .first();
    admin.send(
        `O usuário ${member.user.username} entrou no servidor e quer se registrar!`
    );
    const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.username, member.user.avatarURL)
        .setColor("#0099ff")
        .addFields({
            name: "Bem vinde!",
            value:
                "Leia as regras para não tomar KICK/BAN e mantenha um bom relacionamento com o pessoal :sunglasses: ",
        })
        .setTimestamp()
        .setFooter("Data de entrada", client.user.avatarURL);
    member.guild.channels.cache.get(member.guildrulesChannelId).send({ embed });
};
