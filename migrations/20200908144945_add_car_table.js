
exports.up = function(knex) {
  return knex.schema.createTable('car-dealer', table => {
      table.increments("id")
      table.integer('VIN').notNullable().unique()
      table.text('make').notNullable()
      table.text('model').notNullable()
      table.integer('mileage').notNullable()
      table.text('transmission')
      table.text('title-status')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('car-dealer')
};
