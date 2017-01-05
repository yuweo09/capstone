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

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

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
      forumPost: {}
    };
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
    this.setState({ isLoggedIn: true });
    if (this.state.isLoggedIn) {
      this.getCurrentUser();
      // this.getAllForum();
      return _react2.default.createElement(_reactRouter.Redirect, { to: '/user' });
    } else {
      return _react2.default.createElement(_reactRouter.Redirect, { to: '/intro' });
    }
    // this.getAllUsers();
    // this.getUserScores();
  },
  signOut: function signOut() {
    var _this3 = this;

    _axios2.default.delete('/token').then(function (res) {
      _this3.setState({
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
          stateMutator: this.stateMutator

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
    this.props.stateMutator();
    this.props.signIn();
    this.setState({ loggedIn: true });
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

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

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
          return _react2.default.createElement(_Intro2.default, {
            signOut: _this.signOut,
            isLoggedIn: _this.props.isLoggedIn,
            signIn: _this.signIn,
            stateMutator: _this.props.stateMutator
          });
        } }),
      _react2.default.createElement(_reactRouter.Miss, { component: _NotFound2.default }),
      _react2.default.createElement(_reactRouter.Match, { pattern: '/user', render: function render() {
          return _react2.default.createElement(_User2.default, null);
        } }),
      _react2.default.createElement(_reactRouter.Match, { pattern: '/projectboard', exactly: true, render: function render() {
          return _react2.default.createElement(_ProjectBoard2.default, null);
        } })
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

require.register("components/ProjectBoard.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Button, Header, Image, Modal, Form,Select,Input, Card, Icon} from 'semantic-ui-react'

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

    _axios2.default.get('/users/board').then(function (res) {
      _this.setState({ projectBoard: res.data });
    }).catch(function (err) {
      console.log('hey');
      _this.setState({ loadErr: err });
    });
  },
  render: function render() {
    return _react2.default.createElement('div', null);
  }
});

exports.default = ProjectBoard;
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SignIn = _react2.default.createClass({
  displayName: 'SignIn',
  getInitialState: function getInitialState() {
    var loggedIn = this.props.isLoggedIn;

    return this.state = { email: '', password: '', loggedIn: loggedIn };
  },
  handleChange: function handleChange(event) {
    this.setState(_defineProperty({}, event.target.name, event.target.value));
  },
  handleSubmit: function handleSubmit(event) {
    var _this = this;

    event.preventDefault();

    var data = { email: this.state.email,
      password: this.state.password
    };
    _axios2.default.post('/token', data).then(function (res) {
      _this.props.stateMutator();
      _this.props.signIn();
      _this.setState({ loggedIn: true });
      _this.props.signIn;
    }).catch(function (err) {
      console.error(err);
    });
  },
  handleSignUpSubmit: function handleSignUpSubmit() {
    this.props.signIn();
    this.props.stateMutator();

    this.setState({ loggedIn: true });
  },
  render: function render() {
    return _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        'h3',
        null,
        'Sign In'
      ),
      _react2.default.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        _react2.default.createElement('input', { placeholder: 'Email', name: 'email', type: 'email', onChange: this.handleChange }),
        _react2.default.createElement('input', { placeholder: 'Password', name: 'password', type: 'password', onChange: this.handleChange }),
        _react2.default.createElement('input', { type: 'submit', value: 'Sign In' })
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
// import { Button, Header, Image, Modal, Form, Select, Input} from 'semantic-ui-react'


var SignUp = _react2.default.createClass({
  displayName: 'SignUp',
  getInitialState: function getInitialState() {
    return this.state = {
      email: '',
      first_name: '',
      last_name: '',
      password: ''
    };
  },
  componentDidMount: function componentDidMount() {
    $('#modal1').modal('open');
  },
  handleChange: function handleChange(event) {
    this.setState(_defineProperty({}, event.target.name, event.target.value));
  },
  handleSubmit: function handleSubmit(event) {
    var _this = this;

    event.preventDefault();
    var data = { email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      password: this.state.password
    };

    _axios2.default.post('/users', data).then(function (res) {
      console.log('successfully posted user');
      _axios2.default.post('/token', data).then(function (res) {
        console.log('successfully posted token');
        // this.props.handleSignUpSubmit();
        _this.props.stateMutator();

        _this.props.signIn();
      }).catch(function (err) {
        console.error(err);
      });
    }).catch(function (err) {
      console.log(err);
    });
  },
  render: function render() {
    return _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Sign Up'
      ),
      _react2.default.createElement(
        'form',
        null,
        _react2.default.createElement('input', { placeholder: 'Email', name: 'email', type: 'email', onChange: this.handleChange }),
        _react2.default.createElement('input', { placeholder: 'First name', name: 'first_name', type: 'text', onChange: this.handleChange }),
        _react2.default.createElement('input', { placeholder: 'Last name', name: 'last_name', type: 'text', onChange: this.handleChange }),
        _react2.default.createElement('input', { placeholder: 'Password', name: 'password', type: 'password', onChange: this.handleChange }),
        _react2.default.createElement('input', { type: 'submit', value: 'Sign Up' })
      )
    );
  }
});

exports.default = SignUp;
});

require.register("components/User.jsx", function(exports, require, module) {
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

var _Header = require('./layout/Header');

var _Header2 = _interopRequireDefault(_Header);

var _reactRouter = require('react-router');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _react2.default.createClass({
  displayName: 'User',
  getInitialState: function getInitialState() {
    return {
      ftext: ''
    };
  },
  componentDidMount: function componentDidMount() {
    document.body.style.backgroundImage = "url('')";
  },
  handleSubmit: function handleSubmit(event) {
    event.preventDefault();
    var data = { text: event.target.value };

    _axios2.default.post('/users/forum', data).then(function (res) {
      console.log('successfully posted forum');
      _axios2.default.post('/users/forumt').then(function (res) {
        console.log('successfully posted forumt');
      }).catch(function (err) {
        console.error(err);
      });
    }).catch(function (err) {
      console.log(err);
    });
  },
  handleSubmit2: function handleSubmit2(event) {
    event.preventDefault();
    _axios2.default.post('/users/board').then(function (res) {
      console.log('successfully posted board');
      _axios2.default.post('/users/boarda', res).then(function (res) {
        console.log('successfully posted board activity');
      }).catch(function (err) {
        console.error(err);
      });
    }).catch(function (err) {
      console.log(err);
    });
  },
  handleSubmit3: function handleSubmit3(event) {
    // event.preventDefault();
    //
    // axios.get('/users/forum')
    //   .then(res => {
    //     console.log('successfully retrieved forum');
    //     axios.get('/users/forumt', res)
    //       .then(res => {
    //         console.log('in the are');
    //         console.log(res);
    //         this.setState({ftext: res.text});
    //         console.log('successfully retrieved forum text');
    //
    //       })
    //       .catch(err => {
    //         console.error(err);
    //       });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { id: 'w' },
        _react2.default.createElement(
          'div',
          { id: 'user-content', className: 'clearfix' },
          _react2.default.createElement(
            'h1',
            null,
            this.props.currentUser.name
          ),
          _react2.default.createElement(
            'nav',
            { id: 'profiletabs' },
            _react2.default.createElement(
              'ul',
              { id: 'tabs' },
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  _reactRouter.Link,
                  { to: '/user/score' },
                  'bthe'
                )
              )
            )
          ),
          _react2.default.createElement(
            'form',
            { onSubmit: this.handleSubmit },
            _react2.default.createElement('input', { placeholder: 'text', name: 'text', type: 'text' }),
            _react2.default.createElement(
              'button',
              { type: 'submit' },
              'SUBMIT'
            )
          ),
          _react2.default.createElement(
            'form',
            { onSubmit: this.handleSubmit2 },
            _react2.default.createElement(
              'h1',
              null,
              this.props.forumPost.text
            ),
            _react2.default.createElement(
              'button',
              { type: 'submit' },
              'Add to db'
            )
          )
        )
      )
    );
  }
});
// import Score from './Score';
// import Friends from './Friends';
exports.default = User;
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
          'Logo'
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
              'Sass'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              { href: 'badges.html' },
              'Components'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              { href: 'collapsible.html' },
              'JavaScript'
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