define(function (require, exports, module) {
	var logger = require('server/logger');
	var twitter_client = require('server/twitter');

	function retweet(tweet) {
		var Twitter = twitter_client.get_client();
		var insert_tweet = require('app/repositories/tweets/insert_one');
		try {
			Twitter.post('/statuses/retweet/' + tweet.id);
			return insert_tweet({
				tweet_id: tweet.id,
				user_id: tweet.user.id,
				tweet_text: tweet.text,
				favourited: false
			});
		} catch (error) {
			// TODO deal with it. limit reached...?
		}
	}

	module.exports = retweet;
});
