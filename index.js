"use strict"

require('dotenv').config();

var requirejs = require('requirejs');
requirejs.config({
	baseUrl: '/',
	nodeRequire: require,
	paths: {}
});

requirejs(['app/index.js'], function (service) {

	console.log('Service temporarily turned off until everything is working together!');

	// service.start()
	// .then(function () {
	// 	console.log('Twitter competition bot started!');
	// });
});

