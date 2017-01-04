'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('project_board', (table) => {
    table.increments();
    table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .index();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('project_board');
};
