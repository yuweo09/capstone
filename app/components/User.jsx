import React from 'react';
import Intro from './Intro';
// import Score from './Score';
// import Friends from './Friends';
import Forum from './Forum';
import ProjectPost from './ProjectPost';
import Header from './layout/Header';
import { Match } from 'react-router';
import { Link, Redirect } from 'react-router';
import axios from 'axios';

const User = React.createClass({
  getInitialState() {
    return {
      ftext: ''
    }
  },
  componentDidMount(){
    document.body.style.backgroundImage =   "url('')";
  },
  handleSubmit(event) {
    event.preventDefault();
    let data = { text: event.target.value };

    axios.post('/users/forum', data)
      .then(res => {
        console.log('successfully posted forum');
        axios.post('/users/forumt')
          .then(res => {
            console.log('successfully posted forumt');
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  },
  handleSubmit2(event) {
    event.preventDefault();
    axios.post('/users/board')
      .then(res => {
        console.log('successfully posted board');
        axios.post('/users/boarda', res)
          .then(res => {
            console.log('successfully posted board activity');
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  },
  handleSubmit3(event) {
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
  render() {
    return (
      <ProjectPost />
    )
  }
});

export default User;
