import { BrowserRouter } from 'react-router';
import React from 'react';
import Main from './Main';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Intro from './Intro';
import User from './User';
import ModalBasicExample from './ModalBasicExample';
import SignIn from './SignIn';
import NotFound from './NotFound';
import { Miss, Match } from 'react-router';
import axios from 'axios';
import ProjectBoard from './ProjectBoard';
import { Link, Redirect } from 'react-router';

const App = React.createClass({
  getInitialState() {
    return {
      currentUser: {},
      isLoggedIn: false,
      forumPost: {}
    }
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



  signIn() {
    this.setState({ isLoggedIn: true });
    if(this.state.isLoggedIn) {
      this.getCurrentUser();
      // this.getAllForum();
      return <Redirect to="/user" />
    }else{
      return <Redirect to="/intro" />
    }
    // this.getAllUsers();
    // this.getUserScores();
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

          />

          <Footer />
        </div>
      </BrowserRouter>
    )
  }
});

export default App;
