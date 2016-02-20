define(function (require, exports, module) {
	var logger = require('server/logger.js');
	var twitter_client = require('server/twitter.js');
	var Promise = require('bluebird');
	var Q = require('q');

	function retweet(tweet) {

		var Twitter = twitter_client.get_client();
		try {
			var deferred = Q.defer();
			var insert_tweet = require('app/repositories/tweets/insert_one.js');
			logger.info('Attempting to retweet: %j', tweet.id_str);

			var searchParams = {
				id: tweet.id,
			};

			Twitter.post('statuses/retweet/', searchParams, function (error, tweets, response) {
				if (error) {
					// logger.error(error);
					// {"0":{"code":144,"message":"No status found with that ID."},"level":"error","message":"","timestamp":"2016-02-16T10:49:21.095Z"}
					logger.error('Twitter error code: %j , message: %j', error[0]['code'], error[0]['message']);
					deferred.reject(new Error('Failed to retweet tweet: ' + tweet.id + ' ' + error[0]['message']));
				} else {
					logger.info('Attempt to retweet: %j', tweet.id_str, ' succeeded!');
					deferred.resolve(insert_tweet({
						tweet_id: tweet.id,
						user_id: tweet.user.id,
						tweet_text: tweet.text,
						favourited: false
					}));
				}
			});

			return deferred.promise;

		} catch (error) {
			Promise.reject('Failed to retweet post or write it to db');
			// TODO deal with it. limit reached...?
		}
	}

	module.exports = retweet;
});
