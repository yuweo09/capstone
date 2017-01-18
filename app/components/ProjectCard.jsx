import React from 'react';
import axios from 'axios';
import ViewTask from './ViewTask';
import AddTasks from './AddTasks';
import ForumThread from './ForumThread';


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
            <div className='cardSum'>
              <ViewTask
                projectId={this.props.projectId}
                tasks = {this.props.tasks}
              />
          </div>
          <div className='cardSum'>
              <ForumThread
                projectId={this.props.projectId}
              />
            </div>
            <div className='cardSum'>
              <AddTasks
                projectId={this.props.projectId}
                addTask = {this.props.addTask}
              />
            </div>
          </div>
        </div>
    </div>
    )
  }
});

export default ProjectCard;
