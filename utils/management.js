class Manager{
    isReady;
    idPreso;
    debug;
    nowPlaying;
    nowPlayingRef;
    constructor(){
        this.isReady = true;
        this.idPreso = [];
        this.debug = false;
        this.nowPlaying = null;
        this.nowPlayingRef = null;
    }
}

module.exports.manage = new Manager();