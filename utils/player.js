const fileEdit = require("./../utils/fileEdit");
const { Message } = require("discord.js");
module.exports = {
    execute(message, inputStream, channel) {
        isReady = fileEdit.read("isReady");
        if (!channel) {
            message.channel.send(
                "Você deve estar em um canal de voz para usar esse comando!"
            );
        } else if (isReady) {
            fileEdit.edit("isReady", false);
            channel
                .join()
                .then((connection) => {
<<<<<<< HEAD
                    const dispatcher = connection.play(inputStream);
=======
                    const dispatcher = connection.play(inputStream, options);
>>>>>>> 0e84b603c3ae9a769f6499332c0d4c82ecf91af6
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
