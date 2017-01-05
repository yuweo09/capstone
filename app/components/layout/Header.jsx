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
          <a href="#" className="brand-logo">Logo</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="sass.html">Sass</a></li>
            <li><a href="badges.html">Components</a></li>
            <li><a href="collapsible.html">JavaScript</a></li>
          </ul>
        </div>
      </nav>

    )
  }
});

export default Header;
