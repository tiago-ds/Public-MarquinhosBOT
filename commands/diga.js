const fetch = require('node-fetch');
const Discord = require("discord.js");

require('dotenv').config();

module.exports = {
    name: "diga",
    description: "Eu te recomendo um filme ou uma série :)",
    usage: " <1 a 3> <series ou filmes>",
    async execute(message, args) {
        //message.delete();
        let obj;
        if(isNaN(args[0]) || (args[0] > 3 || (args[0] <= 0))){
            message.channel.send('Danousse, irmão. Até 3 eu até dou, mas aí tu avacalhou.');
        }else{
            if(args[1].match('filme')){
                obj = await digaFilme(Math.floor(args[0]));
            }else if(args[1].match('serie')){
                obj = await digaSerie(Math.floor(args[0]));
            }else{
                message.channel.send(`Tu quer que eu te indique ${args[1]} mesmo?`
                + ` Eu só sei de filme ou série.`);
            }
        }
        for(x = 0; x < obj.length; x++){
            if(obj[x].title != ''){
                await message.channel.send(await criarEmbed(obj[x]))
                .catch((err) => console.log(err));
            }else{
                await message.channel.send("Deu algo errado aí. Tenta de novo, eu acho.");
            }
        }
        //message.channel.send(`Que tal assistir ${filme.title}?\nAqui está uma descrição: ${filme.overview}\n`);
    },
};

async function digaFilme(amt){
    let URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${Math.floor(Math.random() * 500)}`;
    
    let response = await (fetch(URL, { method: 'get' }));
    let dados = await response.json();
    
    filmes = [];

    for(x = 0; x < amt; x++){
        ({title, release_date, overview, poster_path } = dados.results.sample());
    
        let filme = {
            title,
            release_date,
            overview,
            poster_path
        }
        
        filmes.push(filme);

    }
    return filmes;
}

async function digaSerie(amt){
    let URL = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${Math.floor(Math.random() * 500)}`;
    
    let response = await (fetch(URL, { method: 'get' }));
    let dados = await response.json();
    
    let series = [];

    for(x = 0; x < amt; x++){
        let {name : title, first_air_date : release_date, overview, poster_path } = dados.results.sample();
    
        let serie = {
            title,
            release_date,
            overview,
            poster_path
        }

        series.push(serie);
    }
    return series;
}

function criarEmbed(obj){
    let titulo = `Nome: ${obj.title}`;
    if(obj.release_date)
        titulo += `(${obj.release_date.split('-')[0]})`;
    let embed = new Discord.MessageEmbed()
        .setTitle(titulo)
        .setColor("#0099ff")
        .setThumbnail(`https://image.tmdb.org/t/p/w500/${obj.poster_path}`);
    if(obj.overview != ''){
        embed.addFields({
            name: "Descrição:",
            value:
                obj.overview
        });
    }
    return embed;
}


Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
}