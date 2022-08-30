const fs = require('fs');

const authentication_cache = './auth/authentication-res.json';

const create_acess_token_cache = function (spotify_auth) {
    fs.writeFile(authentication_cache, JSON.stringify(spotify_auth), (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('cache created')
      }
    })
  }

  module.exports.cache = create_acess_token_cache;