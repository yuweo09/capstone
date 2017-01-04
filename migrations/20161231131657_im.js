'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('im', (table) => {
    table.increments();
    table.integer('im_user_1')
         .notNullable()
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
         .index();
    table.integer('im_user_2')
         .notNullable()
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
         .index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('im');
};
