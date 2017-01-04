'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('project_activity', (table) => {
    table.increments();
    table.integer('project_id')
        .notNullable()
        .references('id')
        .inTable('project_board')
        .onDelete('CASCADE')
        .index();
    table.integer('user_id')
         .notNullable()
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
         .index();
    table.string('task').notNullable();
    table.integer('task_value');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('project_activity');
};
