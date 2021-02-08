const fetch = require("node-fetch");
fs = require("fs");
var Headers = fetch.Headers;
playlist_id = "37i9dQZEVXbMXbN3EUUhlg";
const { clientId, clientSecret } = require("./config2.json");

var SpotifyWebApi = require("spotify-web-api-node");

var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

spotifyApi.clientCredentialsGrant().then(
  function(data) {
    spotifyApi.setAccessToken(data.body["access_token"]);
    spotifyApi.getPlaylist(playlist_id).then(
      function(data) {
        data.body.tracks.items.forEach(element => {
          artists = "";
          element.track.artists.forEach(artist => {
            artists += artist.name + ", ";
          });
          artists = artists.substring(0, artists.length - 2);
          console.log(element.track.name + " - " + artists);
        });
      },
      function(err) {
        console.log("Something went wrong!", err);
      }
    );
  },
  function(err) {
    console.log("Something went wrong when retrieving an access token", err);
  }
);
