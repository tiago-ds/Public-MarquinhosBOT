const fileEdit = require("./../utils/fileEdit");
const animalLottery = require("./../utils/animalLottery");
module.exports = (client) => {
    console.log("logged");
    client.user.setActivity(animalLottery.get_bicho());
    //client.user.setActivity("NADA PORQUE ESTOU EM MODO DEVELOPMENT");
    fileEdit.edit("isReady", true);
    setInterval(function () {
        client.user.setActivity(animalLottery.get_bicho());
    }, 100 * 1000);

};
