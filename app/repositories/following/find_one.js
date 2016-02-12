define(function (require, exports, module) {
	var db = require('server/db.js');
	var knex;

	function find_one(following_options) {
		knex = db.get_knex();
		return knex('following').where(following_options);
	}

	module.exports = find_one;
});
