var requirejs = require('requirejs');
var should = require('should');
var Promise = require('bluebird');
require('dotenv').config();
requirejs.config({
	baseUrl: '.',
	nodeRequire: require
});

describe("the interface to twitter API's search functionality", function() {
	var twitter_search;

	before(function (done) {
		requirejs(['app/js/twitter/search_tweets.js', 'server/twitter.js'], function (search_req, twitter_client) {
			twitter_search = search_req;
			twitter_client.connect();
			done();
		});
	});

	it("should return search results for some keywords given the said terms", function(done) {
		this.timeout(10000);
		var search_string = "food";
		return twitter_search(search_string).then(function (result) {
			result.should.exist;
			result.should.have.property('length');
			result.length.should.be.above(10);
			console.log(result.length);
			done();
		}).catch(function (error) {
			done(error);
		});
	});
});
