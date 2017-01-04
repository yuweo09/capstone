import React from 'react';
import { Link } from 'react-router';
import { Miss, Match } from 'react-router';
import { Button, Image, Modal, Form,Select,Input, Menu} from 'semantic-ui-react'

const Header = React.createClass({

  signOut() {
    // return this.props.signOut();
  },

  render() {
    return (
      <Menu>
    <Menu.Item
      name='editorials'
      active='editorials'
      onClick={this.handleItemClick}
    >
      Editorials
    </Menu.Item>

    <Menu.Item
      name='reviews'
      active='reviews'
      onClick={this.handleItemClick}
    >
      Reviews
    </Menu.Item>

    <Menu.Item
      name='upcomingEvents'
      active='upcomingEvents'
      onClick={this.handleItemClick}
    >
      Upcoming Events
    </Menu.Item>
  </Menu>
    )
  }
});

export default Header;
