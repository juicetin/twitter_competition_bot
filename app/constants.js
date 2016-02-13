define(function (require, exports, module) {
	/*
	 *	Some global vars
	 */
	var CONSTANTS = module.exports;

	var to_hash = CONSTANTS.to_hash = function (list) {
		var hash = {};
		list.forEach(function(item) {
			hash[item] = true;
		});
		return hash;
	}

	CONSTANTS.unwanted_keywords_list = ['MTV', 'Bieber', 'fuck', 'pussy', 'if you think', 'help me win'];
	CONSTANTS.unwanted_keywords = to_hash(CONSTANTS.unwanted_keywords_list);
	CONSTANTS.fav_keywords_list = ["favorite", "like", "fave", "fav", "fvrt", "fvrite", "LK ", " LK"];
	CONSTANTS.fav_keywords = to_hash(CONSTANTS.fav_keywords_list);
	CONSTANTS.follow_keywords_list = ["follow", "follows", "Follow", "follows", "foll", "flw", "follo", "F &", "F&", "& F", "&F"];
	CONSTANTS.follow_keywords = to_hash(CONSTANTS.follow_strs_list);

	CONSTANTS.fav_rt_threshold = 2;

});
