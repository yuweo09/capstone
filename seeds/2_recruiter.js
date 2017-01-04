/* eslint camelcase: 0, max-len: 0 */

'use strict';

exports.seed = function(knex) {
  return knex('recruiters').del()
    .then(() => {
      return knex('recruiters').insert([{
        id: 1,
        email: 'yahoo@yahoo.com',
        first_name: 'ig',
        last_name:'grant',
        hashed_password: '$2a$12$8CScAArxojTvWIfduGGzHe1llWA4MhWMJnXhU4QqVh8i4xiBMRhzK',
        created_at: new Date('2016-11-25 16:17:12 UTC'),
        updated_at: new Date('2016-11-25 16:17:12 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('recruiters_id_seq', (SELECT MAX(id) FROM recruiters));"
      );
    });
};
