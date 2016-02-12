var requirejs = require('requirejs');

describe("the repository for the 'following' table", function() {

	var following_repo,
		db,
		knex;

	before(function(done) {
		requirejs(['app/repositories/following/index.js',
				   'server/db.js'], 
		function (following_repo_req, db_req) {
			following_repo = following_repo_req;
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

	it("should be able to insert someone I just followed given the data", function(done) {
		var following_one = {
			user_id: 53,
			user_screen_name: 'whatever'
		};

		return following_repo.insert_one(following_one).then(function() {
			return knex('following');
		}).then(function (result) {
			result.should.have.length(1);
			result[0].user_id.should.equal(53);
			result[0].user_screen_name.should.equal('whatever');
			done();
		}).catch(function (error) {
			console.log('ERROR', error);
			done(error);
		});
	});

	it("should be able to find people I've previously followed given either id or screen name", function(done) {
		var following_ppl = [
			{
				user_id: 54,
				user_screen_name: 'foobar'
			},
			{
				user_id: 72,
				user_screen_name: 'fizzbuzz'
			}
		];

		return knex('following')
		.insert(following_ppl).then(function() {
			return following_repo.find_one({user_id: 54});// knex('following').where('user_id', 54);
		}).then(function (result) {
			result.should.have.length(1);
			result[0].user_id.should.equal(54);
			result[0].user_screen_name.should.equal('foobar');
			done();
		}).catch(function (error) {
			done(error);
		});
	});
});
