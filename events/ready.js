const config = require("./../configs/config.json");
const animalLottery = require("./../utils/animalLottery");
module.exports = (client) => {
    console.log("logged");
    client.user.setActivity(animalLottery.get_bicho());
    setInterval(function () {
        client.user.setActivity(animalLottery.get_bicho());
    }, 100 * 1000);
};
