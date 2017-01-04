import React from 'react';
import axios from 'axios';
import SignUp from './SignUp';
// import Header from './layout/Header';
import { Link, Redirect } from 'react-router';
import { Button, Header, Image, Modal, Form,Select,Input} from 'semantic-ui-react'

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
        this.props.signIn();
        this.setState({loggedIn: true});
      })
      .catch(err => {
        console.error(err);
      });
  },

  handleSignUpSubmit() {
    this.props.signIn();
    this.setState({loggedIn: true});
  },

  SignInOrSignUp() {
    if (this.state.loggedIn) {
      return <Redirect to="/" />
    } else {
      return <div>
        <Modal trigger={<Button>Log In</Button>}>
          <Modal.Header>Brand Yourself</Modal.Header>
          <Modal.Content >
            <Modal.Description>
              <Header>Sign In</Header>
               <Form onSubmit={this.handleSubmit}>
                 {/* <Form.Input label='Name' name='name' placeholder='Name' /> */}
                 <input placeholder="Email" name="email" type="email" onChange={this.handleChange} />
                 <input placeholder="Password" name="password" type="password" onChange={this.handleChange} />
                 {/* <button type="submit">SUBMIT</button> */}
                 <Button>Log In</Button>
              </Form>

            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    }
  },

  render() {
    return (

        <this.SignInOrSignUp />
    )
  }
});

export default SignIn;
