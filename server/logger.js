define(function (require, exports, module) {
	var winston = require('winston');

	var logger = new winston.Logger({
		level: 'verbose',
		transports: [
			// new (winston.transports.Console)(),
			new (winston.transports.File)({ filename: 'twitter_bot.logs' })
		]
	});

	module.exports = logger;
});
