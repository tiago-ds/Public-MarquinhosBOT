const fileEdit = require("./../utils/fileEdit");
const { Message } = require("discord.js");
module.exports = {
    execute(message, inputStream, channel) {
        isReady = fileEdit.read("isReady");
        if (!channel) {
            message.channel.send(
                "Canal de voz indisponível!"
            );
        } else if (isReady) {
            fileEdit.edit("isReady", false);
            channel
                .join()
                .then((connection) => {

                    const dispatcher = connection.play(inputStream);

                    dispatcher.on("finish", (end) => {
                        setTimeout(() => {
                            channel.leave();
                            fileEdit.edit("isReady", true);
                            dispatcher.destroy();
                        }, 1500);
                    });
                })
                .catch((err) => {
                    fileEdit.edit("isReady", true);
                    console.log(err);
                    channel.leave();
                });
        } else {
            message.channel.send("Já estou em um canal de voz");
        }
    },
};
