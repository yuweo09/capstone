'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('forum', (table) => {
    table.increments();
    table.integer('project_id')
        .notNullable()
        .references('id')
        .inTable('project_board')
        .onDelete('CASCADE')
        .index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('forum');
};
