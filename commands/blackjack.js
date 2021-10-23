const Discord = require("discord.js");
module.exports = {
    name: "bj",
    description: "Começo uma partida do clássico blackjack 21 contigo.",
    usage: "!blackjack quantidade",
    async execute(message, args) {
        var amt = args[0];
        const gameEmbed = new Discord.MessageEmbed()
                .setColor("#0099ff")
                .setTitle("BlackJack Game")
                .setDescription(`${amt} Quinhões`)
                .addField('\u200B','\u200B')
                .setThumbnail(message.member.user.displayAvatarURL());

            let msgRef = await message.channel.send(gameEmbed);
            await msgRef.react("☝️");
            await msgRef.react("✌️");
            await msgRef.react("✋");
            
            let game = new BlackjackGame(amt, message.member, msgRef, gameEmbed);

            const reactionCollector = new Discord.ReactionCollector(
                msgRef,
                (newReaction, user) => !user.bot && 
                    user.id === game.player.id && 
                        (newReaction.emoji.name === "☝️" ||
                            newReaction.emoji.name === "✌️" ||
                                newReaction.emoji.name === "✋"),
                { time: 60000 }
            );

            reactionCollector.on("collect", async (newReaction, user) => {
                newReaction.users.remove(user.id);
                if (newReaction.emoji.name === "☝️") {
                    //message.channel.send("Hit");
                    game.hit();
                } else if (newReaction.emoji.name === "✌️") {
                    //message.channel.send("Double Down");
                    game.doubleDown();
                } else if (newReaction.emoji.name === "✋") {
                    //message.channel.send("Stand");
                    game.stand();
                }
            });
    
            reactionCollector.on("end", async (newReaction, user) => {
                message.delete();
                msgRef.delete();
            });

            
    },

};

class BlackjackGame{
    constructor(amt, player, msgRef, embedRef){
        this.emojis = {'Clubs': '♣️', 
                       'Hearts': '♥️', 
                       'Spades': '♠️', 
                       'Diamonds': '♦️'
                    };

        this.deck = [
                    'AClubs', '2Clubs', '3Clubs', '4Clubs', '5Clubs', '6Clubs', 
                    '7Clubs', '8Clubs', '9Clubs', '10Clubs', 'JClubs', 'QClubs', 
                    'KClubs', 'ADiamonds', '2Diamonds', '3Diamonds', '4Diamonds',
                    '5Diamonds', '6Diamonds', '7Diamonds', '8Diamonds', '9Diamonds',
                    '10Diamonds', 'JDiamonds', 'QDiamonds', 'KDiamonds', 'AHearts',
                    '2Hearts', '3Hearts', '4Hearts', '5Hearts', '6Hearts', '7Hearts',
                    '8Hearts', '9Hearts', '10Hearts', 'JHearts', 'QHearts', 'KHearts',
                    'ASpades', '2Spades', '3Spades', '4Spades', '5Spades', '6Spades',
                    '7Spades', '8Spades', '9Spades', '10Spades', 'JSpades', 'QSpades',
                    'KSpades'
                    ];
        this.amt = amt;
        this.player = player;

        this.player_cards = [];
        this.dealer_cards = [];

        this.finished = false;

        this.msgRef = msgRef;

        this.embedRef = embedRef;

        this.startGame();
    }

    async startGame(){
        this.dealer_cards.push(this.pickCard());
        this.player_cards.push(this.pickCard());
        this.dealer_cards.push(this.pickCard());
        this.player_cards.push(this.pickCard());
        this.renderTable();
    }

    hit(){
        if(!this.finished){
            this.player_cards.push(this.pickCard());
            this.renderTable();
        }
        if(this.calculateQuant(this.player_cards) >= 21){
            this.finished = true;
            this.renderTable();
            this.dealerTurn();
        }
    }

    stand(){
        this.finished = true;
        this.dealerTurn();
    }

    doubleDown(){
        this.player_cards.push(this.pickCard());
        this.player_cards.push(this.pickCard());
        this.finished = true;
        this.amt*=2;
        this.embedRef.setDescription(`${this.amt} Quinhões`);
        this.msgRef.edit(this.embedRef);
        this.renderTable();
        this.dealerTurn();
    }

    dealerTurn(){
        if(!this.finished)
            return;

        while(this.calculateQuant(this.dealer_cards) <= 16){
            this.dealer_cards.push(this.pickCard());
            this.renderTable();
        }
        this.finishGame();
    }

    pickCard(){
        let pos = Math.floor(Math.random()*this.deck.length);
        return this.deck.splice(pos, 1)[0];
    }

    // Here we calculate the sum of all points of the given cards.
    // We considerate the Aces' values of the cards as 1 or 10, 
    // depending of the best(?) final sum.
    calculateQuant(cards){
        // We have to use this to copy the cards array, so that we don't  use the 
        // reference to the actual cards array and edit the visualization.
        let aux = [...cards];
        // Remove the Aces and transform them into 'A'
        let aces = ['AClubs', 'ADiamonds', 'AHearts', 'ASpades'];

        aux = swapCards(aces, aux, 'A');

        // Remove the 10s and transform them into 'T'
        // This is simplifying the code for the future.
        // When we access the array, we use just the first position of the string,
        // so its easier to do this, since 10 its two digits instead of one.
        let tens = ['10Clubs', '10Diamonds', '10Hearts', '10Spades'];

        aux = swapCards(tens, aux, 'T');

        // Remove all that is not a number (but is not 'A') (those have special treatment)
        aux = aux.map((e) => (isNaN(parseInt(e[0])) && e != 'A') ? 10:e[0]);

        // Make a new array that doesn't have Aces
        let aux2 = aux.filter(e => e != 'A');

        let n = aux.length - aux2.length;

        // We push 10 or 1 to the array many times, equivalent to the number of Aces removed  
        for(let x = 0; x < n; x++){
            if(this.sum(aux2) + 11 > 21){
                aux2.push(1);
            }else{
                aux2.push(11);
            }
        }

        return this.sum(aux2);
    }

    // This just returns the simplified sum of the cards Array, after we 
    // took out the Aces
    sum(cards){
        return cards.reduce((a , b) => parseInt(a) + parseInt(b), 0);
    }

    // This function creates a visual representation of a given set of cards
    // that could be either the player's cards or the dealer's.
    renderCards(cards){
        // the string that will represent the cards for both players
        let str = '';
        // an Array to simplify the comparison of the code
        let tens = ['10Clubs', '10Diamonds', '10Hearts', '10Spades'];
        // Now, for each card of the player, we add to the string its value and its suit.
        for(const c of cards){
            let card;
            // We consider if the card can be a 10, that has two characters instead of one
            if(tens.includes(c))
                card = `${c.substring(0, 2)}${this.emojis[c.substring(2,c.length)]}`;    
            else
                card = `${c.substring(0, 1)}${this.emojis[c.substring(1,c.length)]}`;
            str += ` ${card}`;
        }
        return str;
    }
    // We edit the Embed, rendering the game for both dealer's and player's cards
    renderTable(){
        // To simplify the code, we set the game's embed with no fields
        this.embedRef.fields = [];
        // And then add a new field for each set of cards

        // Player's cards
        this.embedRef.addField('\u200B','\u200B')
        .addField(this.player.displayName.toUpperCase(), this.renderCards(this.player_cards),true)
        .addField('\u200B','\u200B', true)
        .addField(`TOTAL`, `${this.calculateQuant(this.player_cards)}`, true)
        // Separator
        .addField('\u200B', '\u200B', false)
        // Dealer's Cards
        .addField('DEALER', this.renderCards(this.dealer_cards), true)
        .addField('\u200B','\u200B', true)
        .addField(`TOTAL`, `${this.calculateQuant(this.dealer_cards)}`, true)

        // Finally, the embed is eddited with the new fields
        this.msgRef.edit(this.embedRef); 
    }

    finishGame(){
        let playerPoints = this.calculateQuant(this.player_cards);
        let dealerPoints = this.calculateQuant(this.dealer_cards);
        if(!this.finished)
            return;
        // Player wins
        if(playerPoints > dealerPoints && playerPoints <= 21 || playerPoints <= 21 && dealerPoints > 21){
            this.embedRef.addField("Vencedor!", `${this.player.displayName} ganhou ${this.amt} Quinhões!`);
        }
        // Draw
        else if(playerPoints == dealerPoints){
            this.embedRef.addField("Empatou!", `${this.player.displayName} leva ${this.amt} Quinhões!`);
        }
        // Player loses
        else{
            this.embedRef.addField("O dealer ganhou! :(", `${this.player.displayName} perdeu ${this.amt} Quinhões.`);
        }
        this.msgRef.edit(this.embedRef);
    }
}

function swapCards(swapped, cards, letter){
    let aux = cards.map((e) => {
        if(swapped.includes(e)){
            return letter;
        }
        return e;
    });

    return aux;
}