'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('im_messasge', (table) => {
    table.increments();
    table.integer('im_id')
        .notNullable()
        .references('id')
        .inTable('im')
        .onDelete('CASCADE')
        .index();
    table.string('text').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('im_messasge');
};
