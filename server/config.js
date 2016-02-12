define(function(require, exports, module) {

	var config = exports;

	var is_test_env = config.is_test_env = process.env.NODE_ENV === 'TEST';


	// Twitter auth details
	config.tw_auth = {
		access_token_key	: process.env.ACCESS_TOKEN,
		access_token_secret : process.env.ACCESS_SECRET,
		consumer_key		: process.env.CONSUMER_KEY,
		consumer_secret		: process.env.CONSUMER_SECRET
	};

	// Tweet bot db config
	config.db = {
		uri: process.env.DATABASE_URL || 'postgres://postgres@localhost/twitter_bot'
	};
	if (is_test_env === true) {
		config.db.uri = 'postgres://postgres@localhost/twitter_bot_test'
	}
});
