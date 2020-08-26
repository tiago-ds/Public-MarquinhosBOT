const fileEdit = require("./../utils/fileEdit");
module.exports = {
    name: "desprender",
    aliases: ["soltar", "liberar"],
    description: "Eu realmente preciso explicar?",
    execute(message, args) {
        // Checks if the person who sent the !desprender request its not the arrested one
        // (Also checks if its not the father of Marquinhos :))
        idPreso = fileEdit.read("idPreso");
        if (
            idPreso.includes(message.author.id) &&
            message.author.id != message.guild.ownerID
        ) {
            message.channel.send("E desde quando preso tem a chave da cela?");
            return;
        } else {
            // If its not one of the above, the person can be (de?)arrested
            nomeSolto = args[0];
            // Try to find a user with a nickname equals to the given name, and put into the collection presoCollection
            solto = message.guild.members.cache
                .filter((user) => user.nickname === nomeSolto)
                .first();
            // If we don't find the nickname user, try with his real username
            if (!solto) {
                solto = message.guild.members.cache
                    .filter((user) => user.user.username === nomeSolto)
                    .first();
            }
            if (solto && idPreso.indexOf(solto.id) != -1) {
                let admin = message.guild.members.cache
                    .filter((user) => user.id === message.guild.ownerID)
                    .first();
                admin.send(solto.user.username + " foi solto no Devaneios!!");
                idPreso.splice(idPreso.indexOf(solto.id), 1);
                fileEdit.edit("idPreso", idPreso);
                try {
                    solto.send("Você foi solto no Devaneios!! :)");
                } catch (error) {
                    console.log(error);
                }
            } else {
                message.channel.send(nomeSolto + " não está preso!");
            }
        }
    },
};
