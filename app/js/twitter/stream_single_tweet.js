define(function(require, exports, module) {

	var Stream = module.exports;
	var CONSTANTS = require('app/constants');
	var logger = require('server/logger');
	var twitter_client = require('server/twitter');
	var string_utils = require('app/js/string_utils');

	var search_tweets_by_str = require('app/js/twitter/search_tweets');
	var retweet_tweets = require('app/js/twitter/retweet_tweets');	// Returns promise
	var follow_user = require('app/js/twitter/follow_user'); // Returns Promise
	var favourite_tweet = require('app/js/twitter/favourite_tweet'); // Returns promise
	var tweet_is_original = require('app/js/tweet_is_original');

	var streamSingleTweet = Stream.streamSingleTweet = function (tweet) {
		var id_str = tweet.id_str;
		if (typeof id_str === "undefined") { return; }

		var tweet_text = tweet.text;
		logger.info(tweet_text);

		// Check if any unwanted words are in the tweet, and skip tweet if so
		var exist_unwanted_words = string_utils.target_words_in_string(CONSTANTS.unwanted_keywords, tweet_text);
		if (exist_unwanted_words === true) { return; }

		// future TODO do document matrix comparison from ~300 most recent tweets, don't waste
		// the following search on a tweet that's 80%+ similar to an existing retweet

		// Filter out copied tweets - random guess here
		if (tweet_is_original(tweet) === true) {

			// Strip 'copied' down tweet to a bare minimum (extremely rough here), chance for regex :muscle:
			var new_tweet_text = string_utils.strip_copied_tweets(tweet_text);

			// Search tweets based on 'fixed' tweet string, but skip tweet if search fails
			var searched_tweets = search_tweets_by_str(new_tweet_text);
			if (typeof searched_tweets === 'undefined') { return };

			// Check all results of tweet search for potential retweets
			searched_tweets.forEach(function(s_tweet) {
				if (typeof s_tweet.id_str !== 'undefined' && s_tweet.favorite_count > 2) {
					retweet_tweets(s_tweet);
				}
			});

		} else {

			// Directly retweet original competition tweets based on 'metric' to determine original
			retweet_tweets(tweet);
		}
	}
});

