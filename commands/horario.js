const player = require("./../utils/player");
module.exports = {
    name: "horario",
    description: "Te digo o horário. Apenas.",
    execute(message, args) {
        hoje = new Date().toLocaleString("pt-BR", {
            timeZone: "America/Recife",
        });
        newUserChannel = message.member.voiceChannel;
        // If its midnight, Marquinhos enter the voice channel and ANNOUNCES that it's OLEO DE MACACO TIME
        if (hoje.getHours() == 0) {
            filepath = "./resource/sounds/macaco.mp3";
            player.execute(message, filepath, newUserChannel);
        } else {
            // If its not midnight, Marquinhos send the time in the channel
            minutos = hoje.getMinutes();
            horas = hoje.getHours();
            if (minutos < 10) {
                minutos = `0${minutos}`;
            }
            if (horas < 10) {
                horas = `0${horas}`;
            }
            message.channel.send(`Agora são ${horas}:${minutos}`);
        }
    },
};
