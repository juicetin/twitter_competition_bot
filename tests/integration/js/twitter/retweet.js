"use strict"

describe("the interface to twitter API's retweet functionality", function() {
	var requirejs = require('requirejs');
	var Promise = require('bluebird');
	var Q = require('q');
	var retweeter, db, twitter_client;
	require('dotenv').config();

	before(function (done) {
		requirejs(['app/js/twitter/retweet_tweets.js',
					'server/db.js',
					'server/twitter.js'],
		function(retweeter_req, db_req, twitter_req) {
			retweeter = retweeter_req;
			db = db_req;
			db.connect();
			twitter_client = twitter_req;
			twitter_client.connect();
			done();
		});
	});

	afterEach(function(done) {
    this.timeout(10000);
		db.clear().then(function() {

			var Twitter = twitter_client.get_client();
			Twitter.post('statuses/unretweet/', {id: '123'}, function (error, tweets, response) {
        console.log('Test retweet 123 has been unretweeted!');
				done();
			});
		});
	});

	it("should be able to retweet a tweet given the original's id", function(done) {
		this.timeout(10000);
		var tweet_id = '123';
		var tweet = {
			id_str: tweet_id,
			id: parseInt(tweet_id),
			user: {
				id: '123456'
			},
			text: 'This is a test tweet with dummy text'
		};
		console.log(parseInt(tweet_id));

		return retweeter(tweet).then(function(result) {
			console.log(result);
			done();
		}).catch(function (error) {
			done(error);
		});
	});
});
