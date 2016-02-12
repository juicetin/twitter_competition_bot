"use strict"

require('dotenv').config();

var requirejs = require('requirejs');
requirejs.config({
	baseUrl: '/',
	nodeRequire: require,
	paths: {}
});

requirejs(['app/index.js'], function (service) {

	// Start service when everything is linked together properly!
	// service.start()
	// .then(function () {
	// 	console.log('Twitter competition bot started!');
	// });
});

