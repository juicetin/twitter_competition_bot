
exports.up = function(knex, Promise) {
  return knex.schema.table('tweets', function (table) {
	  table.boolean('favourited');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('tweets', function(table) {
	  table.dropColumn('favourited');
  });
};
