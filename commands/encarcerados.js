const fileEdit = require("./../utils/fileEdit");

module.exports = {
    name: "encarcerados",
    aliases: ["presos"],
    description: "Te dou uma lista de encarcerados. (Tá em código!)",
    execute(message, args) {
        lista = "";
        idPreso = fileEdit.read("idPreso");
        for (x = 0; x < idPreso.length; x++) lista += idPreso[x] + "\n";
        if (lista != "") {
            message.author.send(lista);
        } else {
            message.author.send("Ninguém preso!");
        }
    },
};
