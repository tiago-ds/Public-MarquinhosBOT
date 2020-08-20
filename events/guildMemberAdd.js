const Discord = require("discord.js");
module.exports = async (client, member) => {
    member.guild.channels.cache
        .get(member.guild.systemChannelID)
        .send(member.user.username + " agora faz parte do motel!");
    let role = member.guild.roles.cache.find((r) => r.name === "Outsiders");
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
            name: "Bem vindo(a)",
            value:
                "Leia as <#741771243317100554> para não tomar KICK/BAN e mantenha um bom relacionamento com o pessoal :sunglasses: ",
        })
        .setTimestamp()
        .setFooter("Data de entrada", client.user.avatarURL);
    member.guild.channels.cache.get("739562824178729122").send({ embed });
};
