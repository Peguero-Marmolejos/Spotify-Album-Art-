	
const http = require('http');
const https = require('https');
const querystring = require('querystring');

let search = require('./spotify_search.js');
let cacheCreator = require('./cache_creator.js');

const credentials = require('./auth/credentials.json');

const spotify_access_token_endpoint = 'https://accounts.spotify.com/api/token';
let user_input = '';
let body = '';

const auth_sent_time = new Date();


const post_data = querystring.stringify({
    client_id: credentials.client_id,
    client_secret: credentials.client_secret,
    grant_type: 'client_credentials'
  });
const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': post_data.length
    }
  }

const authentication_req = function (response){
	https.request(spotify_access_token_endpoint, options, function (authentication_res) {
		console.log("This is a post request for authorization token, and such.");
		received_authentication(authentication_res, user_input, auth_sent_time, response)
    }).on('error', function (e) {
      	console.error(e);
    }).end(post_data);
}

const received_authentication = function (authentication_res, user_input, auth_sent_time, response) {
	authentication_res.setEncoding('Utf-8')
    authentication_res.on('data', function (chunk) {
      body += chunk;
      console.log("This is body " + body);
    })
    authentication_res.on('end', function () {
      let spotify_auth = JSON.parse(body)
      console.log(spotify_auth)
      spotify_auth.expiration = auth_sent_time.getTime() + 3600000
      cacheCreator.cache(spotify_auth);
      //search.search(spotify_auth.access_token, user_input, response);
    })
  }

module.exports.authReq = authentication_req;