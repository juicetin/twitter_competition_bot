"use strict"

var requirejs = require('requirejs');
var should = require('should');
var winston = require('winston');
requirejs.config({
	baseUrl: '.',
	nodeRequire: require
});

describe("String utilities should do their job!", function() {

	var string_utils;
	before(function(done) {
		requirejs(['app/js/string_utils.js'], function (string_utils_req) {
			string_utils = string_utils_req;
			done();
		});
	});

	it("should strip copied tweets down at a basic level", function() {
		var tweet = "RT @davelackie: Let's keep the #lovestoryEDT fun going! Win Chloe Love Story EDT! To enter, follow @davelackie &amp; RT https://t.co/DJsPYLS71Z";
		var stripped_tweet = string_utils.strip_copied_tweets(tweet);
		
		stripped_tweet.should.startWith("Let's keep");
	});

	it("should successfully identify that one or more from a list of words exists in a string", function() {
		var check_list = ['hi', 'there', 'this', 'is', 'a', 'contrived', 'list'];
		var string1 = "How many words are you interested in? Are you interested in whole words?";
		var string2 = "hi there this is a contrived list";

		var check_truth = string_utils.target_words_in_string(check_list, string1);
		check_truth.should.be.false;

		check_truth = string_utils.target_words_in_string(check_list, string2);
		check_truth.should.be.true;
	});
});


