'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

// eslint-disable-next-line new-cap
// const ev = require('express-validation');
// const validations = require('../validations/users');

// const authorize = function(req, res, next) {
//   jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       res.verify = false;
//
//       return next(boom.create(401, 'Unauthorized'));
//     }
//
//     res.verify = true;
//     req.token = decoded;
//
//     next();
//   });
// };

router.get('/board', (req, res, next) => {
  knex('users')
    .orderBy('id')
    .then((rows) => {
      const users = camelizeKeys(rows);

      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/board',(req, res, next) => {
  const { user_id, title, description } = req.body;
  const insertBoard = { user_id, title, description };
      return knex('project_board')
        .where('user_id', 1)
        .first()
        .then((row) => {
          if (row) {
            return next(boom.create(400, 'Email already exists'));
          }
        })
        .then(() => {
          return knex('project_board').insert(decamelizeKeys(insertBoard), '*');
        })
    .catch((err) => {
      next(err);
    })
});




module.exports = router;
