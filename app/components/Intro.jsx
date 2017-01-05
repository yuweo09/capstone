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
    this.props.stateMutator();
    this.props.signIn();
    this.setState({loggedIn: true});
  },
componentDidMount(){
  // document.body.style.backgroundColor = "red";
  // document.body.style.backgroundImage =   "url('')";



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
        {/* <Grid.Row columns={2}>
   <Grid.Column> */}
     <SignUp handleSignUpSubmit={this.handleSignUpSubmit}
            isLoggedIn={this.props.isLoggedIn}
            signIn={this.props.signIn}
            stateMutator={this.props.stateMutator}
     />
   {/* </Grid.Column>
   <Grid.Column> */}
     <SignIn
       isLoggedIn={this.props.isLoggedIn}
       signIn={this.props.signIn}
         stateMutator={this.props.stateMutator}
     />
   {/* </Grid.Column> */}
 {/* </Grid.Row> */}
        <ul id="link-options">
          {/* <Link to='/play'><li>PLAY ON KEYBOARD</li></Link>
          <Link to='/airconsole'><li>PLAY ON AIR CONSOLE</li></Link> */}
          {/* <this.IsLoggedIn />
          <this.SignOut /> */}
          {/* <img src="https://lh3.googleusercontent.com/-cvPfLNJ4JU8/Va561MYkJsI/AAAAAAAC3zc/P0wbdKxr7gg/w781-h1170/Light%2BFeast%2B-%2BTyristrand%252C%2BNorway%2Bby%2BOle%2BHenrik%2BSkjelstad.jpg"/> */}

        </ul>


      </main>
    )
  }
});

export default Intro;
