define(function (require, module, exports) {
	var string_utils = require('app/js/string_utils.js');
	var CONSTANTS = require('app/constants.js');
	var Promise = require('bluebird');

	module.exports = function (tweet) {
		var tweet_text_lower = tweet_text.lower();
		var exist_follow_words = string_utils.target_words_in_string(CONSTANTS.follow_keywords, tweet_text_lower);
		if (exist_follow_words === true) {

			// TODO Check whether follow limit (5000, it seems) is reached
			// 	if so, unfollow 500 people TODO tune this - too many may raise flags

			user_id = tweet.user.id;
			screen_id = tweet.user.screen_name;
			try {
				var Twitter = twitter_client.get_client();
				Twitter.post('/friendships/create/' + tweet.user.id);

				// Add the followed user to the follower table
				var insert_one_follower = require('app/repositories/following/insert_one.js');
				return insert_one_follower(
					{
						user_id : tweet.user_id,
						user_screen_name: user_screen_name
					}
				);
			} catch(error) {
				// TODO catch connection errors/follow limit errors here

				return Promise.reject();
			}
		}
	}
});
