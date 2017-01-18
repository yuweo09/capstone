import React from 'react';
import { Link, Redirect } from 'react-router';
// import { Button, Header, Image, Modal, Form, Select, Input, Grid} from 'semantic-ui-react'
import SignUp from './SignUp';
import SignIn from './SignIn';



const Intro = React.createClass({
  IsLoggedIn() {
    if (this.props.isLoggedIn === false) {
      return <li><SignUp handleSignUpSubmit={this.handleSignUpSubmit}/><SignIn/></li>;
    } else {
      return <Redirect to="/user"/>
    }
  },
  handleSignUpSubmit() {
    // this.props.stateMutator();
    this.props.signIn();
    // this.setState({loggedIn: true});
  },
componentDidMount(){
  // document.body.style.backgroundColor = "red";
  // document.body.style.backgroundImage =   "url('')";
  // this.props.signOut();


},


  SignOut() {
    if (this.props.isLoggedIn === true) {

      return <li onClick={this.props.signOut}>SIGN OUT</li>;
    } else {
      return <br />;
    }
  },
  render() {
    return (
      <main>
        <div className="intro deep-orange lighten-2">
            <h1 className="grey-text text-lighten-5">Brand Yourself</h1>
            <h5 className='deep-orange lighten-2'><SignUp handleSignUpSubmit={this.handleSignUpSubmit}
                   isLoggedIn={this.props.isLoggedIn}
                   signIn={this.props.signIn}
                   stateMutator={this.props.stateMutator}
            /></h5>
            <h5 className='deep-orange lighten-2'><SignIn
                 isLoggedIn={this.props.isLoggedIn}
                 signIn={this.props.signIn}
                   stateMutator={this.props.stateMutator}
               /></h5>
      </div>
      </main>
    )
  }
});

export default Intro;
