(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/App.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Main = require('./Main');

var _Main2 = _interopRequireDefault(_Main);

var _Footer = require('./layout/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Header = require('./layout/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Intro = require('./Intro');

var _Intro2 = _interopRequireDefault(_Intro);

var _ModalBasicExample = require('./ModalBasicExample');

var _ModalBasicExample2 = _interopRequireDefault(_ModalBasicExample);

var _SignIn = require('./SignIn');

var _SignIn2 = _interopRequireDefault(_SignIn);

var _NotFound = require('./NotFound');

var _NotFound2 = _interopRequireDefault(_NotFound);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _ProjectBoard = require('./ProjectBoard');

var _ProjectBoard2 = _interopRequireDefault(_ProjectBoard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = _react2.default.createClass({
  displayName: 'App',
  getInitialState: function getInitialState() {
    return {
      currentUser: {},
      isLoggedIn: false,
      forumPost: {},
      projects: [],
      tasks: []
    };
  },
  addProject: function addProject(project) {
    console.log(project, ' PROJECT');
    var nextProjects = this.state.projects.concat(project);
    this.setState({ projects: nextProjects });
  },
  addTask: function addTask(task) {
    var nextTasks = this.state.tasks.concat(task);
    this.setState({ tasks: nextTasks });
  },
  stateMutator: function stateMutator() {
    this.setState({ isLoggedIn: true });
  },
  getAllForum: function getAllForum() {
    var _this = this;

    _axios2.default.get('/users/ft').then(function (res) {
      _this.setState({ forumPost: res.data });
    }).catch(function (err) {
      _this.setState({ loadErr: err });
    });
  },
  getCurrentUser: function getCurrentUser() {
    var _this2 = this;

    _axios2.default.get('/users/currentuser').then(function (res) {
      _this2.setState({ currentUser: res.data });
    }).catch(function (err) {
      _this2.setState({ loadErr: err });
    });
  },
  componentDidMount: function componentDidMount() {
    var _this3 = this;

    _axios2.default.get('/token').then(function (res) {
      var isLoggedIn = res.data;
      if (isLoggedIn) {
        _this3.setState({ isLoggedIn: true });
        _this3.getCurrentUser();
        // this.getAllForum();
        // this.getUserScores();
        // this.getUserFriends();
      } else {
        _this3.setState({ isLoggedIn: false });
      }
    }).catch(function (err) {
      _this3.setState({ loadErr: err });
    });
  },
  signIn: function signIn() {
    this.setState({ isLoggedIn: true });

    this.getCurrentUser();
  },
  signOut: function signOut() {
    var _this4 = this;

    _axios2.default.delete('/token').then(function (res) {
      _this4.setState({
        currentUser: {},
        isLoggedIn: false
      });
    }).catch(function (err) {
      console.error(err);
    });
  },
  render: function render() {
    return _react2.default.createElement(
      _reactRouter.BrowserRouter,
      null,
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Header2.default, _extends({}, this.state, {
          signOut: this.signOut
        })),
        _react2.default.createElement(_Main2.default, _extends({}, this.state, {
          signOut: this.signOut,
          signIn: this.signIn,
          getCurrentUser: this.getCurrentUser,
          getAllForum: this.getAllForum,
          stateMutator: this.stateMutator,
          addProject: this.addProject,
          addTask: this.addTask

        })),
        _react2.default.createElement(_Footer2.default, null)
      )
    );
  }
});

exports.default = App;
});

require.register("components/Forum.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ForumThread = require('./ForumThread');

var _ForumThread2 = _interopRequireDefault(_ForumThread);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Forum = _react2.default.createClass({
  displayName: 'Forum',
  render: function render() {
    var sortedUsers = this.props.users;
    sortedUsers.sort(function (a, b) {
      if (a.highScore > b.highScore) {
        return -1;
      }
      if (a.highScore < b.highScore) {
        return 1;
      }
      return 0;
    });
    return _react2.default.createElement(
      'table',
      { className: 'clearfix', id: 'leaderboard-table' },
      _react2.default.createElement(
        'thead',
        null,
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'th',
            null,
            'RANK'
          ),
          _react2.default.createElement(
            'th',
            null,
            'USER'
          ),
          _react2.default.createElement(
            'th',
            null,
            'HIGH SCORE'
          )
        )
      ),
      _react2.default.createElement(
        'tbody',
        null,
        sortedUsers.map(function (user, index) {
          return _react2.default.createElement(_ForumThread2.default, { key: index, rank: index + 1, user: user });
        })
      )
    );
  }
});

exports.default = Forum;
});

require.register("components/ForumThread.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ForumThread = _react2.default.createClass({
  displayName: "ForumThread",
  render: function render() {
    return _react2.default.createElement(
      "tr",
      null,
      _react2.default.createElement(
        "td",
        null,
        this.props.rank
      ),
      _react2.default.createElement(
        "td",
        null,
        this.props.user.username
      ),
      _react2.default.createElement(
        "td",
        null,
        this.props.user.highScore + " "
      )
    );
  }
});

exports.default = ForumThread;
});

require.register("components/Intro.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _SignUp = require('./SignUp');

var _SignUp2 = _interopRequireDefault(_SignUp);

var _SignIn = require('./SignIn');

var _SignIn2 = _interopRequireDefault(_SignIn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Button, Header, Image, Modal, Form, Select, Input, Grid} from 'semantic-ui-react'
var Intro = _react2.default.createClass({
  displayName: 'Intro',
  IsLoggedIn: function IsLoggedIn() {
    if (this.props.isLoggedIn === false) {
      return _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(_SignUp2.default, { handleSignUpSubmit: this.handleSignUpSubmit }),
        _react2.default.createElement(_SignIn2.default, null)
      );
    } else {
      return _react2.default.createElement(_reactRouter.Redirect, { to: '/user' });
    }
  },
  handleSignUpSubmit: function handleSignUpSubmit() {
    // this.props.stateMutator();
    this.props.signIn();
    // this.setState({loggedIn: true});
  },
  componentDidMount: function componentDidMount() {
    // document.body.style.backgroundColor = "red";
    // document.body.style.backgroundImage =   "url('')";


  },
  SignOut: function SignOut() {
    if (this.props.isLoggedIn === true) {

      return _react2.default.createElement(
        'li',
        { onClick: this.props.signOut },
        'SIGN OUT'
      );
    } else {
      return _react2.default.createElement('br', null);
    }
  },
  render: function render() {
    return _react2.default.createElement(
      'main',
      null,
      _react2.default.createElement(_SignUp2.default, { handleSignUpSubmit: this.handleSignUpSubmit,
        isLoggedIn: this.props.isLoggedIn,
        signIn: this.props.signIn,
        stateMutator: this.props.stateMutator
      }),
      _react2.default.createElement(_SignIn2.default, {
        isLoggedIn: this.props.isLoggedIn,
        signIn: this.props.signIn,
        stateMutator: this.props.stateMutator
      }),
      _react2.default.createElement('ul', { id: 'link-options' })
    );
  }
});

exports.default = Intro;
});

require.register("components/Main.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Intro = require('./Intro');

var _Intro2 = _interopRequireDefault(_Intro);

var _ProjectFeed = require('./ProjectFeed');

var _ProjectFeed2 = _interopRequireDefault(_ProjectFeed);

var _ModalBasicExample = require('./ModalBasicExample');

var _ModalBasicExample2 = _interopRequireDefault(_ModalBasicExample);

var _SignIn = require('./SignIn');

var _SignIn2 = _interopRequireDefault(_SignIn);

var _NotFound = require('./NotFound');

var _NotFound2 = _interopRequireDefault(_NotFound);

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _ProjectBoard = require('./ProjectBoard');

var _ProjectBoard2 = _interopRequireDefault(_ProjectBoard);

var _ProjectActivity = require('./ProjectActivity');

var _ProjectActivity2 = _interopRequireDefault(_ProjectActivity);

var _ProjectPost = require('./ProjectPost');

var _ProjectPost2 = _interopRequireDefault(_ProjectPost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = _react2.default.createClass({
  displayName: 'Main',

  // getInitialState() {
  //   const loggedIn = this.props.isLoggedIn;
  //   const currentUser: {},
  //
  //   forumPost: {}
  //   return this.state = { email: '', password: '', loggedIn };
  // },


  getAllForum: function getAllForum() {
    // axios.get('/users/ft')
    //   .then(res => {
    //     this.setState({ forumPost: res.data });
    //   })
    //   .catch(err => {
    //     this.setState({ loadErr: err });
    //   });
    return this.props.getAllForum();
  },
  getCurrentUser: function getCurrentUser() {
    // axios.get('/users/currentuser')
    //   .then(res => {
    //     this.setState({ currentUser: res.data });
    //   })
    //   .catch(err => {
    //     this.setState({ loadErr: err });
    //   });
    return this.props.getCurrentUser();
  },


  // componentDidMount() {
  //   axios.get('/token')
  //     .then(res => {
  //       let isLoggedIn = res.data;
  //       if (isLoggedIn) {
  //         this.setState({ isLoggedIn: true });
  //         this.getCurrentUser();
  //         this.getAllForum();
  //         // this.getUserScores();
  //         // this.getUserFriends();
  //       } else {
  //         this.setState({ isLoggedIn: false });
  //       }
  //     })
  //     .catch(err => {
  //       this.setState({ loadErr: err });
  //     });
  // },


  signIn: function signIn() {
    return this.props.signIn();
    // this.setState({ isLoggedIn: true });
    // this.getCurrentUser();
    // this.getAllForum();
    // this.getAllUsers();
    // this.getUserScores();
  },
  signOut: function signOut() {
    return this.props.signOut();
    // axios.delete('/token')
    //   .then(res => {
    //     this.setState({
    //       currentUser: {},
    //       isLoggedIn: false
    //     });
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  },
  render: function render() {
    var _this = this;

    return _react2.default.createElement(
      'main',
      null,
      _react2.default.createElement(_reactRouter.Match, { pattern: '/', exactly: true, render: function render() {
          return _this.props.isLoggedIn ? _react2.default.createElement(_reactRouter.Redirect, { to: '/project-feed' }) : _react2.default.createElement(_Intro2.default, {
            signOut: _this.signOut,
            isLoggedIn: _this.props.isLoggedIn,
            signIn: _this.signIn,
            stateMutator: _this.props.stateMutator
          });
        } }),
      _react2.default.createElement(_reactRouter.Match, { pattern: '/project-feed', render: function render() {
          return _react2.default.createElement(_ProjectFeed2.default, {
            projects: _this.props.projects,
            currentUser: _this.props.currentUser,
            addProject: _this.props.addProject,
            addTask: _this.props.addTask,
            tasks: _this.props.tasks
          });
        } }),
      _react2.default.createElement(_reactRouter.Match, { pattern: '/projects', exactly: true, render: function render() {
          return _react2.default.createElement(_ProjectBoard2.default, {
            currentUser: _this.props.currentUser
          });
        } }),
      _react2.default.createElement(_reactRouter.Match, { pattern: '/projectactivity', exactly: true, render: function render() {
          return _react2.default.createElement(_ProjectActivity2.default, {
            currentUser: _this.props.currentUser,
            addProject: _this.props.addProject
          });
        } }),
      _react2.default.createElement(_reactRouter.Match, { pattern: '/create-project', exactly: true, render: function render() {
          return _react2.default.createElement(_ProjectPost2.default, {
            currentUser: _this.props.currentUser,
            addProject: _this.props.addProject,
            addTask: _this.props.addTask
          });
        } }),
      _react2.default.createElement(_reactRouter.Miss, { component: _NotFound2.default })
    );
  }
});

exports.default = Main;
});

require.register("components/ModalBasicExample.jsx", function(exports, require, module) {
// import React from 'react'
// import { Button, Header, Icon, Modal } from 'semantic-ui-react'
// import { Match } from 'react-router';
// import { Link, Redirect } from 'react-router';
//
// const ModalBasicExample = () => (
//   <Modal trigger={<Button>Basic Modal</Button>} basic size='small'>
//     <Header icon='archive' content='Archive Old Messages' />
//     <Modal.Content>
//       <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p>
//     </Modal.Content>
//     <Modal.Actions>
//       <Button basic color='red' inverted>
//         <Icon name='remove' /> No
//       </Button>
//       <Button color='green' inverted>
//         <Icon name='checkmark' /> Yes
//       </Button>
//     </Modal.Actions>
//   </Modal>
//
//
// )
//
// export default ModalBasicExample
"use strict";
});

;require.register("components/NotFound.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotFound = _react2.default.createClass({
  displayName: 'NotFound',
  render: function render() {
    return _react2.default.createElement(
      'main',
      null,
      _react2.default.createElement(
        'p',
        null,
        'We couldn\'t find the page you are looking for'
      )
    );
  }
});

exports.default = NotFound;
});

require.register("components/ProjectActivity.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectActivity = _react2.default.createClass({
  displayName: 'ProjectActivity',
  getInitialState: function getInitialState() {
    return {
      projectActivity: {
        task: '',
        taskValue: 0
      }
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    _axios2.default.get('/api/activity').then(function (res) {
      _this.setState({ projectActivity: res.data });
    }).catch(function (err) {
      console.log('hey');
      _this.setState({ loadErr: err });
    });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'col s12 m6' },
        _react2.default.createElement(
          'div',
          { className: 'card' },
          _react2.default.createElement(
            'div',
            { className: 'card-content black-text' },
            _react2.default.createElement(
              'span',
              { className: 'card-title' },
              'Project Task: ',
              this.state.projectActivity.task
            ),
            _react2.default.createElement(
              'p',
              null,
              'Task Value:',
              this.state.projectActivity.taskValue
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'card-action' },
            _react2.default.createElement(
              'a',
              { href: '#' },
              'View Task'
            ),
            _react2.default.createElement(
              'a',
              { href: '#' },
              'Forum'
            )
          )
        )
      )
    );
  }
});

exports.default = ProjectActivity;
});

require.register("components/ProjectBoard.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectBoard = _react2.default.createClass({
  displayName: 'ProjectBoard',
  getInitialState: function getInitialState() {
    return {
      projectBoard: {
        title: '',
        description: ''
      }
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    _axios2.default.get('/api/boards').then(function (res) {
      _this.setState({ projectBoard: res.data });
    }).catch(function (err) {
      console.log('hey');
      _this.setState({ loadErr: err });
    });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'col s12 m6' },
        _react2.default.createElement(
          'div',
          { className: 'card' },
          _react2.default.createElement(
            'div',
            { className: 'card-content black-text' },
            _react2.default.createElement(
              'span',
              { className: 'card-title' },
              'Project Title: ',
              this.state.projectBoard.title
            ),
            _react2.default.createElement(
              'p',
              null,
              this.state.projectBoard.description
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'card-action' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/projectactivity' },
              'View Task'
            ),
            _react2.default.createElement(
              'a',
              { href: '#' },
              'Forum'
            )
          )
        )
      )
    );
  }
});

exports.default = ProjectBoard;
});

require.register("components/ProjectCard.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _ViewTask = require('./ViewTask');

var _ViewTask2 = _interopRequireDefault(_ViewTask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectCard = _react2.default.createClass({
  displayName: 'ProjectCard',
  render: function render() {
    console.log('creating project card');
    return _react2.default.createElement(
      'div',
      { className: 'col s12 m4' },
      _react2.default.createElement(
        'div',
        { className: 'card' },
        _react2.default.createElement(
          'div',
          { className: 'card-content black-text' },
          _react2.default.createElement(
            'span',
            { className: 'card-title' },
            'Project Title: ',
            this.props.title
          ),
          _react2.default.createElement(
            'p',
            null,
            'Description:',
            this.props.description
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'card-action' },
          _react2.default.createElement(_ViewTask2.default, {
            projectId: this.props.projectId,
            tasks: this.props.tasks
          }),
          _react2.default.createElement(
            'a',
            { href: '#' },
            'Forum'
          )
        )
      )
    );
  }
});

exports.default = ProjectCard;
});

require.register("components/ProjectFeed.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Intro = require('./Intro');

var _Intro2 = _interopRequireDefault(_Intro);

var _Forum = require('./Forum');

var _Forum2 = _interopRequireDefault(_Forum);

var _ProjectPost = require('./ProjectPost');

var _ProjectPost2 = _interopRequireDefault(_ProjectPost);

var _Header = require('./layout/Header');

var _Header2 = _interopRequireDefault(_Header);

var _reactRouter = require('react-router');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _ProjectCard = require('./ProjectCard');

var _ProjectCard2 = _interopRequireDefault(_ProjectCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectFeed = _react2.default.createClass({
  displayName: 'ProjectFeed',
  getInitialState: function getInitialState() {
    return {
      ftext: ''
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    _axios2.default.get('/api/boards').then(function (res) {
      var projects = res.data;
      _this.props.addProject(projects);
      _axios2.default.get('/api/activity').then(function (res) {
        console.log(JSON.stringify(res.data) + 'RES DAYA');
        _this.props.addTask(res.data);
      }).catch(function (err) {
        console.error(err);
      });
    }).catch(function (err) {
      console.log(err);
    });
  },
  projectCards: function projectCards() {
    console.log(this.props.projects.length, ' LENGTH');
    var projectCards = [];
    for (var i = 0; i < this.props.projects.length; i++) {
      projectCards.push(_react2.default.createElement(_ProjectCard2.default, {
        key: i,
        title: this.props.projects[i].title,
        description: this.props.projects[i].description,
        projectId: this.props.projects[i].id,
        tasks: this.props.tasks
      }));
    }

    return projectCards;
  },
  render: function render() {
    // console.log(this.props.projects.legnth+ 'length');
    if (this.props.projects.length === 0) {
      return false;
    }

    return _react2.default.createElement(
      'div',
      { className: 'row' },
      this.projectCards()
    );
  }
});
// import Score from './Score';
// import Friends from './Friends';
exports.default = ProjectFeed;
});

require.register("components/ProjectPost.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectPost = _react2.default.createClass({
  displayName: 'ProjectPost',
  getInitialState: function getInitialState() {
    return {
      posted: false,
      projectId: null
    };
  },
  post: function post() {
    var _this = this;

    event.preventDefault();

    var project = { title: this.refs.title.value,
      description: this.refs.description.value
    };

    _axios2.default.post('/users/board', project).then(function (res) {
      _this.props.addProject(project);
      _this.setState({ posted: true,
        projectId: res.data[0].id
      });
      console.log(res.data);

      // this.props.stateMutator();
      // this.setState({loggedIn: true});
      // this.props.signIn;
    }).catch(function (err) {
      console.error(err);
    });
  },
  postActivity: function postActivity() {
    var _this2 = this;

    event.preventDefault();

    var task = { task: this.refs.task.value,
      taskValue: this.refs.taskValue.value,
      projectId: this.state.projectId
    };

    _axios2.default.post('/api/activity', task).then(function (res) {
      _this2.props.addTask(task);
      _this2.refs.task.value = '';
      _this2.refs.taskValue.value = '';
    }).catch(function (err) {
      console.error(err);
    });
  },
  task: function task() {
    if (this.state.posted === false) {
      return;
    }
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('input', { ref: 'task', placeholder: 'Task', name: 'task', type: 'text' }),
      _react2.default.createElement('input', { ref: 'taskValue', placeholder: 'TaskValue', name: 'taskValue', type: 'number' }),
      _react2.default.createElement(
        'button',
        { onClick: this.postActivity },
        ' Post Task'
      )
    );
  },
  postBoard: function postBoard() {
    if (this.state.posted === true) {
      return;
    }

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('input', { placeholder: 'Project Title', ref: 'title', name: 'title', type: 'text' }),
      _react2.default.createElement('input', { placeholder: 'Project Description', ref: 'description', name: 'description', type: 'text' }),
      _react2.default.createElement(
        'button',
        { onClick: this.post },
        'Post'
      )
    );
  },
  render: function render() {
    console.log(this.props.addProject);
    return _react2.default.createElement(
      'div',
      null,
      this.postBoard(),
      this.task()
    );
  }
});

exports.default = ProjectPost;
});

require.register("components/ProjectTask.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectTask = _react2.default.createClass({
  displayName: 'ProjectTask',
  render: function render() {
    console.log('creating project task');
    return _react2.default.createElement(
      'div',
      { className: 'col s12' },
      _react2.default.createElement(
        'div',
        { className: 'card' },
        _react2.default.createElement(
          'div',
          { className: 'card-content black-text' },
          _react2.default.createElement(
            'span',
            { className: 'card-title' },
            'Task: ',
            this.props.task
          ),
          _react2.default.createElement(
            'p',
            null,
            'Task Value:',
            this.props.taskValue
          )
        )
      )
    );
  }
});

exports.default = ProjectTask;
});

require.register("components/ProjectTasks.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Intro = require('./Intro');

var _Intro2 = _interopRequireDefault(_Intro);

var _Forum = require('./Forum');

var _Forum2 = _interopRequireDefault(_Forum);

var _ProjectPost = require('./ProjectPost');

var _ProjectPost2 = _interopRequireDefault(_ProjectPost);

var _Header = require('./layout/Header');

var _Header2 = _interopRequireDefault(_Header);

var _reactRouter = require('react-router');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _ProjectTask = require('./ProjectTask');

var _ProjectTask2 = _interopRequireDefault(_ProjectTask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectTasks = _react2.default.createClass({
  displayName: 'ProjectTasks',
  projectTasks: function projectTasks() {
    var projectTasks = [];
    for (var i = 0; i < this.props.tasks.length; i++) {
      projectTasks.push(_react2.default.createElement(_ProjectTask2.default, {
        key: i,
        task: this.props.tasks[i].task,
        taskValue: this.props.tasks[i].taskValue

      }));
    }

    console.log(projectTasks, ' PROJECT TASKS');

    return projectTasks;
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'row' },
      this.projectTasks()
    );
  }
});
// import Score from './Score';
// import Friends from './Friends';
exports.default = ProjectTasks;
});

require.register("components/SignIn.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _SignUp = require('./SignUp');

var _SignUp2 = _interopRequireDefault(_SignUp);

var _reactRouter = require('react-router');

var _FadeModal = require('boron/FadeModal');

var _FadeModal2 = _interopRequireDefault(_FadeModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modalStyle = {
  height: '500px',
  width: '500px'

};
var SignIn = _react2.default.createClass({
  displayName: 'SignIn',
  handleSubmit: function handleSubmit(event) {
    var _this = this;

    event.preventDefault();

    var data = { email: this.refs.email.value,
      password: this.refs.password.value
    };
    console.log(data);

    _axios2.default.post('/token', data).then(function (res) {
      // this.props.stateMutator();
      console.log(res.data);
      _this.props.signIn();
      // this.setState({loggedIn: true});
      // this.props.signIn;
    }).catch(function (err) {
      console.error(err);
    });
  },

  showModal: function showModal() {
    this.refs.modal.show();
  },
  hideModal: function hideModal() {
    this.refs.modal.hide();
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'button',
        { onClick: this.showModal },
        'Login'
      ),
      _react2.default.createElement(
        _FadeModal2.default,
        { modalStyle: modalStyle, ref: 'modal', keyboard: this.callback },
        _react2.default.createElement(
          'div',
          { id: 'signin-signup' },
          _react2.default.createElement(
            'p',
            null,
            'Sign in if you already have an account'
          ),
          _react2.default.createElement(
            'form',
            { onSubmit: this.handleSubmit },
            _react2.default.createElement('input', { ref: 'email', placeholder: 'Email', name: 'email', type: 'email', onChange: this.handleChange }),
            _react2.default.createElement('input', { ref: 'password', placeholder: 'Password', name: 'password', type: 'password', onChange: this.handleChange }),
            _react2.default.createElement(
              'button',
              { type: 'submit' },
              'Login'
            )
          )
        )
      )
    );
  }
});

exports.default = SignIn;
});

require.register("components/SignUp.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reactRouter = require('react-router');

var _FadeModal = require('boron/FadeModal');

var _FadeModal2 = _interopRequireDefault(_FadeModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var modalStyle = {
  height: '500px',
  width: '500px'

};
var SignUp = _react2.default.createClass({
  displayName: 'SignUp',

  // getInitialState() {
  //   return this.state = {
  //     email: '',
  //     first_name:'',
  //     last_name:'',
  //     password: ''
  //   };
  // },

  handleChange: function handleChange(event) {
    this.setState(_defineProperty({}, event.target.name, event.target.value));
  },
  handleSubmit: function handleSubmit(event) {
    var _this = this;

    event.preventDefault();

    var data = { email: this.refs.email.value,
      first_name: this.refs.first_name.value,
      last_name: this.refs.last_name.value,
      password: this.refs.password.value
    };

    _axios2.default.post('/users', data).then(function (res) {
      console.log('successfully posted user');
      _axios2.default.post('/token', data).then(function (res) {
        console.log('successfully posted token');
        // this.props.handleSignUpSubmit();
        // this.props.stateMutator();

        _this.props.signIn();
      }).catch(function (err) {
        console.error(err);
      });
    }).catch(function (err) {
      console.log(err);
    });
  },

  showModal: function showModal() {
    this.refs.modal2.show();
  },
  hideModal: function hideModal() {
    this.refs.modal2.hide();
  },

  signUpForm: function signUpForm() {
    if (this.props.isLoggedIn) {
      return _react2.default.createElement(_reactRouter.Redirect, { to: '/projects' });
    } else {
      return _react2.default.createElement(
        'div',
        { id: 'signin-signup' },
        _react2.default.createElement(
          'h3',
          null,
          'Sign Up'
        ),
        _react2.default.createElement(
          'form',
          { onSubmit: this.handleSubmit },
          _react2.default.createElement('input', { placeholder: 'Email', refs: 'email', name: 'email', type: 'email', onChange: this.handleChange }),
          _react2.default.createElement('input', { placeholder: 'First name', refs: 'first_name', name: 'first_name', type: 'text', onChange: this.handleChange }),
          _react2.default.createElement('input', { placeholder: 'Last name', refs: 'last_name', name: 'last_name', type: 'text', onChange: this.handleChange }),
          _react2.default.createElement('input', { placeholder: 'Password', refs: 'password', name: 'password', type: 'password', onChange: this.handleChange }),
          _react2.default.createElement(
            'button',
            { type: 'submit' },
            'Sign up'
          )
        )
      );
    }
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'button',
        { onClick: this.showModal },
        'SignUp'
      ),
      _react2.default.createElement(
        _FadeModal2.default,
        { modalStyle: modalStyle, ref: 'modal2', keyboard: this.callback },
        _react2.default.createElement(
          'div',
          { id: 'signin-signup' },
          _react2.default.createElement(
            'h3',
            null,
            'Sign Up'
          ),
          _react2.default.createElement(
            'form',
            { onSubmit: this.handleSubmit },
            _react2.default.createElement('input', { placeholder: 'Email', ref: 'email', name: 'email', type: 'email', onChange: this.handleChange }),
            _react2.default.createElement('input', { placeholder: 'First name', ref: 'first_name', name: 'first_name', type: 'text', onChange: this.handleChange }),
            _react2.default.createElement('input', { placeholder: 'Last name', ref: 'last_name', name: 'last_name', type: 'text', onChange: this.handleChange }),
            _react2.default.createElement('input', { placeholder: 'Password', ref: 'password', name: 'password', type: 'password', onChange: this.handleChange }),
            _react2.default.createElement(
              'button',
              { type: 'submit' },
              'Sign up'
            )
          )
        )
      )
    );
  }
});

exports.default = SignUp;
});

require.register("components/ViewTask.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _ProjectTasks = require('./ProjectTasks');

var _ProjectTasks2 = _interopRequireDefault(_ProjectTasks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ViewTask = _react2.default.createClass({
  displayName: 'ViewTask',
  getInitialState: function getInitialState() {
    return { clicked: false };
  },
  changestate: function changestate() {
    this.setState({ clicked: true });
  },
  tasks: function tasks(projectSpecificTasks) {
    if (this.state.clicked === false) {
      return;
    }

    console.log(projectSpecificTasks, ' PROJECT SPECIFIC TASKS');

    return _react2.default.createElement(_ProjectTasks2.default, {
      tasks: projectSpecificTasks
    });
  },
  render: function render() {
    var _this = this;

    var projectSpecificTasks = this.props.tasks.filter(function (task) {
      return task.projectId === _this.props.projectId;
    });
    console.log(projectSpecificTasks);
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'button',
        { onClick: this.changestate },
        'View Task'
      ),
      _react2.default.createElement(
        'div',
        null,
        this.tasks(projectSpecificTasks)
      )
    );
  }
});

exports.default = ViewTask;
});

require.register("components/layout/Footer.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = _react2.default.createClass({
  displayName: "Footer",
  render: function render() {
    return _react2.default.createElement(
      "footer",
      { className: "blue darken-3 page-footer" },
      _react2.default.createElement(
        "div",
        { className: "footer-copyright" },
        _react2.default.createElement(
          "div",
          { className: "container" },
          "\xA9 2016 KWH"
        )
      )
    );
  }
});

exports.default = Footer;
});

require.register("components/layout/Header.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Button, Image, Modal, Form,Select,Input,Menu} from 'semantic-ui-react'

var Header = _react2.default.createClass({
  displayName: 'Header',
  signOut: function signOut() {
    return this.props.signOut();
  },
  render: function render() {
    return _react2.default.createElement(
      'nav',
      null,
      _react2.default.createElement(
        'div',
        { className: 'nav-wrapper' },
        _react2.default.createElement(
          'a',
          { href: '#', className: 'brand-logo' },
          'Brand'
        ),
        _react2.default.createElement(
          'ul',
          { id: 'nav-mobile', className: 'right hide-on-med-and-down' },
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              { href: 'sass.html' },
              'Profile'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/create-project' },
              'Post New Project'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/projects' },
              'Projects'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              { href: 'collapsible.html' },
              'Signout'
            )
          )
        )
      )
    );
  }
});
// import { Lin} from 'react-router';
exports.default = Header;
});

require.register("index.jsx", function(exports, require, module) {
'use strict';

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById('app'));
});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map