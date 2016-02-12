define(function (require, exports, module) {
	var following_repo = {};


	following_repo.insert_one = require('app/repositories/following/insert_one.js');
	following_repo.find_one = require('app/repositories/following/find_one.js');

	module.exports = following_repo;
});
