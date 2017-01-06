import React from 'react';
// import { Lin} from 'react-router';
import { Miss, Match , Link} from 'react-router';
// import { Button, Image, Modal, Form,Select,Input,Menu} from 'semantic-ui-react'

const Header = React.createClass({

  signOut() {
    return this.props.signOut();
  },

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Brand</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="sass.html">Profile</a></li>
            <li><Link to= '/create-project'>Post New Project</Link></li>
            <li><Link to= '/projects'>Projects</Link></li>

            <li><a href="collapsible.html">Signout</a></li>
          </ul>
        </div>
      </nav>

    )
  }
});

export default Header;
