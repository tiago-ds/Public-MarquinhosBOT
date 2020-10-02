const { randomInt } = require('crypto');
const fetch = require('node-fetch');
const tmdb_key = '4d607ca745fa466f945f58c6a40e832'


module.exports = {
    name: "diga",
    description: "Eu te recomendo algo :)",
    execute(message, args) {
        type = args[1];
        if(args[1].match('filme')){
            let URL_TO_FETCH = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdb_key}d&language=en-US&sort_by=original_title.desc&include_adult=false&include_video=false&page=1`;
            fetch(URL_TO_FETCH, { 
                method: 'get'
            }).then(
                function(response){
                    response.json().then(function(data){
                        console.log(data);
                    });
                }
            ).catch(function(err){
                console.log(err);
            });
        }
    },
};
