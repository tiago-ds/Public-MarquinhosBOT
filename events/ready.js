const config = require("./../configs/config.json");
const fileEdit = require("./../utils/fileEdit");
const animalLottery = require("./../utils/animalLottery");
module.exports = (client) => {
    console.log("logged");
    client.user.setActivity(animalLottery.get_bicho());
    fileEdit.edit("isReady", true);
    setInterval(function () {
        client.user.setActivity(animalLottery.get_bicho());
    }, 100 * 1000);

};
