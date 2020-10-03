const fetch = require('node-fetch');
require('dotenv').config();

const tmdb_key = '4d607ca745fa466f945f58c6a40e832'


module.exports = {
    name: "diga",
    description: "Eu te recomendo algo :)",
    async execute(message, args) {
        message.delete();
        qtd = args[0];
        pedido = args[1];
        if(pedido.match('filme')){
            let URL_TO_FETCH = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`;
            fetch(URL_TO_FETCH, { 
                method: 'get'
            }).then(
                function(response){
                    response.json().then(function(data){
                        filme = data.results.sample();
                        console.log(filme);
                    });
                }
            ).catch(function(err){
                console.log(err);
            });
        }else if(pedido.match('serie')){

        }
    },
};

async function diga(qtd){
    let URL_TO_FETCH
}


Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
}