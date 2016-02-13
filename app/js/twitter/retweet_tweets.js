define(function (require, exports, module) {
	var logger = require('server/logger.js');
	var twitter_client = require('server/twitter.js');

	function retweet(tweet) {
		var Twitter = twitter_client.get_client();
		try {
			Twitter.post('/statuses/retweet/' + tweet.id);
		} catch (error) {
			// TODO deal with it. limit reached...?
		}
	}

	module.exports = retweet;
});
