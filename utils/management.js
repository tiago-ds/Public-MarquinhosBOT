class Manager{
    isReady;
    idPreso;
    debug;
    constructor(){
        this.isReady = true;
        this.idPreso = [];
        this.debug = false;
    }
}

module.exports.manage = new Manager();