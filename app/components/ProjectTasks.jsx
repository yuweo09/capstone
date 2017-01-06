import React from 'react';
import Intro from './Intro';
// import Score from './Score';
// import Friends from './Friends';
import Forum from './Forum';
import ProjectPost from './ProjectPost';
import Header from './layout/Header';
import { Match } from 'react-router';
import { Link, Redirect } from 'react-router';
import axios from 'axios';
import ProjectTask from './ProjectTask';


const ProjectTasks = React.createClass({


  projectTasks() {
    const projectTasks = [];
    for(let i = 0; i < this.props.tasks.length; i++) {
      projectTasks.push(
        <ProjectTask
          key={i}
          task = {this.props.tasks[i].task}
          taskValue = {this.props.tasks[i].taskValue}

        />

      );
    }

    console.log(projectTasks, ' PROJECT TASKS');

    return projectTasks;

  },

  render() {
    return (
      <div className="row">{this.projectTasks()}</div>
    );
  }
});

export default ProjectTasks;
