define(function (require, exports, module) {
	var db_module = module.exports;
	var db;
	var knex = require('knex');
	var config = require('server/config.js');

	// Opens a connection to the database (should)
	// 	only be called once for the session
	db_module.connect = function() {
		db = knex({
			client: 'pg',
			connection: config.db.uri
		});
	}

	// Returns the knex object
	db_module.get_knex = function() {
		return db;
	}

	// Provides the ability to clear all tables ONLY
	// 	if the service is running in test mode (test env var)
	db_module.clear = function() {
		if (config.is_test_env) {
			return db('following').del().then(function () {
				return db('tweets').del();
			});
		} else {
			return Promise.resolve();
		}
	}

	exports = db_module;
});
