// Sets 'Access-Control-Allow-Origin' CORS header to allow whitelisted
// domains to access API.

// var config = require('../config');

//var whitelist = config.app.allowedOrigins || 'http://127.0.0.1';
var whitelist = ['http://127.0.0.1'];

module.exports = {
	origin: function(origin, callback){
		var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
		callback(null, originIsWhitelisted);
	}
};
