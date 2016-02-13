define(function (require, exports, module) {
	var tweet_repo = module.exports;

	tweet_repo.insert_one = require('app/repositories/tweets/insert_one.js');
	tweet_repo.find_one = require('app/repositories/tweets/find_one.js');
});
