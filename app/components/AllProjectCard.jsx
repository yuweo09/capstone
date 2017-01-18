import React from 'react';
import axios from 'axios';
import AllProjectTasks from './AllProjectTasks';
import ForumThread from './ForumThread';

const AllProjectCard= React.createClass({

  render() {
    console.log('creating all project card');
    return (
      <div className="col s12 m4">
        <div className="card">
          <div className="card-content black-text">
            <span className="card-title">Project Title: {this.props.title}</span>
            <p>Description:{this.props.description}</p>
          </div>
          <div className="card-action">
            <AllProjectTasks
              projectId={this.props.projectId}
              tasks = {this.props.tasks}
            />
            <ForumThread
              projectId={this.props.projectId}
            />
          
          </div>
        </div>
    </div>
    )
  }
});

export default AllProjectCard;
