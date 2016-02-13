define(function(require, exports, module) {
	var Utils = exports;
	/*
	 *	Given a filter list and a string, check if any of the filter list
	 *		words are in the string
	 */
	var target_words_in_string = Utils.target_words_in_string = function(target_hash, string) {
		string.split(" ").forEach(function (word) {
			if (target_hash[word] === true) {
				return true;
			}
		});
		return false;
	}

	/*
	 *	Strip a copied tweet down to what is (estimate) as close to the 'original'
	 *	tweet as possible
	 */
	var strip_copied_tweets = Utils.strip_copied_tweets = function(tweet_text) {

		// Create new object that isn't a reference - don't modify original
		// TODO not sure if this is the best way to copy and not get a reference?
		var stripped_tweet = new String(tweet_text);

		// Deal with those tweets that are nested RT: RT: RT:....
		// TODO a bunch of pre-strip tweets - do an analysis to figure out
		// best way to filter/process them
		while (tweet_text.indexOf('RT') == 0) {

			var colon_index = stripped_tweet.indexOf(':');

			// In case colons aren't used, start from char after the 'RT'
			if (colon_index == -1) {
				colon_index = 2;
			}

			// Get string after colon/'RT' tag
			stripped_tweet = stripped_tweet.substring(colon_index + 2, stripped_tweet.length);

			// Strip links - generally the link to the tweet being RT'd
			if (stripped_tweet.includes("http")) {
				var stripped_tweet_parts = stripped_tweet.split('https://');
				stripped_tweet = stripped_tweet_parts[0].trim();;

				// The 'RT' from 'RT <link> needs to be removed as well
				if (stripped_tweet.endsWith("RT")) {
					stripped_tweet = stripped_tweet.substring(0, stripped_tweet.length-3);
				}
			}

			return stripped_tweet;
		}
	}
});
