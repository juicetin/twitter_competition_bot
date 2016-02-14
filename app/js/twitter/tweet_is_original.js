define (function (require, exports, module) {
	var CONSTANTS = require('app/constants.js');

	/*
	 *	'Algorithm' (hardly, at the moment) to determine whether tweet
	 *	 	is a copied retweet or original
	 */
	function tweet_is_original (tweet) {
		// TODO really need a better 'algorithm' here
		return tweet.favorite_count > CONSTANTS.fav_rt_threshold;
	}

	module.exports = tweet_is_original;
});
