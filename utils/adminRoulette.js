const admins = require('./../configs/adminroulette.json');
module.exports = {
    async roulette(counter, guild) {
        let adminRole = guild.roles.cache.find((r) => r.name === process.env.ADMIN_ROLE_NAME);
        let nowAdmin = guild.members.cache
            .filter((user) => user.id === admins.users[counter].id)
                .first();
        let nextAdmin = guild.members.cache
            .filter((user) => user.id === admins.users[(counter + 1)%5].id)
                .first();
        console.log(`Removendo a role de admin de ${nowAdmin.user.username}.`);
        nowAdmin.roles.remove(adminRole);
        msg = await nowAdmin.send("O mundo gira! Você perdeu seu admin.");
        msg.delete({timeout: 10000});
        console.log(`Adicionando a role de  admin para ${nextAdmin.user.username}`);
        msg = await nextAdmin.send("Você está na roleta dos admins! É a sua vez agora :)");
        msg.delete({timeout: 10000});
        nextAdmin.roles.add(adminRole);
    }
};