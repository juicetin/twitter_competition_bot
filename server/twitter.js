define(function (require, exports, module) {
	var twitter_manager = exports;
	var twitter_lib = require('twitter');
	var Twitter;
	var config = require('server/config.js');
	twitter_manager.connect = function() {
		Twitter = new twitter_lib(config.tw_auth);
	}

	twitter_manager.get_client = function() {
		return Twitter;
	}
});
