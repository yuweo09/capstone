'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('recruiters', (table) => {
    table.increments();
    table.string('email').notNullable().unique();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.integer('rep_score').defaultTo(0);
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('recruiters');
};
