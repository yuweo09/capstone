'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('forum_thread', (table) => {
    table.increments();
    table.integer('forum_id')
        .notNullable()
        .references('id')
        .inTable('forum')
        .onDelete('CASCADE')
        .index();
    table.integer('user_id')
         .notNullable()
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
         .index();
    table.string('text').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('forum_thread');
};
