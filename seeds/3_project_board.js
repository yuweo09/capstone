/* eslint camelcase: 0, max-len: 0 */

'use strict';

exports.seed = function(knex) {
  return knex('project_board').del()
    .then(() => {
      return knex('project_board').insert([{
        id: 1,
        user_id:2,
        title: 'yuweo',
        description: 'yahoo@yahoo.com',
        created_at: new Date('2016-11-25 16:17:12 UTC'),
        updated_at: new Date('2016-11-25 16:17:12 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('project_board_id_seq', (SELECT MAX(id) FROM project_board));"
      );
    });
};
