import React from 'react';
import axios from 'axios';


const ProjectTask= React.createClass({

  render() {
    console.log('creating project task');
    return (
      <div className="col s12">
        <div className="card">
          <div className="card-content black-text">
            <span className="card-title">Task: {this.props.task}</span>
            <p>Task Value:{this.props.taskValue}</p>
          </div>
        </div>
    </div>
    )
  }
});

export default ProjectTask;
