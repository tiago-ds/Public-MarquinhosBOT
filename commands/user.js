module.exports = {
    name: "user",
    description: "Admin users only",
    execute(message, args) {
        console.log(message.guild);
    },
};