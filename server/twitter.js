define(function (require, exports, module) {
	var logger = require('server/logger.js');
	var twitter_manager = exports;
	var twitter_lib = require('twitter');
	var Twitter;
	var config = require('server/config.js');
	twitter_manager.connect = function() {
		logger.info('Connecting/authing with Twitter...');
		logger.info('Using auth details: ', config.tw_auth, {});
		Twitter = new twitter_lib(config.tw_auth);
		logger.info('Successfully connected to twitter!');
	}

	twitter_manager.get_client = function() {
		return Twitter;
	}
});
