import React from 'react';
import axios from 'axios';
import SignUp from './SignUp';
import { Link, Redirect } from 'react-router';

const SignIn = React.createClass({
  getInitialState() {
    const loggedIn = this.props.isLoggedIn;

    return this.state = { email: '', password: '', loggedIn };
  },

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  },

  handleSubmit(event) {
    event.preventDefault();

    let data = { email: this.state.email,
      password: this.state.password
    };

    axios.post('/token', data)
      .then(res => {
        // this.props.stateMutator();
        this.props.signIn();
        // this.setState({loggedIn: true});
        // this.props.signIn;
      })
      .catch(err => {
        console.error(err);
      });
  },

  handleSignUpSubmit() {
    this.props.signIn();
    this.props.stateMutator();

    this.setState({loggedIn: true});
  },

  signInForm() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/user" />
    } else {
      return <div id="signin-signup">
        <p>Sign in if you already have an account</p>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Email" name="email" type="email" onChange={this.handleChange} />
          <input placeholder="Password" name="password" type="password" onChange={this.handleChange} />
          <button type="submit">Login</button>
        </form>
      </div>
    }
  },

  render() {
    return (
      <this.signInForm/>
    )
  }
});

export default SignIn;
