"use strict"
try {
	require('dotenv').config();
} catch (error) {
	console.error("No dotenv file located - using heroku configured environment variables");
}


var requirejs = require('requirejs');
requirejs.config({
	baseUrl: '/',
	nodeRequire: require,
	paths: {}
});

requirejs(['app/index.js', 'server/logger.js'], function (service, logger) {
	// logger.info('Service temporarily turned off until everything is working together!');

	service.start()
	.then(function () {
		logger.info('Twitter competition bot started!');
	});
});

