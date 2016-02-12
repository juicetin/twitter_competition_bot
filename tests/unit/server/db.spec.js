var requirejs = require('requirejs');
var should = require('should');

describe("the db module should do its job", function() {
	var db;
	var knex;

	before(function(done) {
		requirejs(['server/db.js'], function(db_req) {
			db = db_req;
			db.connect();
			knex = db.get_knex();
			done();
		});
	});

	afterEach(function(done) {
		return db.clear().then(function () {
			done();
		});
	});

	it ("should provide a connection to the database", function(done) {

		// Insert dummy data
		knex('following').insert({
			user_id: 5,
			user_screen_name: 'derp'

		// Attempt to pull the data back
		}).then(function () {
			return knex('following');

		// Check if data is present
		}).then(function (results) {
			var row = results[0];
			row.user_id.should.equal(5);
			row.user_screen_name.should.equal('derp');
			done();
		}).catch(function (error) {
			done(error);
		});
	});

	it ("should clear the database when in test mode", function (done) {
		knex('tweets').insert({
			tweet_id: 74,
			user_id: 20,
			tweet_text: 'foo bar'
		}).then(function () {
			return knex('tweets');
		}).then(function (result) {
			result.should.have.length(1);
			result[0].tweet_id.should.equal(74);
			result[0].user_id.should.equal(20);
			return db.clear();
		}).then(function () {
			return knex('tweets');
		}).then(function (result) {
			result.should.have.length(0);
			done();
		});
	});
});
