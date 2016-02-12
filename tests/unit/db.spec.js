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

	it ("should provide a connection to the database", function(done) {

		// Insert dummy data
		knex('following').insert({
			user_id: 5,
			user_handle: 'derp'

		// Attempt to pull the data back
		}).then(function () {
			return knex('following');

		// Check if data is present
		}).then(function (results) {
			var row = results[0];
			row.user_id.should.equal('5');
			row.user_handle.should.equal('derp');
			done();
		}).catch(function (error) {
			done(error);
		});
	});
});
