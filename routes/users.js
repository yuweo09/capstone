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

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.verify = false;

      return next(boom.create(401, 'Unauthorized'));
    }

    res.verify = true;
    req.token = decoded;

    next();
  });
};

router.get('/users', authorize, (req, res, next) => {
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

router.post('/users/board', authorize, (req, res, next) => {

  const { userId } = req.token;
  const title =  'dev';
  const description = 'blah'
  const insertBoard = { userId, title, description};

  knex('project_board').insert(decamelizeKeys(insertBoard), '*')
  .then((row) => {
    if (!row) {
      return next(boom.create(400, `No board ${userId}`));
    }
    res.send(camelizeKeys(row));
  })
    .catch((err) => {
      next(err);
    });
});

router.post('/users/boarda', authorize, (req, res, next) => {

  // console.log(req);
  // const { projectId } = req.id;
  const projectId =  2;
  const taskValue =  4;
  const task = 'blah'
  const insertBoardA = { projectId, task, taskValue };

  knex('project_activity').insert(decamelizeKeys(insertBoardA), '*')
  .then((row) => {
    if (!row) {
      return next(boom.create(400, `No ac ${userId}`));
    }
    res.send(camelizeKeys(row));
  })
    .catch((err) => {
      next(err);
    });
});

router.post('/users/forum', authorize, (req, res, next) => {
  const projectId =  2;
  const insertBoardA = { projectId };

  knex('forum').insert(decamelizeKeys(insertBoardA), '*')
  .then((row) => {
    if (!row) {
      return next(boom.create(400, `No forum ${userId}`));
    }
    res.send(camelizeKeys(row));
  })
  .catch((err) => {
      next(err);
    });
});

router.post('/users/forumt', authorize, (req, res, next) => {
  const { userId } = req.token;
  const forumId =  1;
  const text = 'blah'
  const insertBoardA = { forumId, userId, text };

  knex('forum_thread').insert(decamelizeKeys(insertBoardA), '*')
  .then((row) => {
    if (!row) {
      return next(boom.create(400, `No ft ${userId}`));
    }
    res.send(camelizeKeys(row));
  })
    .catch((err) => {
      next(err);
    });
});

router.get('/users/ft', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('forum_thread')
    .where('user_id', userId)
    .first()
    .then((row) => {
      if (!row) {
        return next(boom.create(400, `No ft at id ${userId}`));
      }
      res.send(camelizeKeys(row));
    })
    .catch((err) => {
      next(err);
    });
});
router.get('/users/currentuser', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('users')
    .where('id', userId)
    .first()
    .then((row) => {
      if (!row) {
        return next(boom.create(400, `No user at id ${userId}`));
      }
      res.send(camelizeKeys(row));
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/users/:id', authorize, (req, res, next) => {
  const { id } = req.params;

  knex('users')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        return next(boom.create(400, `No user at id ${userId}`));
      }

      res.send(camelizeKeys(row));
    })
    .catch((err) => {
      next(err);
    });
});

// router.patch('/users', authorize, (req, res, next) => {
//   const { userId } = req.token;
//   const { newHighScore } = req.body;
//
//   knex('users')
//     .where('id', userId)
//     .first()
//     .then((user) => {
//       if (!user) {
//         return next(boom.create(404, 'Not Found'));
//       }
//
//       const { high_score } = user;
//       const updateUser = {};
//
//       if (newHighScore > high_score) {
//         updateUser.high_score = newHighScore;
//
//         return knex('users')
//           .update(decamelizeKeys(updateUser))
//           .where('id', userId);
//       } else {
//         return knex('users')
//           .update(decamelizeKeys(updateUser))
//           .where('id', userId);
//       }
//     })
//     .then((row) => {
//       const user = camelizeKeys(row[0]);
//       res.send(user);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

router.post('/users',(req, res, next) => {
  const { email, first_name, last_name, rep_score, password} = req.body;
  console.log(first_name);

  bcrypt.hash(password, 12)
    .then((hashedPassword) => {
      const insertUser = { email, first_name, last_name, rep_score, hashedPassword};

      return knex('users')
        .where('email', email)
        .first()
        .then((row) => {
          if (row) {
            return next(boom.create(400, 'Email already exists'));
          }
        })
        .then(() => {
          return knex('users').insert(decamelizeKeys(insertUser), '*');
        })
    })
    .then((rows) => {
      const user = camelizeKeys(rows[0]);

      delete user.hashedPassword;

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/users', (req, res, next) => {
  const { userId } = req.token;
  let user;

  const { email } = req.body;

  knex('users')
    .where('email', eamil)
    .first()
    .then((row) => {
      if (!row) {
        return next(boom.create(404, `User not found at id ${username}`));
      }

      if (userId !== Number(row.user_id)) {
        return next(boom.create(400, `userId ${userId} and row.user_id ${row.user_id} fail strictly equal.`));
      }

      user = camelizeKeys(row);

      return knex('users')
        .del()
        .where('username', username);
    })
    .then(() => {
      delete user.id;
      delete user.hashedPassword;
      delete user.updatedAt;

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});
//s
router.get('/users/board', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('project_board')
    .where('user_id', userId)
    .first()
    .then((row) => {
      if (!row) {
        return next(boom.create(400, `No board at id ${userId}`));
      }
      res.send(camelizeKeys(row));
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/users/boarda', authorize, (req, res, next) => {

  const { userId } = req.token;

  knex('project_activity')
    .where('user_id', userId)
    .first()
    .then((row) => {
      if (!row) {
        return next(boom.create(400, `No board activity ${userId}`));
      }
      res.send(camelizeKeys(row));
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/users/forum', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('forum')
    .where('id', userId)
    .first()
    .then((row) => {
      if (!row) {
        return next(boom.create(400, `No forum at id ${id}`));
      }
      res.send(camelizeKeys(row));
    })
    .catch((err) => {
      next(err);
    });
});

// router.get('/users/forumt', authorize, (req, res, next) => {
//   console.log('here');
//   const { userId } = req.token;
//   const user_id = parseInt(userId);
//   knex('forum_thread')
//     .where('user_id', user_id)
//     .first()
//     .then((row) => {
//       if (!row) {
//         return next(boom.create(400, `No forun at id ${id}`));
//       }
//       res.send(camelizeKeys(row));
//     })
//     .catch((err) => {
//       next(err);
//     });
//   res.send(true);
// });
module.exports = router;
