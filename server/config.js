define(function(require, exports, module) {

	var config = exports;

	var is_test_env = config.is_test_env = process.env.NODE_ENV === 'TEST';


	// Twitter auth details
	var env_test_prefix = '';
	if (is_test_env === true) {
		env_test_prefix = 'TEST_';
	}
	config.tw_auth = {
		access_token_key	: process.env[env_test_prefix + 'ACCESS_TOKEN'],
		access_token_secret : process.env[env_test_prefix + 'ACCESS_SECRET'],
		consumer_key		: process.env[env_test_prefix + 'CONSUMER_KEY'],
		consumer_secret		: process.env[env_test_prefix + 'CONSUMER_SECRET']
	};

	// Tweet bot db config
	config.db = {
		uri: process.env.DATABASE_URL || 'postgres://postgres@localhost/twitter_bot'
	};
	if (is_test_env === true) {
		config.db.uri = process.env.DATABASE_URL || 'postgres://postgres@localhost/twitter_bot_test'
	}
});
