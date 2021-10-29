module.exports = {
    name: "moeda",
    aliases: ["coin"],
    description: "Tiro cara ou coroa numa moeda semi-viciada.",
    usage: "!moeda | !coin",
    async execute(message) {
        // Just a function that gets a random number between 0 or 1
        randint = Math.floor(Math.random() * 2);
        // If the random number is 1, send a HEAD embed!
        if(randint === 1){
            message.channel.send({files: ["./resources/images/coin_head.png"]});
        }else{
        // Tails!
            message.channel.send({files: ["./resources/images/coin_tail.png"]});
        }
    },
};