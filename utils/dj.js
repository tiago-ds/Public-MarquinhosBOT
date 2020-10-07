const ytdl = require("ytdl-core");

class Dj {
    musicQueue;
    audioQueue;
    musicDispatcher;
    audioDispatcher;
    playingMusic;
    playingAudio;
    music;
    constructor() {
        this.playingMusic = false;
        this.playingAudio = false;
        this.titlePlaying = "";
        this.musicQueue = [];
        this.audioQueue = [];
        this.musicDispatcher = null;
        this.audioDispatcher = null;
        this.music;
        this.seek = 0;
    }

    playMusic(newUserChannel, seek) {
        if (this.musicQueue.length == 0) return;
        this.playingMusic = true;
        newUserChannel
            .join()
            .then((connection) => {
                const video_id = this.musicQueue[0].link;
                this.music = this.musicQueue[0];
                this.musicDispatcher = connection.play(
                    ytdl(video_id, {
                        filter: "audioonly",
                        quality: "highestaudio",
                        highWaterMark: 1024 * 1024 * 10,
                    }),
                    { seek: seek }
                );
                this.seek = 0;
                this.musicDispatcher.setVolume(0.4);
                this.titlePlaying = this.musicQueue[0].title;
                this.musicQueue.shift();
                this.musicDispatcher.on("finish", (end) => {
                    setTimeout(() => {
                        console.log("Finished playing music");
                        if (this.musicQueue.length == 0) {
                            this.playingMusic = false;
                            newUserChannel.leave();
                            this.musicDispatcher.destroy();
                        } else {
                            this.playMusic(newUserChannel, 0);
                        }
                    }, 1500);
                });
                this.musicDispatcher.on("error", () => {
                    console.error;
                    newUserChannel.leave();
                    this.playingMusic = false;
                });
            })
            .catch((err) => {
                this.playingMusic = false;
                console.log(err);
                newUserChannel.leave();
            });
    }

    async playAudio(channel, chaos) {
        let seek;
        if (this.playingMusic) {
            console.log("Pausing music");
            this.musicDispatcher.pause();
            this.musicQueue.unshift(this.music);
            seek =
                this.musicDispatcher.player.dispatcher.pausedSince / 1000 -
                this.musicDispatcher.player.dispatcher.startTime / 1000;
            this.seek += seek;
            console.log(seek);
        }
        return await channel
            .join()
            .then(async (connection) => {
                this.audioDispatcher = await connection.play(this.audioQueue[0]);
                this.playingAudio = true;
                this.audioQueue.shift();
                if (chaos) return;
                this.audioDispatcher.on("finish", (end) => {
                    setTimeout(() => {
                        if (this.audioQueue.length == 0) {
                            console.log("Fila de audios vazia");
                            if (this.playingMusic) {
                                this.playingAudio = false;
                                this.playMusic(channel, this.seek);
                            } else {
                                this.audioDispatcher.destroy();
                                channel.leave();
                            }
                        } else {
                            this.playAudio(channel);
                        }
                    }, 1500);
                });
            })
            .catch((err) => {
                this.playingAudio = false;
                console.log(err);
                channel.leave();
            });
    }
}

module.exports.dj = new Dj();
