/* eslint camelcase: 0, max-len: 0 */

'use strict';

exports.seed = function(knex) {
  return knex('project_activity').del()
    .then(() => {
      return knex('project_activity').insert([{
        id: 1,
        project_id:1,
        user_id: 2,
        task: 'build user table with email as a primay key',
        task_value: 5,
        created_at: new Date('2016-11-25 16:17:12 UTC'),
        updated_at: new Date('2016-11-25 16:17:12 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('project_activity_id_seq', (SELECT MAX(id) FROM project_activity));"
      );
    });
};
