import React from 'react';
import axios from 'axios';
import SignUp from './SignUp';
import { Link, Redirect } from 'react-router';
import Modal from 'boron/FadeModal';

const modalStyle = {
      height: '500px',
      width: '500px'

};
// var modalStyle = {
//     transform: 'rotate(45deg) translateX(-50%)',
// };

var backdropStyle = {
    backgroundColor: 'red'
};

var contentStyle = {
    backgroundColor: 'white',
    height: '100%'
};
const SignIn = React.createClass({
  handleSubmit(event) {
    event.preventDefault();

    let data = { email: this.refs.email.value,
      password: this.refs.password.value
    };
    console.log(data);

    axios.post('/token', data)
      .then(res => {
        // this.props.stateMutator();
        console.log(res.data);
        this.props.signIn();
        // this.setState({loggedIn: true});
        // this.props.signIn;
      })
      .catch(err => {
        console.error(err);
      });
  },
    showModal: function(){
        this.refs.modal.show();
    },
    hideModal: function(){
        this.refs.modal.hide();
    },

    render: function() {
        return (
            <div id='on'>
                <button className='deep-orange lighten-2 btn' onClick={this.showModal}>Login</button>
                <Modal modalStyle={modalStyle} ref="modal" keyboard={this.callback} contentStyle={contentStyle}>
                  <div id="one">
                    <p>Sign in if you already have an account</p>
                    <form onSubmit={this.handleSubmit}>
                      <input className='two' ref='email' placeholder="Email" name="email" type="email" onChange={this.handleChange} />
                      <input ref='password' placeholder="Password" name="password" type="password" onChange={this.handleChange} />
                      <button type="submit">Login</button>
                    </form>
                  </div>
                    {/* <button onClick={this.hideModal}>Close</button> */}
                </Modal>
            </div>
        );
    }
});


export default SignIn;
