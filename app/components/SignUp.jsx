import React from 'react';
import axios from 'axios';
// import { Button, Header, Image, Modal, Form, Select, Input} from 'semantic-ui-react'
import { Link, Redirect } from 'react-router';


const SignUp = React.createClass({
  getInitialState() {
    return this.state = {
      email: '',
      first_name:'',
      last_name:'',
      password: ''
    };
  },
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  },

  handleSubmit(event) {
    event.preventDefault();
    let data = { email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      password: this.state.password
    };

    axios.post('/users', data)
      .then(res => {
        console.log('successfully posted user');
        axios.post('/token', data)
          .then(res => {
            console.log('successfully posted token');
            // this.props.handleSignUpSubmit();
            // this.props.stateMutator();

            this.props.signIn();
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  },
blah2() {
  if (this.props.isLoggedIn) {
  return <Redirect to="/user" />
} else {
  return <div id="signin-signup">

    <h3>Sign Up</h3>
      <form onSubmit={this.handleSubmit}>
      <input placeholder="Email" name="email" type="email" onChange={this.handleChange} />
      <input placeholder="First name" name="first_name" type="text" onChange={this.handleChange} />
      <input placeholder="Last name" name="last_name" type="text" onChange={this.handleChange} />
      <input placeholder="Password" name="password" type="password" onChange={this.handleChange} />
      <button type="submit">Sign up</button>
    </form>
  </div>
}
},
  render() {
    return (
      <this.blah2/>
    )
  }
});

export default SignUp;
