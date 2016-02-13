define(function(require, exports, module) {

	var Stream = module.exports;
	var CONSTANTS = require('app/constants.js');
	var winston = require('winston');
	var Search = require('app/js/search.js');
	var twitter_client = require('server/twitter.js');
	var string_utils = require('app/js/string_utils.js');

	var retweet = Stream.retweet = function (tweet) {
		var Twitter = twitter_client.get_client();
		try {
			Twitter.post('/statuses/retweet/' + tweet.id);
			// TODO write retweeted tweet to db!
		} catch (error) {
			// TODO deal with it. limit reached...?
		}
	}

	/*
	 * 	Follow a user after checking the tweet
	 */
	var follow_user = Stream.follow_user = function (tweet) {
		var tweet_text_lower = tweet_text.lower();
		if (false /* TODO any words in fav list, then enter! */) {

			// TODO Check whether follow limit (5000, it seems) is reached
			// 	if so, unfollow 500 people TODO tune this - too many may raise flags

			user_id = tweet.user.id;
			screen_id = tweet.user.screen_name;
			try {
				var Twitter = twitter_client.get_client();
				Twitter.post('/friendships/create/' + tweet.user.id);

				// Add the followed user to the follower table
				var insert_one_follower = require('app/repositories/following/insert_one.js');
				return insert_one_follower({user_id : tweet.user_id});
			} catch(error) {
				// TODO should only be connection errors here
			}
		}
	}

	// TODO
	/*
	 * Favorite a tweet
	 */
	var favorite_tweet = Stream.favorite_tweet = function (tweet) {
		var Twitter = twitter_client.get_client();
		var tweet_str = new String(tweet.text);
		tweet_str = tweet_str.toLowerCase();
		var to_fav = string_utils.target_words_in_string(fav_keywords, tweet_str);
		if (to_fav) {
			var tweet_id = tweet.id_str;
			try {
				Twitter.post('/favorites/create/' + tweet.id);
				//TODO mark tweet as 'favorited' to be stored as such in db
			} catch(error) {
				//TODO find a way to retry a few times if error isn't 'out of favs'
			}
		}
	}

	/*
	 *	'Algorithm' (hardly, at the moment) to determine whether tweet
	 *	 	is a copied retweet or original
	 */
	var is_original = Stream.is_original = function (tweet) {
		// TODO really need a better 'algorithm' here
		return tweet.favorite_count < CONSTANTS.fav_rt_threshold;
	}

	var streamSingleTweet = Stream.streamSingleTweet = function (tweet) {
		var id_str = tweet.id_str;
		if (typeof id_str === "undefined") { return; }

		var tweet_text = tweet.text;
		console.log(tweet_text);

		// Check if any unwanted words are in the tweet, and skip tweet if so
		var exist_unwanted_words = string_utils.target_words_in_string(CONSTANTS.unwanted_keywords, tweet_text);
		if (exist_unwanted_words === true) { return; }

		// future TODO do document matrix comparison from ~300 most recent tweets, don't waste
		// the following search on a tweet that's 80%+ similar to an existing retweet

		// Filter out copied tweets - random guess here
		if (is_original(tweet) === true) {

			// Strip 'copied' down tweet to a bare minimum (extremely rough here), chance for regex :muscle:
			var new_tweet_text = string_utils.strip_copied_tweets(tweet_text);

			// Search tweets based on 'fixed' tweet string, but skip tweet if search fails
			var searched_tweets = Search.search_tweets_by_str(new_tweet_text);
			if (typeof searched_tweets === 'undefined') { return };

			// Check all results of tweet search for potential retweets
			searched_tweets.forEach(function(s_tweet) {
				if (typeof s_tweet.id_str !== 'undefined' && s_tweet.favorite_count > 2) {
					retweet(s_tweet);
				}
			});

		} else {

			// Directly retweet original competition tweets based on 'metric' to determine original
			retweet(tweet);
		}
	}
});

