const fileEdit = require("./fileEdit");
const ytsr = require("ytsr");
module.exports = {
    name: "play",
    description: "Executa uma música",
    execute(message, args) {
        newUserChannel = message.member.voice.channel;
        searchTerm = args.join(" ");
        ytsr.getFilters(searchTerm, function (err, filters) {
            console.log(searchTerm);
            if (err) throw err;
            filter = filters.get("Type").find((o) => o.name === "Video");
            ytsr.getFilters(filter.ref, function (err, filters) {
                if (err) throw err;
                filter = filters
                    .get("Duration")
                    .find((o) => o.name.startsWith("Short"));
                var options = {
                    limit: 5,
                    nextpageRef: filter.ref,
                };
                ytsr(null, options, function (err, searchResults) {
                    if (err) throw err;
                    video_id = searchResults.items[0].link;
                    console.log(video_id);
                    isReady = fileEdit.read("isReady");
                    if (!newUserChannel) {
                        message.channel.send(
                            "Você deve estar em um canal de voz para usar esse comando!"
                        );
                    } else if (isReady) {
                        fileEdit.edit("isReady", false);
                        newUserChannel
                            .join()
                            .then(async (connection) => {
                                const dispatcher = connection.play(
                                    await (ytdl(video_id)),
                                    { type: 'opus' }
                                );
                                dispatcher.on("finish", (end) => {
                                    setTimeout(() => {
                                        newUserChannel.leave();
                                        fileEdit.edit("isReady", true);
                                        dispatcher.destroy();
                                    }, 1500);
                                });
                                dispatcher.on('error', console.error);
                            })
                            .catch((err) => {
                                fileEdit.edit("isReady", true);
                                console.log(err);
                                newUserChannel.leave();
                            });
                    } else {
                        message.channel.send("Já estou em um canal de voz");
                    }
                });
            });
        });
    },
};