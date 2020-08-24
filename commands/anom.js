module.exports = {
    name: "anom",
    description: "Envio uma mensagem pra um canal, de forma anônima ;P",
    usage: "!anom <nome do canal> <mensagem>",
    execute(message, args) {
        args = messageHandler(args);
        canal = message.guild.channels.cache.filter(channel => channel.name === args[0]).first();
        if(!canal){
            message.channel.send("Desculpe, não consegui achar esse canal! :(");
            return;
        }
        message.delete();
        canal.send(`Alguém disse: "${args[1]}"`);
        
    },

};

/* Gets the args array and returns it with 2 indexes:
 * args[0], that has the channel name and args[1], 
 * that has the message
 */
function messageHandler(args){
    let temp = [];
    temp.push(args[0]);
    args.shift();
    temp.push(args.join(" "));

    return temp;
}