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
router.get('/api/allprojects',(req, res, next) => {
  knex('project_board')
    .orderBy('id')
    .then((rows) => {
      const projects= camelizeKeys(rows);

      res.send(projects);
    })
    .catch((err) => {
      next(err);
    });
});
router.get('/api/alltasks', (req, res, next) => {
  knex('project_activity')
    .orderBy('project_id')
    .then((rows) => {
      const tasks= camelizeKeys(rows);

      res.send(tasks);
    })
    .catch((err) => {
      next(err);
    });
});
router.post('/users/board', authorize, (req, res, next) => {

  const { userId } = req.token;
  const { title, description}=  req.body;
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

router.post('/api/activity', authorize, (req, res, next) => {

  // console.log(req);
  // const { projectId } = req.id;
  const {userId} = req.token;
  const {projectId, taskValue, task} = req.body;

  const insertBoardA = { projectId, userId, task, taskValue };

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
  const insertThread = { projectId };

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

router.post('/users/forumthread', authorize, (req, res, next) => {
  const { userId } = req.token;
  const { projectId, text } = req.body;

  const insertThread= {projectId, userId, text };

  knex('forum_thread').insert(decamelizeKeys(insertThread), '*')
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

router.get('/users/forumthread', authorize, (req, res, next) => {
  const { userId } = req.token;
  const { projectId } = req.body;

  knex('forum_thread')
    .where('project_id', projectId)
    .orderBy('created_at', 'desc')
    .then((row) => {
      if (!row) {
        return next(boom.create(400, `No ft at id ${projectId}`));
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
    .where('email', email)
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
router.get('/api/activity', authorize, (req, res, next) => {
  const { userId } = req.token;
  console.log(userId);


  knex('project_activity')
    .where('user_id', userId)
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
router.get('/api/boards', authorize, (req, res, next) => {
  const { userId } = req.token;
  console.log(userId);


  knex('project_board')
    .where('user_id', userId)
    .then((row) => {
      if (!row) {e
        return next(boom.create(400, `No user at id ${userId}`));
      }

      console.log(row, ' THIS IS ROW');
      res.send(camelizeKeys(row));
    })
    .catch((err) => {
      next(err);
    });
});
router.delete('/users/task', (req, res, next) => {

  const { taskId } = req.body;
  console.log(taskId+"THE IDDDDD");
  let task;



  knex('project_activity')
    .where('id', taskId)
    .first()
    .then((row) => {
      if (!row) {
        return next(boom.create(404, `Task not found at id ${taskId}`));
      }

      if (taskId !== Number(row.id)) {
        return next(boom.create(400, `userId ${taskId} and row.user_id ${row.id} fail strictly equal.`));
      }

      task= camelizeKeys(row);

      return knex('project_activity')
        .del()
        .where('id', taskId);
    })
    .then(() => {
      delete task.id;
      delete task.updatedAt;

      res.send(task);
    })
    .catch((err) => {
      next(err);
    });
});
router.get('/api/forum', authorize, (req, res, next) => {
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

module.exports = router;
