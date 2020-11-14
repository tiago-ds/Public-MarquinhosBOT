const admins = require('./../configs/adminroulette.json');
module.exports = {
    async roulette(counter, guild) {

        // Array of users ids.
        let adms = [];
        for(const p of admins.users){
            adms.push(p.id);
        }

        // Array with all the members objects
        let users = await guild.members.fetch({user: adms});
        adms = users.array();

        // Admin role
        let adminRole = guild.roles.cache.find(r => r.name === process.env.ADMIN_ROLE_NAME);

        // Current and next admins
        let nowAdmin = adms[counter];
        let nextAdmin = adms[(counter + 1)%5];

        console.log(`Removendo a role de admin de ${nowAdmin.user.username}.`);
        nowAdmin.roles.remove(adminRole);
        let msg = await nowAdmin.send("O mundo gira! Você perdeu seu admin.");
        msg.delete({timeout: 10000});

        console.log(`Adicionando a role de admin de ${nextAdmin.user.username}`);
        nextAdmin.roles.add(adminRole);
        msg = await nextAdmin.send("Você está na roleta dos admins! É a sua vez agora :)");
        msg.delete({timeout: 10000});
    }
};