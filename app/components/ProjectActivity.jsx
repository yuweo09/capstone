import React from 'react';
import axios from 'axios';

const ProjectActivity = React.createClass({
  getInitialState() {
    return {
      projectActivity: {
        task:'',
        taskValue:0
      }
    }
  },

  componentDidMount() {
    axios.get('/api/activity')
      .then(res => {
        this.setState({ projectActivity: res.data });
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
            <span className="card-title">Project Task: {this.state.projectActivity.task}</span>
            <p>Task Value:{this.state.projectActivity.taskValue}</p>
          </div>
          <div className="card-action">
            <a href="#">View Task</a>
            <a href="#">Forum</a>
          </div>
        </div>
      </div>
    </div>

    )
  }
});

export default ProjectActivity;
