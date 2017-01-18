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
import AllProjectCard from './AllProjectCard';


const AllProjects = React.createClass({
  // componentDidMount(){
  //   axios.get('/api/allprojects')
  //     .then(res => {
  //       const projects = res.data;
  //       this.props.addProject(projects);
  //       axios.get('/api/activity')
  //         .then(res => {
  //           console.log(JSON.stringify(res.data)+'RES DAYA');
  //           this.props.addTask(res.data);
  //         })
  //         .catch(err => {
  //           console.error(err);
  //         });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // },
componentWillUnmount(){
  this.props.clearProject();
},
  projectCards() {
    console.log(this.props.allProjects.length, ' LENGTH');
    const projectCards = [];
    for(let i = 0; i < this.props.allProjects.length; i++) {
      projectCards.push(
        <AllProjectCard
          key={i}
          title = {this.props.allProjects[i].title}
          description = {this.props.allProjects[i].description}
          projectId= {this.props.allProjects[i].id}
          tasks = {this.props.allTasks}
        />

      );
    }

    return projectCards;

  },

  render() {
    // console.log(this.props.projects.legnth+ 'length');
    if (this.props.allProjects.length === 0) {
      return false;
    }

    return (
      <div className="row">{this.projectCards()}</div>
    );
  }
});

export default AllProjects;
