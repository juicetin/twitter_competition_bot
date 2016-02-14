define (function (require, exports, module) {
	var logger = require('server/logger.js');
	var db = require('server/db.js');
	function favourite_tweet(fav_options) {
		var knex = db.get_knex();

		var query_options = {
		};

		if (typeof fav_options.tweet_id === 'number') {
			query_options.tweet_id = fav_options.tweet_id;
		}

		return knex('tweets')
			.where(query_options)
			.update({
				favourited: true
			});
	}

	module.exports = favourite_tweet;
});
