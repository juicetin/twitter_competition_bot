/* istanbul ignore define */
"use strict"

var requirejs = require('requirejs');
var should = require('should');
var winston = require('winston');
requirejs.config({
	baseUrl: '.',
	nodeRequire: require
});

describe ("constants should convert correctly", function() {
	var constants;
	before(function (done) {
		requirejs(['app/constants.js'], function (constants_req) {
			constants = constants_req;
			done();
		});
	});

	it ("should hash a list correctly", function() {
		var list = ["a", "b", "c", "d"];
		var hash = constants.to_hash(list);
		JSON.stringify(hash).should.equal('{"a":true,"b":true,"c":true,"d":true}');
	});
});
