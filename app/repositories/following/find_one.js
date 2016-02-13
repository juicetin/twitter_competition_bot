define(function (require, exports, module) {
	var db = require('server/db.js');
	var knex;
	var logger = require('server/logger.js');

	function find_one(following_options) {
		logger.info('Following find_one repo recevied options', following_options, {});
		knex = db.get_knex();

		// user_id, user_screen_name
		var search_params = {
		};

		if (typeof following_options.user_id === 'number') {
			logger.info('Finding user using user_id', following_options.user_id, {});
			search_params.user_id = following_options.user_id;
		}

		if (typeof following_options.user_screen_name === "string") {
			logger.info('Finding user using screen name', following_options.user_screen_name, {});
			search_params.user_screen_name = following_options.user_screen_name;
		}

		logger.info('Finding users being followed with search params', search_params, {});
		return knex('following').where(search_params);
	}

	module.exports = find_one;
});
