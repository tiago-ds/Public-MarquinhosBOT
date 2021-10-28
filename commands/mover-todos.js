module.exports = {
    name: "mover-todos",
    description: "Eu arrasto TODO MUNDO pra outro canal :O",
    async execute(message, args) {
        if(message.member.hasPermission('MOVE_MEMBERS')){
            let newChannelName = args.join(' ');

            let voiceChannel = message.member.voice.channel;
            if(!voiceChannel){
                await message.channel.send("Mas tu nem tá num canal de voz vei :(");
                return;
            }

            let newVoiceChannel = message.guild.channels.cache.filter(c => c.name === newChannelName).first();
            if(!newVoiceChannel){
                await message.channel.send("Esse canal aí não existe.");
                return;
            }
            
            let activeUsers = voiceChannel.members.array();
            for(x = 0; x < activeUsers.length; x++){
                try {
                    activeUsers[x].voice.setChannel(newVoiceChannel);
                } catch (error) {
                    console.log(`Não foi possível mover ${activeUsers[x].user.username}.`);
                    continue;
                }
            }
        }
        else{
            await message.channel.send("Esse aqui é só pra admin. Foi mal.");
        }
    }
};