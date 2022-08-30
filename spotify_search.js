const querystring = require('querystring'); 
const https = require('https');
const http = require('http');
const fs = require("fs");
const URL = require('url');

let auth_sent_time = new Date();
let uri='';
let body = '';
let max_length = 0;
let image_data = Array();

const search = function(spotify_auth, user_input, response){
	const uri = querystring.stringify({
    	q: user_input,
    	type: 'album'
  	});

	let options = {
		'method': 'GET',
		'headers': {
			'Authorization': `Bearer ${spotify_auth}`
  		},
  		json:true
	};

	let search_endpoint = `https://api.spotify.com/v1/search?${uri}`;
	let req = https.request(search_endpoint, options, function (response1) {

		console.log("This is a get request for search.");
  		let body = "";
		response1.on('data', function (chunk) {
    		body+=chunk;
  		});
		response1.on('error', function (e) {
  			console.log(e.constructor);
  			return e.stack;
  		});
  		response1.on("end", function () {
  			let data = JSON.parse(body);
    		max_length = Object.keys(data.albums.items).length;
    		
    		for(let i = 0; i< max_length; i++){
    			let  albumers = data.albums.items[i].images[0].url;
    			display_albums(albumers,user_input,response, i);
    		}
    		
  		});
  	});
  	req.on('error', function(e){
  		console.log(e);
  	});
  	req.end();
}

  	let img_path = './album-art/';
  	
  	let image_counter = 0;
		const display_albums = function(data, user_input, response, downloaded_images){
				let image_req = https.get(data, function(image_res){
				console.log("This is the get request for images from Spotify's library.")
				let name = data.substring(24);
				let new_img = fs.createWriteStream(`${img_path}${name}.jpeg`,{'encoding':null});
					image_res.pipe(new_img);
					image_data[downloaded_images] = new_img.path;
				new_img.on("finish", function(){
					image_counter++;
					if(image_counter == max_length){
						generate_webpage(image_data,response);
					}
				});
			});
			image_req.on('error', function(err){
				console.log(err);
			});
		}
		const generate_webpage = function(image_data, response){
			let map = ['<!DOCTYPE html>', '<html>', '<head>', '<h1>', 'Search Results : ', user_input, '</h1>', '<style>*{font-size: 36pt;}</style>', '</head><body>'];
			for(let j = 0 ; j< image_data.length ; j++){
				map.push('<img src = "'+ image_data[j] + '"/>');
			}
			map.push('</body>');
			map.push('</html>');
			let results = fs.writeFile('./album-request.html', map.join('') , (err)=>{
			if(err){
				console.log(err);
			}else{
				response.end(results);
				console.log("web page file was created under the file name album-request,html");
			}
			});

		}
		 IS NOT WORKING :(
module.exports.search = search; 
  
  