const fetch = require('node-fetch');
const Discord = require("discord.js");

require('dotenv').config();

module.exports = {
    name: "diga",
    description: "Eu te recomendo um filme ou uma série :)",
    async execute(message, args) {
        //message.delete();
        let obj;
        if(args[0] > 3){
            message.chanel.send('Danouse, irmão. Até 3 eu até dou, mas aí tu avacalhou.');
        }else{
            if(args[1].match('filme')){
                obj = await digaFilme();
            }else if(args[1].match('serie')){
                obj = await digaSerie();
            }else{
                message.channel.send(`Tu quer que eu te indique ${args[1]} mesmo?`
                + ` Eu só sei de Filme ou série.`);
            }
        }
        

        await message.channel.send(await criarEmbed(obj))
        .catch((err) => console.log(err));
        //message.channel.send(`Que tal assistir ${filme.title}?\nAqui está uma descrição: ${filme.overview}\n`);
    },
};

async function digaFilme(){
    let URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${Math.floor(Math.random() * 500)}`;
    
    let response = await (fetch(URL, { method: 'get' }));
    let dados = await response.json();
    
    ({title, release_date, overview, poster_path } = dados.results.sample());
    
    let filme = {
        title,
        release_date,
        overview,
        poster_path
    }

    return filme;
}

async function digaSerie(){
    let URL = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${Math.floor(Math.random() * 500)}`;
    
    let response = await (fetch(URL, { method: 'get' }));
    let dados = await response.json();
    
    let {name : title, first_air_date : release_date, overview, poster_path } = dados.results.sample();
    
    let serie = {
        title,
        release_date,
        overview,
        poster_path
    }

    return serie;
}

function criarEmbed(obj){
    let embed = new Discord.MessageEmbed()
        .setTitle(`Nome: ${obj.title} (${obj.release_date.split('-')[0]})`)
        .setColor("#0099ff")
        .setThumbnail(`https://image.tmdb.org/t/p/w500/${obj.poster_path}`);
    if(obj.overview != ''){
        embed.addFields({
            name: "Descrição:",
            value:
                obj.overview
        })
    }
    return embed;
}


Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
}