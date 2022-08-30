//libraries//
const http = require('http');
const https = require('https');
const fs = require('fs');
const URL = require('url')

const port = 3000
//const credentials = require('./auth/credentials.json');


//let search = require('./spotify_search.js');
//let authReq = require('./authRequest.js');
let authentication_cache = './auth/authentication-res.json';

// create server this way
const server = http.createServer();

server.on("request", connectionHandler);

//connectionHandler
function connectionHandler(req, res){
  console.log('New request for '${req.url}' from '${req.socket.remoteAddress});
  res.write('Hello World');
  res.end();
}

server.on("listening", listeningHandler);
server.listen(port); //port = 3000
//listeningHandler
function listeningHandler(){
  console.log('Listening on  port number + ${port}');
}


//request handler what to do with requestss
/*
const requestHandler = (request, response) => {
	console.log(request.url);
	
	if (request.url.startsWith('favicon', 1)) {
  		response.writeHead(404)
  		response.end()
  	}
  	if (request.url.startsWith('/album-art/')) {
  		const image_steam = fs.createReadStream(request.url, 'utf-8')
  		response.writeHead(200, {'content-type': 'image/jpeg' })
      	image_stream.pipe(response);
    	image_steam.on('error', function (err) {
      		console.log(err)
    		response.writeHead(404)
    		response.end();
    	});
  }
  if (request.url.startsWith('/search')) {
 		const q = URL.parse(request.url, true).query.q
 		console.log(q);
 		user_input = q;
 		check_for_cache(response);
  	}
  if (request.url === '/') {
  		const stream = fs.createReadStream('./html/search-form.html', 'utf-8')
  		response.writeHead(200, { 'content-type': 'text/html' });
  		stream.pipe(response);
  }
  
}

const check_for_cache = function(response){
	  let cache_valid = false
  if (fs.existsSync(authentication_cache)) {
    let cached_auth = require(authentication_cache);
    if (new Date(cached_auth.expiration) > Date.now()) {
      cache_valid = true
      console.log('there was already a cached token')
      search.search(cached_auth.access_token, user_input, response);
    } else {
      console.log('Token Expired')
  		authReq.authReq(response);
    }
  } 
  else if (!fs.existsSync(authentication_cache)) {
    	const auth_sent_time = new Date();
    	authReq.authReq(response);
    	cache_valid = true;
   }
}
*/


























