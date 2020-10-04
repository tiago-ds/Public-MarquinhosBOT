module.exports = {
    name: "user",
    description: "admin only.",
    async execute(message, args) {
        message.delete();
    },
};
