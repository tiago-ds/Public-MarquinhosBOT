const manage = require("./../utils/management").manage;
module.exports = {
    name: "encarcerados",
    aliases: ["presos"],
    description: "Te dou uma lista de encarcerados, por id (coisa de Dev)",
    execute(message) {
        lista = "";
        for (x = 0; x < manage.idPreso.length; x++) lista += manage.idPreso[x] + "\n";
        if (lista != "") {
            message.author.send(lista);
        } else {
            message.author.send("Ninguém preso!");
        }
    },
};
