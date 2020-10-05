module.exports = {
    name: "user",
    description: "admin only.",
    hide: true,
    async execute(message, args) {
        message.delete();
    },
};
