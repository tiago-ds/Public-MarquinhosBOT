const roleta = require('./../utils/adminRoulette');
const { TIMEOUT } = require('dns');
module.exports = {
    name: "user",
    description: "admin only.",
    async execute(message, args) {
        message.delete();
    },
};
