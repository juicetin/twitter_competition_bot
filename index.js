"use strict"
var logger = require('server/logger.js');

try {
	require('dotenv').config();
} catch (error) {
	logger.error("No dotenv file located - using heroku configured environment variables");
}


var requirejs = require('requirejs');
requirejs.config({
	baseUrl: '/',
	nodeRequire: require,
	paths: {}
});

requirejs(['app/index.js'], function (service) {

	logger.info('Service temporarily turned off until everything is working together!');

	// service.start()
	// .then(function () {
	// 	logger.info('Twitter competition bot started!');
	// });
});

