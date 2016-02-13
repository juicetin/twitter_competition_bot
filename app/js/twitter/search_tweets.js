define(function (require, exports, module) {

	var winston = require('winston');
	var Twitter;

	/*
	 *	Search
	 */
	 function search_tweets_by_str(search_string) {
		Twitter = require('server/twitter.js').get_client();
		try {

			var searchParams = {
				q: search_string,
				lang: 'en',
				count: 30,
				retweeted: false
			};

			Twitter.get('search/tweets', searchParams, function (error, tweets, response) {
				if (error) {
					winston.error(error);
				}
				return tweets.statuses;
			});

		} catch (error) {
			winston.error(error);
			// TODO keep track of time here
			// 		once 3 minutes has elapsed, try searching again
			return undefined;
		}
	}

	 module.exports = search_tweets_by_str;
});
