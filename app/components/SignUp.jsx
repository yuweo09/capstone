import React from 'react';
import axios from 'axios';
import { Button, Header, Image, Modal, Form,Select,Input} from 'semantic-ui-react'

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
            this.props.handleSignUpSubmit();
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  },
signUP(){
  if (this.props.isLoggedIn) {
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
               <input placeholder="First name" name="first_name" type="text" onChange={this.handleChange} />
               <input placeholder="Last name" name="last_name" type="text" onChange={this.handleChange} />
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
      <div>
            <this.SignUP />
          </div>
    )
  }
});

export default SignUp;
