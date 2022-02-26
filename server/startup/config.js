const config = require('config');

module.exports = function() {
  console.log("startup",config.get('jwtPrivateKey'))
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }
}