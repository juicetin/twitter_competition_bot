define(function (require, exports, module) {
	var db = require('server/db.js');
	var knex;
	
	function insert_one(following_obj) {
		knex = db.get_knex();
		return knex('following')
			   .insert(following_obj);
	}

	module.exports = insert_one;
});
