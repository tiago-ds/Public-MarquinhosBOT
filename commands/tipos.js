const fetch = require('node-fetch');
const Discord = require("discord.js");

module.exports = {
    name: "poke-game",
    description: "Tu manja de pokémon?",
    usage: "!poke-game quantidade",
    async execute(message, args) {
        var amt = args[0];
        const gameEmbed = new Discord.MessageEmbed()
                .setColor("#0099ff")
                .setTitle("Guess the type!")
                .addField('\u200B','\u200B');

            let msgRef = await message.channel.send(gameEmbed);
            
            let game = new PokeTypesGame(amt, message.member, msgRef, gameEmbed);

            await game.setEmbed();

            await msgRef.react("1️⃣");
            await msgRef.react("2️⃣");
            await msgRef.react("3️⃣");
            await msgRef.react("4️⃣");

            const reactionCollector = new Discord.ReactionCollector(
                msgRef,
                (newReaction, user) => !user.bot && 
                    user.id === game.player.id && 
                        (newReaction.emoji.name === "1️⃣" ||
                            newReaction.emoji.name === "2️⃣" ||
                                newReaction.emoji.name === "3️⃣" ||
                                    newReaction.emoji.name === "4️⃣"),
                { time: 60000 }
            );

            reactionCollector.on("collect", async (newReaction, user) => {
                newReaction.users.remove(user.id);
                if (newReaction.emoji.name === "1️⃣") {
                    //message.channel.send("Hit");
                    game.checkAnswer(1);
                } else if (newReaction.emoji.name === "2️⃣") {
                    game.checkAnswer(2);
                } else if (newReaction.emoji.name === "3️⃣") {
                    //message.channel.send("Stand");
                    game.checkAnswer(3);
                } else if (newReaction.emoji.name === "4️⃣") {
                    //message.channel.send("Stand");
                    game.checkAnswer(4);
                }
            });
    
            reactionCollector.on("end", async (newReaction, user) => {
                message.delete();
                msgRef.delete();
            });

            
    },

};

class PokeTypesGame{
    constructor(amt, player, msgRef, embedRef){
        this.amt = amt;
        this.player = player;
        this.msgRef = msgRef;
        this.embedRef = embedRef;

        // All types existing, in gen 3
        this.types = ['bug', 'dragon', 'electric', 'fighting', 'fire', 'flying', 'ghost', 'grass', 'ground', 
        'ice', 'normal', 'poison', 'psychic', 'rock', 'water', 'steel', 'dark'];

        // The chosen pokemon number in pokedex
        this.pkmn = Math.floor(Math.random() * 386) + 1;

        // Complete URL
        this.URLRequest = `https://pokeapi.co/api/v2/pokemon/${this.pkmn}`;

        // Base URL for sprite
        this.baseSpriteURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

        this.correct_answers = [];
    }

    // Sets the title of the embed for the pokemon selected
    async setEmbed(){
        const info = await this.generateInfo();

        this.correct_answers = [info.answers];

        this.embedRef.setDescription(info.question);
        this.embedRef.addFields(
            {name: "1️⃣", value: info.options[0], inline: true },
            {name: "2️⃣", value: info.options[1], inline: true },
            {name: '\u200B', value: '\u200B'},
            {name: "3️⃣", value: info.options[2], inline: true },
            {name: "4️⃣", value: info.options[3], inline: true },
        );
        this.embedRef.setThumbnail(info.img);
        this.msgRef.edit(this.embedRef);
    }

    async generateInfo(){
        // Data of chosen pokemon
        let data = await this.getData();

        // Array que vai guardar as 4 alternativas
        let alternativas = [];

        // Array dos tipos do pokémon sorteado
        let tipos = data.types.map( (t) => t.type.name );

        // Jogar os tipos do pokémon sorteado nas alternativas
        for(const p of tipos){
            alternativas.push(p);
        }

        // Um loop pra preencher o array de alternativas
        while(alternativas.length != 4){
            var type = Math.floor(Math.random() * this.types.length);
            if(!alternativas.includes(this.types[type])){
                alternativas.push(this.types[type]);
            }
        }

        // O array de alternativas, embaralhado
        alternativas = this.shuffle(alternativas);
        
        let correct_answers = [];

        console.log(tipos, alternativas);
        for(let x = 0; x < tipos.length; x++){
            console.log(tipos[x]);
            correct_answers.push(alternativas.indexOf(tipos[x]));
        }
        console.log(correct_answers);

        return {
            question: `Selecione um tipo de ${this.capitalize(data.name)}`,
            options: alternativas,
            img: `${this.baseSpriteURL}${this.pkmn}.png`,
            answers: correct_answers,
        };
    }

    // The URL Request
    async getData(){
        let response = await (fetch(this.URLRequest, { method: 'get' }));
        let data = await response.json();
        
        return data;
    }

    // Check if answer is the correct one
    checkAnswer(ans){
        if(this.correct_answers.includes(ans)){
            console.log("OK");
        }else{
            console.log("NOT OK");
        }
    }

    // A simple shuffle array method
    shuffle(array) {
        var m = array.length;

        while (m) {

            let i = Math.floor(Math.random() * m--);

            let temp = array[m];
            array[m] = array[i];
            array[i] = temp;
        }
    
        return array;
    }

    // Just to prettify it
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
