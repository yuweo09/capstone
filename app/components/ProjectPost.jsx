import React from 'react';
import axios from 'axios';
// import { Button, Header, Image, Modal, Form,Select,Input, Card, Icon} from 'semantic-ui-react'

const ProjectPost = React.createClass({
  getInitialState() {
    return {
      projectPost: {
        title:'',
        description:'',

      }
    }
  },
  handleChange() {
    this.setState({[event.target.name]: event.target.value});
  },
componentDidMount() {

},
post() {
  event.preventDefault();

  let data = { title: this.state.title,
    description: this.state.description
  };
  axios.post('/users/board', data)
    .then(res => {
      // this.props.stateMutator();
      // this.setState({loggedIn: true});
      // this.props.signIn;
    })
    .catch(err => {
      console.error(err);
    });
},
  render() {
    return (
      <div>
          <form onSubmit={this.post}>
            <input placeholder="Project Title" name="title" type="text" onChange={this.handleChange} />
            <input placeholder="Project Description" name="description" type="text" onChange={this.handleChange} />
          </form>
      </div>
    )
  }
});

export default ProjectBoard;
