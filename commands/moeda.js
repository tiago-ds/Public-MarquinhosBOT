module.exports = {
    name: "moeda",
    aliases: ["coin"],
    description: "Tiro cara ou coroa numa moeda semi-viciada.",
    execute(message, args) {
        // Just a function that gets a random number between 0 or 1
        randint = Math.floor(Math.random() * 2);
        // If the random number is 1, print CARA!
        if(randint === 1){
            message.channel.send('CARA!');
        }else{
        // Just print COROA!
            message.channel.send('COROA!');
        }
    },
};