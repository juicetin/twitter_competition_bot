define(function (require, exports, module) {

	var logger = require('server/logger.js');
	var Twitter;
	var moment = require('moment');
	var Promise = require('bluebird');

	// Could not get bluebird to work here for the life of me ==
	var Q = require('q');

	/*
	 *	Search
	 */
	 function search_tweets_by_str(search_string) {
		if (typeof search_string === 'undefined') {
			logger.info('Search string undefined, skipping search...');
			return Promise.resolve();
		}

		logger.info('Searching using string: ', search_string, {});
		var twitter_client = require('server/twitter.js');
		Twitter = twitter_client.get_client();
		var found_tweets;

		// Search parameters for Twitter's endpoint - filter
		// 	to only include non-retweeted tweets
		var searchParams = {
			q: search_string,
			lang: 'en',
			count: 500,
			retweeted: false
		};

		var deferred = Q.defer();
		Twitter.get('/search/tweets', searchParams, function (error, tweets, response) {
			if (error) {
				logger.error('Twitter tweet search problem %j', error, {});

				// Search limit exceeded TODO in future do something with this
				// if (error[0].code == 88) { }
			}

			// Extract search results if they exist
			if (tweets.statuses && tweets.statuses.length > 0) {
				logger.info('Found ', tweets.statuses.length, ' tweets', {});
				deferred.resolve(tweets.statuses);
			} else {
				logger.info('No tweets found for:', search_string);
				deferred.reject('No tweets found for: ', search_string);
			}

		});

		return deferred.promise;
	 }
	 module.exports = search_tweets_by_str;
});
