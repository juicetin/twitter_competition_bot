define(function(require, exports, module) {

	var Stream = module.exports;
	var CONSTANTS = require('app/constants.js');
	var logger = require('server/logger.js');
	var twitter_client = require('server/twitter.js');
	var string_utils = require('app/js/string_utils.js');
	var moment = require('moment');

	// TODO remove - not used here
	// var follow_user = require('app/js/twitter/follow_user.js'); // Returns Promise
	// var favourite_tweet = require('app/js/twitter/favourite_tweet.js'); // Returns promise

	var search_tweets_by_str = require('app/js/twitter/search_tweets.js'); // Returns promise
	var retweet_tweets = require('app/js/twitter/retweet_tweets.js');	// Returns promise
	var check_search_limit = require('app/js/twitter/check_search_limit.js');
	var tweet_is_original = require('app/js/twitter/tweet_is_original.js');

	var seconds_in_rate_limit_period = 15 * 60;
	var safe_search_rate = seconds_in_rate_limit_period / 180;
	var cur_time = moment();

	var streamSingleTweet = Stream.streamSingleTweet = function (tweet) {

		var id_str = tweet.id_str;
		if (typeof id_str === "undefined") { return; }

		var tweet_text = tweet.text;

		// Check if any unwanted words are in the tweet, and skip tweet if so
		var exist_unwanted_words = string_utils.target_words_in_string(CONSTANTS.unwanted_keywords, tweet_text);
		if (exist_unwanted_words === true) { return; }

		// future TODO do document matrix comparison from ~300 most recent tweets, don't waste
		// the following search on a tweet that's 80%+ similar to an existing retweet

		// When tweet is the original and not a copied rewteet/retweet/etc.
		if (tweet_is_original(tweet) === true) {
			logger.info('Original tweet');
			// Promise returned here/function exited
			return retweet_tweets(tweet);
		}

		/**************** Otherwise, try and find the original ****************/

 		// Check if enough time has passed since last search
 		var elapsed_since_search = moment(moment()).diff(cur_time);
 		var d = moment.duration(elapsed_since_search);
 		var seconds_elapsed_since_search = d.seconds();
 		if (seconds_elapsed_since_search < safe_search_rate) {
 			return Promise.resolve();
 		} else {
 			cur_time = moment();
 		}
 
// 		// TODO fix use of the application/ratelimit endpoint here - this itself is rate limited
// 		// var remaining_tweet_searches = check_search_limit();
// 		// console.log(remaining_tweet_searches);
// 		// if (remaining_tweet_searches === 0) { return };
// 
 		// Strip 'copied' down tweet to a bare minimum (extremely rough here), chance for regex :muscle:
 		var new_tweet_text = string_utils.strip_copied_tweets(tweet_text);
 		if (typeof new_tweet_text === 'undefined') {
 			logger.error('GOT UNDEFINED BY STRIPPING ORIGINAL STRING: ', tweet_text);
 			return Promise.resolve();
 		}

 		// Search tweets based on 'fixed' tweet string, but skip tweet if search fails
 		return search_tweets_by_str(new_tweet_text).then(function (searched_tweets) {
 
 		 	if (typeof searched_tweets === 'undefined') { 
 		 		// logger.info('%j original tweet produced a stripped tweet of `undefined`', tweet_text);
 		 		return Promise.resolve();
 		 	}
 
 		 	// Check all results of tweet search for potential retweets
 		 	logger.info('About to process %d', searched_tweets.length, ' tweets', {});
			return Promise.each(searched_tweets, function (s_tweet) {
				if (typeof s_tweet.id_str !== 'undefined' && s_tweet.favorite_count > 2) {
					return retweet_tweets(s_tweet);
				}
			});
		})
		.catch(function (error) {
			logger.error('Stream single tweet error: %j', error);
		});
	}
});

