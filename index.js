"use strict"

require('dotenv').config();

var winston = require('winston');
var knex = require('knex')({
	client: 'pg',
	connection: {
		host: process.env.PG_HOST,
		user: process.env.PG_USER,
		password: process.env.PG_PASS,
		database: process.env.PG_DB
	}
});


var unwanted_keywords = ['MTV', 'Bieber', 'fuck', 'pussy', 'if you think', 'help me win'];
var fav_keywords = ["favorite", "like", "fave", "fav", "fvrt", "fvrite", "LK ", " LK"];
var fav_rt_threshold = 2;

var tw_auth = {
	access_token_key	: process.env.ACCESS_TOKEN,
	access_token_secret : process.env.ACCESS_SECRET,
	consumer_key		: process.env.CONSUMER_KEY,
	consumer_secret		: process.env.CONSUMER_SECRET
};

// var Twitter = require('node-tweet-stream'),
// 	tweets = new Twitter(tw_auth);

// var Twitter = require('node-twitter');
// var twitterStreamClient = new Twitter.StreamClient(
// 	tw_auth.consumer_key,
// 	tw_auth.consumer_secret,
// 	tw_auth.token,
// 	tw_auth.token_secret
// );

var Twitter = require('twitter');
var twitter = new Twitter(tw_auth);

twitter.stream('statuses/filter', {track: 'RT win'}, function(stream) {

	/*
	 *	Error functionality
	 */
	stream.on('error', function (error) {
		winston.error(error);
	});

	/*
	 *	Upon receiving a tweet
	 */
	stream.on('data', function (tweet) {
		streamSingleTweet(tweet);
	});
});

/*
 *	Keywords to track
 */
// twitterStreamClient.start(['RT', 'win']);

// TODO
function strip_copied_tweets(tweet_text) {
}

// TODO
function retweet(tweet) {
}

function streamSingleTweet(tweet) {
	var id_str = tweet.id_str;
	if (typeof id_str === "undefined") { return; }

	var tweet_text = tweet.text;
	console.log(tweet_text);



	// Check if any unwanted words are in the tweet
	unwanted_keywords.forEach(function (bad_word) {
		// TODO
	});

	// TODO do document matrix comparison from ~300 most recent tweets, don't waste
	// the following search on a tweet that's 80%+ similar to an existing retweet

	// Filter out copied tweets - random guess here
	if (tweet.favorite_count < fav_rt_threshold) {

		// Strip 'copied' down tweet to a bare minimum (extremely rough here), chance for regex :muscle:
		var new_tweet_text = tweet_text; // TODO strip_copied_tweets(tweet_text);

		var searched_tweets;
		try {

			var searchParams = {
				q: new_tweet_text,
				lang: 'en',
				count: 30,
				retweeted: false
			};

			twitter.get('search/tweets', searchParams, function (error, tweets, response) {
				if (error) {
					winston.error(error);
				}
				searched_tweets = tweets.statuses;
			});

		} catch (error) {
			winston.error(error);
			// TODO keep track of time here
			// 		once 3 minutes has elapsed, try searching again
			return;
		}

		// Go through each searched tweet
		if (searched_tweets && searched_tweets.length > 0) {
			searched_tweets.forEach(function(s_tweet) {
				if (typeof s_tweet.id_str !== 'undefined' && s_tweet.favorite_count > 2) {
					retweet(s_tweet);
				}
			});
		}

	} else {

		// Directly retweet original competition tweets
		retweet(tweet);
	}
}
