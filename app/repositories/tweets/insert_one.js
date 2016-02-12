define(function (require, exports, module) {
	var db = require('server/db.js');
	var knex = db.get_knex();
	module.exports = function (tweet_obj) {
		console.log('inserting tweet', tweet_obj);
		return knex('tweets').insert(tweet_obj);
	};
});
