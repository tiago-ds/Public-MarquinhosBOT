const fetch = require('node-fetch');
const Discord = require("discord.js");

require('dotenv').config();

module.exports = {
    name: "diga",
    description: "Eu te recomendo algo :)",
    async execute(message, args) {
        //message.delete();
        let pedido = {
            qtd: args[0]
        }

        if(args[1].match('filme')){
            pedido.tipo = 'movie';
        }else if(args[1].match('serie')){
            pedido.tipo = 'tv';
        }

        let filme = await diga(pedido);

        await message.channel.send(criarEmbed(filme))
        .catch((err) => console.log(err));
        //message.channel.send(`Que tal assistir ${filme.title}?\nAqui está uma descrição: ${filme.overview}\n`);
    },
};

async function diga(pedido){
    let URL = `https://api.themoviedb.org/3/discover/${pedido.tipo}?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.asc&include_adult=false&include_video=false&page=${Math.floor(Math.random() * 20)}`;
    
    let response = await (fetch(URL, { method: 'get' }));
    let dados = await response.json();

    let {title, release_date, overview, poster_path } = dados.results.sample();
    
    let filme = {
        title,
        release_date,
        overview,
        poster_path
    }

    return filme;
}


Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
}

function criarEmbed(filme){
    let embed = new Discord.MessageEmbed()
        .setTitle(`Nome: ${filme.title} (${filme.release_date.split('-')[0]})`)
        .setColor("#0099ff")
        .setThumbnail(`https://image.tmdb.org/t/p/w500/${filme.poster_path}`)
        .addFields({
            name: "Descrição:",
            value:
                filme.overview
        });
    return embed;
}