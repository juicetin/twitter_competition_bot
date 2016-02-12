var requirejs = require('requirejs');

describe("the repository for the 'tweets' table", function() {

	require('should');
	var tweets_repo,
		db,
		knex;

	before(function(done) {
		requirejs(['app/repositories/tweets/index.js',
				   'server/db.js'], 
		function (tweets_repo_req, db_req) {
			tweets_repo = tweets_repo_req;
			db = db_req;
			db.connect();
			knex = db.get_knex();
			done();
		});
	});

	afterEach(function(done) {
		db.clear().then(function() {
			done();
		});
	});

	it("should be able to insert a tweet I just retweeted given the data", function (done) {
		var tweets = [
		{
			tweet_id: 124,
			user_id: 715,
			tweet_text: 'foo bar',
			favourited: true
		},
		{
			tweet_id: 897,
			user_id: 704,
			tweet_text: 'fizz buzz',
			favourited: false
		}
		];

		return tweets_repo.insert_one(tweets[0]).then(function () {
			return knex('tweets').where('tweet_id', 124);
		}).then(function (result) {
			result.should.have.length(1);
			result[0].tweet_id.should.equal(124);
			result[0].user_id.should.equal(715);
			result[0].tweet_text.should.equal('foo bar');
			result[0].favourited.should.equal(true);

			return knex('tweets').where('tweet_id', 897);
		}).then(function (result) {
			result.should.have.length(1);
			result[0].tweet_id.should.equal(897);
			result[0].user_id.should.equal(704);
			result[0].tweet_text.should.equal('fizz buzz');
			result[0].favourited.should.equal(false);
		}).catch(function (error) {
			done(error);
		});
	});

	it("should be able to find people I've previously followed given either id or screen name");
});
