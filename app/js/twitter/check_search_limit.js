define(function (require, exports, module) {
	var logger = require('server/logger.js');
	var twitter_client = require('server/twitter.js');
	var moment = require('moment');

	/*
	 *	Check remaining searches for current rate limit window
	 */
	function check_search_limit() {
		var Twitter = twitter_client.get_client();
		var remaining_tweet_searches;
		try {
			var utc_epoch_reset_time;

			// TODO this has a rate limit too - need to 'write' this time to database,
			// 	and then retrieve it to figure out when to try searching again
			Twitter.get('application/rate_limit_status', function (error, tweets, response) {
				console.log('tweets', tweets);
				remaining_tweet_searches = tweets.resources.search["/search/tweets"].remaining;
				utc_epoch_reset_time = tweets.resources.search["/search/tweets"].reset;
				logger.info('Remaining tweet searches left: %j', remaining_tweet_searches, {});

				if (remaining_tweet_searches === 0) {
					var now = moment();
					var reset = moment(utc_epoch_reset_time);
					// var left_to_reset = reset.diff(now).format("HH:mm:ss");
					// logger.info('No searches left for another ', left_to_reset, {});
				}

			});
		} catch(error) { }
		finally {
			return remaining_tweet_searches;
		}
	}

	module.exports = check_search_limit;
});
