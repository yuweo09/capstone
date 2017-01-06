import React from 'react';
import axios from 'axios';
import ViewTask from './ViewTask';


const ProjectCard= React.createClass({

  render() {
    console.log('creating project card');
    return (
      <div className="col s12 m4">
        <div className="card">
          <div className="card-content black-text">
            <span className="card-title">Project Title: {this.props.title}</span>
            <p>Description:{this.props.description}</p>
          </div>
          <div className="card-action">
            <ViewTask
              projectId={this.props.projectId}
              tasks = {this.props.tasks}
            />
            <a href="#">Forum</a>
          </div>
        </div>
    </div>
    )
  }
});

export default ProjectCard;
