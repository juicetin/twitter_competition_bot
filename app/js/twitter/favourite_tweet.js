define (function require, exports, module) {
	var logger = require('server/logger');
	var twitter_client = require('server/twitter');

	/*
	 * Favorite a tweet
	 */
	function favourite_tweet (tweet) {
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

	module.exports = favourite_tweet;
});
