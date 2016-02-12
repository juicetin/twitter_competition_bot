define(function (require, exports, module) {
	var db_module = exports;
	var db;
	var knex = require('knex');
	var config = require('server/config.js');

	db_module.connect = function() {
		db = knex({
			client: 'pg',
			connection: config.db.uri
		});
	}

	db_module.get_knex = function() {
		return db;
	}

	db_module.clear = function() {

	}

	exports = db_module;
});
