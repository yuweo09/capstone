import React from 'react';
import { Miss, Match , Link} from 'react-router';

const Header = React.createClass({

  signOut() {
    return this.props.signOut();
  },

  render() {
    return (
      <nav>
        <div className="nav-wrapper deep-orange lighten-2 ">
          <a href="#" className="brand-logo">Brand</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to= '/user'>Profile</Link></li>
            <li><Link to= '/create-project'>Post New Project</Link></li>
            <li><Link to= '/project-feed'>Your Projects</Link></li>
            <li><Link to= '/allprojects'>Projects</Link></li>
            <li><Link to= '/'>Signout</Link></li>
          </ul>
        </div>
      </nav>

    )
  }
});

export default Header;
