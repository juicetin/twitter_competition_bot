define(function (require, exports, module) {
	var db = require('server/db.js');
	var knex = db.get_knex();
	var logger = require('server/logger.js');

	module.exports = function (tweet_obj) {
		logger.info('inserting tweet', tweet_obj);
		return knex('tweets').insert(tweet_obj);
	};
});
