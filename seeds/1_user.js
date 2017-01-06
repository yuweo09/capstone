/* eslint camelcase: 0, max-len: 0 */

'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id: 1,
        email: 'mettacrouse@gmail.com',
        first_name: 'metta',
        last_name: 'crouse',
        rep_score: 0,
        hashed_password: '$2a$12$UnBC5meqX7ZKrKcAAm9qbudbIMvHjrJjvh3Pi2kpcrDhMIJUlqsy.',
        created_at: new Date('2016-11-25 16:17:12 UTC'),
        updated_at: new Date('2016-11-25 16:17:12 UTC')
      }, {
        id: 2,
        email: 'karlwatson@gmail.com',
        first_name: 'karl',
        last_name: 'watson',
        rep_score: 20,
        hashed_password: '$2a$12$8CScAArxojTvWIfduGGzHe1llWA4MhWMJnXhU4QqVh8i4xiBMRhzK',
        created_at: new Date('2016-11-25 16:17:12 UTC'),
        updated_at: new Date('2016-11-25 16:17:12 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
