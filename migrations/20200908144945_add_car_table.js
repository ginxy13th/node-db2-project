
exports.up = function(knex) {
  return knex.schema.createTable('car-dealer', table => {
      table.increments("id")
      table.integer('VIN').notNullable().unique()
      table.string('make').notNullable()
      table.string('model').notNullable()
      table.integer('mileage').notNullable()
      table.string('transmission')
      table.string('title-status')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('car-dealer')
};
