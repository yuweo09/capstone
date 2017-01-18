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
import ProjectCard from './ProjectCard';


const ProjectFeed = React.createClass({
  getInitialState() {
    return {
      ftext: ''
    }
  },
componentWillUnmount() {
  this.props.clearProject();
  // this.props.getAllProjects();
  // this.props.getAllTasks();

},
  componentDidMount(){
    axios.get('/api/boards')
      .then(res => {
        const projects = res.data;
        this.props.addProject(projects);
        axios.get('/api/activity')
          .then(res => {
            console.log(JSON.stringify(res.data)+'RES DAYA');
            this.props.addTask(res.data);
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  },

  projectCards() {
    console.log(this.props.projects.length, ' LENGTH');
    const projectCards = [];
    for(let i = 0; i < this.props.projects.length; i++) {
      projectCards.push(
        <ProjectCard
          key={i}
          title = {this.props.projects[i].title}
          description = {this.props.projects[i].description}
          projectId= {this.props.projects[i].id}
          tasks = {this.props.tasks}
          addTask = {this.props.addTask}
        />

      );
    }

    return projectCards;

  },

  render() {
    // console.log(this.props.projects.legnth+ 'length');
    if (this.props.projects.length === 0) {
      return false;
    }

    return (
      <div className="row">{this.projectCards()}</div>
    );
  }
});

export default ProjectFeed;
