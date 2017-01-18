import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router';
import Modal from 'boron/FadeModal';

const modalStyle = {
      height: '500px',
      width: '500px'

};
const SignUp = React.createClass({
  // getInitialState() {
  //   return this.state = {
  //     email: '',
  //     first_name:'',
  //     last_name:'',
  //     password: ''
  //   };
  // },

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  },

  handleSubmit(event) {
    event.preventDefault();

    let data = { email: this.refs.email.value,
      first_name: this.refs.first_name.value,
      last_name: this.refs.last_name.value,
      password: this.refs.password.value
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
  showModal: function(){
      this.refs.modal2.show();
  },
  hideModal: function(){
      this.refs.modal2.hide();
  },

  signUpForm() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/projects" />
    } else {
      return <div id="signin-signup">
        <h3>Sign Up</h3>
          <form onSubmit={this.handleSubmit}>
          <input placeholder="Email" refs='email' name="email" type="email" onChange={this.handleChange} />
          <input placeholder="First name" refs='first_name' name="first_name" type="text" onChange={this.handleChange} />
          <input placeholder="Last name" refs='last_name' name="last_name" type="text" onChange={this.handleChange} />
          <input placeholder="Password" refs='password' name="password" type="password" onChange={this.handleChange} />
          <button type="submit">Sign up</button>
        </form>
      </div>
    }
  },

  render() {
    return (
        <div>
            <button className='deep-orange lighten-2 btn' onClick={this.showModal}>SignUp</button>
            <Modal modalStyle={modalStyle} ref="modal2" keyboard={this.callback}>
              <div id="signin-signup">
                <h3>Sign Up</h3>
                  <form onSubmit={this.handleSubmit}>
                  <input placeholder="Email" ref='email' name="email" type="email" onChange={this.handleChange} />
                  <input placeholder="First name" ref='first_name' name="first_name" type="text" onChange={this.handleChange} />
                  <input placeholder="Last name" ref='last_name' name="last_name" type="text" onChange={this.handleChange} />
                  <input placeholder="Password" ref='password' name="password" type="password" onChange={this.handleChange} />
                  <button type="submit">Sign up</button>
                </form>
              </div>
                {/* <button onClick={this.hideModal}>Close</button> */}
            </Modal>
        </div>
    );
  }

});

export default SignUp;
