"use strict"

require('dotenv').config();

var requirejs = require('requirejs');
requirejs.config({
	baseUrl: '/',
	nodeRequire: require,
	paths: {}
});

requirejs(['src/js/index.js'], function (service) {
	service.start()
	.then(function () {
		console.log('Twitter competition bot started!');
	});
});

