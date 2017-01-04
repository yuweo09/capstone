import React from 'react';
import axios from 'axios';
import { Button, Header, Image, Modal, Form,Select,Input, Card, Icon} from 'semantic-ui-react'

const ProjectBoard = React.createClass({
  getInitialState() {
    return {
      projectBoard: {
        title:'',
        description:''
      }
    }
  },
// componentDidMount() {
//   axios.get('/users/board')
//     .then(res => {
//       this.setState({ projectBoard: res.data });
//     })
//     .catch(err => {
//       console.log('hey');
//       this.setState({ loadErr: err });
//     });
// },

  render() {
    return (
      <div>
        {/* <Card> */}
    {/* <Image src='http://semantic-ui.com/images/avatar2/large/matthew.png' /> */}
    {/* <Card.Content>
      <Card.Header>
        {this.state.projectBoard.title}
      </Card.Header>
      <Card.Meta>
        <span className='date'>
          {this.state.projectBoard.name}
        </span>
      </Card.Meta>
      <Card.Description>
        {this.state.projectBoard.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
      {this.state.projectBoard.numberTask}
      </a>
      <div className='ui two buttons'>
        <Button basic color='green'>View Task</Button>
        <Button basic color='green'>Forum</Button>
      </div>
    </Card.Content>
  </Card> */}
      </div>
    )
  }
});

export default ProjectBoard;
