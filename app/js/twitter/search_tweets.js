define(function (require, exports, module) {

	var logger = require('server/logger.js');
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

			logger.info('Searching with params: ', searchParams, {});
			Twitter.get('search/tweets', searchParams, function (error, tweets, response) {
				if (error) {
					logger.error('Twitter tweet search problem');
					logger.error('%j', error, {});

					// Search limit exceeded
					if (error[0].code == 88) {
						// process.exit();
					}
				}

				if (tweets.statuses) {
					logger.info('Found ', tweets.statuses.length, ' tweets', {});
					return tweets.statuses;
				}
				return undefined;
			});

		} catch (error) {
			logger.error('Twitter tweet search problem');
			logger.error(error);
			// TODO keep track of time here
			// 		once 3 minutes has elapsed, try searching again
			return undefined;
		}
	}

	 module.exports = search_tweets_by_str;
});
