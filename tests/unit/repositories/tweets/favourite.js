var requirejs = require('requirejs');

describe("favouriting tweets", function() {

	require('should');
	var tweets_repo,
		db,
		knex,
		logger;

	before(function(done) {
		requirejs(['app/repositories/tweets/index.js',
				   'server/db.js',
				   'server/logger.js'], 
		function (tweets_repo_req, db_req, logger_req) {
			tweets_repo = tweets_repo_req;
			db = db_req;
			db.connect();
			knex = db.get_knex();
			logger = logger_req;
			done();
		});
	});

	afterEach(function(done) {
		db.clear().then(function() {
			done();
		});
	});

	it("should be able to favourite tweets given tweet id", function (done) {
		var tweets = [
		{
			tweet_id: 124,
			user_id: 715,
			tweet_text: 'foo bar',
			favourited: true
		},
		{
			tweet_id: 384,
			user_id: 517,
			tweet_text: 'herp derp',
			favourited: false
		}
		];

		return knex('tweets').insert(tweets).then(function () {
			return tweets_repo.favourite_one({tweet_id: 124});
		}).then (function() {
			return knex('tweets').where('tweet_id', 124);
		}).then(function (result) {
			result.should.have.length(1);
			result[0].favourited.should.equal(true);

			return tweets_repo.favourite_one({tweet_id: 384});
		}).then(function() {
			return knex('tweets').where('tweet_id', 384);
		}).then(function (result) {
			result.should.have.length(1);
			result[0].favourited.should.equal(true);
			done();
		}).catch(function (error) {
			done(error);
		});
	});
});
