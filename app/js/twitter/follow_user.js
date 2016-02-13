define(function (require, module, exports) {
	module.exports = function (tweet) {
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
});
