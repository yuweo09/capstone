import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router';

const ProjectBoard = React.createClass({
  getInitialState() {
    return {
      projectBoard: {
        title:'',
        description:''
      }
    }
  },

  componentDidMount() {
    axios.get('/api/boards')
      .then(res => {
        this.setState({ projectBoard: res.data });
      })
      .catch(err => {
        console.log('hey');
        this.setState({ loadErr: err });
      });
  },

  render() {
    return (



      <div className="row">
      <div className="col s12 m6">
        <div className="card">
          <div className="card-content black-text">
            <span className="card-title">Project Title: {this.state.projectBoard.title}</span>
            <p>{this.state.projectBoard.description}</p>
          </div>
          <div className="card-action">
            <Link to='/projectactivity'>View Task</Link>
            <a href="#">Forum</a>
          </div>
        </div>
      </div>
    </div>

    )
  }
});

export default ProjectBoard;
