exports.up = function(knex, Promise) {
	return knex.schema.createTable('tweets', function(table) {
    	table.integer('tweet_id').notNullable();
    	table.integer('user_id').notNullable();
    	table.text('tweet_text').notNullable();
		table.primary('tweet_id');
		table.timestamps();
	}).createTable('following', function(table) {
		table.integer('user_id').notNullable();
		table.text('user_screen_name');
		table.primary('user_id');
		table.timestamps();
	}).catch (function (error) {
		console.log(error);
	});
};

exports.down = function(knex, Promise) {
	return knex
		   .schema
		   .dropTableIfExists('tweets')
		   .dropTableIfExists('following')
	.catch(function (error) {
		console.log(error);
	});
};

exports.config = {
	transaction: false
};
