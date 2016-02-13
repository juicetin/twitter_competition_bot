define(function (require, exports, module) {
	var db = require('server/db.js');
	var knex;

	function find_one(tweet_options) {
		knex = db.get_knex();
		return knex('tweets').where(tweet_options);
	}

	module.exports = find_one;
});
