define(function (require, exports, module) {
	var winston = require('winston');
	var Promise = require('bluebird');
	var db = require('server/db.js');
	var twitter_client = require('server/twitter.js');

	var Stream = require('app/js/twitter/stream_single_tweet.js');

	var Twitter;

	/*
	 *	Starts the service
	 */
	var start = function() {
		twitter_client.connect();
		Twitter = twitter_client.get_client();
		db.connect();

		/*
		 *	Twitter stream
		 */
		Twitter.stream('statuses/filter', {track: 'RT win'}, function(stream) {

			/*
			 *	Error functionality
			 */
			stream.on('error', function (error) {
				winston.error(error);
			});

			/*
			 *	Upon receiving a tweet
			 */
			stream.on('data', function (tweet) {
				Stream.streamSingleTweet(tweet);
			});
		});

		return Promise.resolve();
	}

	module.exports.start = start;
});

