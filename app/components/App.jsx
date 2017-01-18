import { BrowserRouter } from 'react-router';
import React from 'react';
import Main from './Main';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Intro from './Intro';
import ModalBasicExample from './ModalBasicExample';
import SignIn from './SignIn';
import NotFound from './NotFound';
import { Miss, Match } from 'react-router';
import axios from 'axios';
import ProjectBoard from './ProjectBoard';
import { Link, Redirect } from 'react-router';
import Notifications, {notify} from 'react-notify-toast';

const App = React.createClass({
  getInitialState() {
    return {
      currentUser: {},
      isLoggedIn: false,
      forumPost: {},
      projects:[],
      tasks:[],
      allProjects:[],
      allTasks:[]
    }
  },

  clearProject() {
      const empty = [];
      this.setState({projects:empty, tasks: empty})
  },
  clearAllProject() {
      const empty = [];
      this.setState({allProjects:empty, allTasks: empty})
  },

  addProject(project) {
    console.log(project, ' PROJECT');
    const nextProjects = this.state.projects.concat(project);
    this.setState({projects:nextProjects})
  },
  addTask(task) {
    const nextTasks = this.state.tasks.concat(task);
    this.setState({tasks:nextTasks})
  },
  stateMutator() {
    this.setState({ isLoggedIn: true });
  },
  getAllForum() {
    axios.get('/users/ft')
      .then(res => {
        this.setState({ forumPost: res.data });
      })
      .catch(err => {
        this.setState({ loadErr: err });
      });
  },
  getCurrentUser() {
    axios.get('/users/currentuser')
      .then(res => {
        this.setState({ currentUser: res.data });
      })
      .catch(err => {
        this.setState({ loadErr: err });
      });
  },
  getAllProjects() {
    axios.get('/api/allprojects')
      .then(res => {
        this.setState({ allProjects: res.data });
      })
      .catch(err => {
        this.setState({ loadErr: err });
      });
  },
  getAllTasks() {
    axios.get('/api/alltasks')
      .then(res => {
        this.setState({ allTasks: res.data });
      })
      .catch(err => {
        this.setState({ loadErr: err });
      });
  },
  componentDidMount() {
    axios.get('/token')
      .then(res => {
        let isLoggedIn = res.data;
        if (isLoggedIn) {
          this.setState({ isLoggedIn: true });
          this.getCurrentUser();
          this.getAllProjects();
          this.getAllTask();
          // this.getUserFriends();
        } else {
          this.setState({ isLoggedIn: false });
        }
      })
      .catch(err => {
        this.setState({ loadErr: err });
      });
  },

componentWillMount(){
  this.getAllProjects();
  this.getAllTasks();
},
  signIn() {
    this.setState({ isLoggedIn: true });

      this.getCurrentUser();

  },

  signOut() {
    axios.delete('/token')
      .then(res => {
        this.setState({
          currentUser: {},
          isLoggedIn: false
        });
      })
      .catch(err => {
        console.error(err);
      });
  },

  render() {
    return (

      <BrowserRouter>
        <div>
          <Notifications/>
          <Header
            { ...this.state }
            signOut={this.signOut}
          />

          <Main
            { ...this.state }
            signOut={this.signOut}
            signIn={this.signIn}
            getCurrentUser={this.getCurrentUser}
            getAllForum={this.getAllForum}
            stateMutator={this.stateMutator}
            addProject={this.addProject}
            addTask={this.addTask}
            getAllProjects={this.getAllProjects}
            getAllTask = {this.getAllTask}
            clearProject = {this.clearProject}
            clearAllProject = {this.clearAllProject}

          />

          <Footer />
        </div>
      </BrowserRouter>
    )
  }
});

export default App;
