define(function (require, exports, module) {
	var winston = require('winston');
	var Promise = require('bluebird');
	var db = require('server/db.js');

	// var knex = require('knex')({
	// 	client: 'pg',
	// 	connection: {
	// 		host: process.env.PG_HOST,
	// 		user: process.env.PG_USER,
	// 		password: process.env.PG_PASS,
	// 		database: process.env.PG_DB
	// 	}
	// });

	var Stream = require('src/js/stream.js');

	var Twitter;

	/*
	 *	Starts the service
	 */
	var start = function() {
		require('server/twitter.js').connect();
		Twitter = require('server/twitter.js').get_client();
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

