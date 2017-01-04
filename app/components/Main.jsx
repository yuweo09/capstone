import Intro from './Intro';
import User from './User';
import ModalBasicExample from './ModalBasicExample';
import SignIn from './SignIn';
import NotFound from './NotFound';
import { Miss, Match } from 'react-router';
import React from 'react';
import axios from 'axios';
import ProjectBoard from './ProjectBoard';


const Main = React.createClass({
  // getInitialState() {
  //   const loggedIn = this.props.isLoggedIn;
  //   const currentUser: {},
  //
  //   forumPost: {}
  //   return this.state = { email: '', password: '', loggedIn };
  // },


  getAllForum() {
    // axios.get('/users/ft')
    //   .then(res => {
    //     this.setState({ forumPost: res.data });
    //   })
    //   .catch(err => {
    //     this.setState({ loadErr: err });
    //   });
    return this.props.getAllForum();
  },
  getCurrentUser() {
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



  signIn() {
    return this.props.signIn();
    // this.setState({ isLoggedIn: true });
    // this.getCurrentUser();
    // this.getAllForum();
    // this.getAllUsers();
    // this.getUserScores();
  },

  signOut() {
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

  render() {
    return (
      <main>
        <Match pattern="/" exactly render={
          () => <Intro
                  signOut={this.signOut}
                /> } />
        <Match pattern="/signin" exactly render={
          () => <SignIn
                  { ...this.props }
                  signIn={this.signIn}
                /> } />
        <Miss component={NotFound} />
        <Match pattern="/user"  render={ () => <User { ...this.props } /> } />
        <Match pattern="/" exactly render={
          () => <ProjectBoard
                /> } />
      </main>
      )

  }
});

export default Main;
