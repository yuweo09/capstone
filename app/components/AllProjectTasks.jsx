import React from 'react';
import axios from 'axios';
import ProjectTasksAll from './ProjectTasksAll';

const AllProjectTasks = React.createClass({
  getInitialState() {
    return {clicked: false}

  },
changestate() {
  this.setState({ clicked: true });

},

tasks(projectSpecificTasks) {
  if (this.state.clicked === false) {
    return;
  }

  console.log(projectSpecificTasks, 'All PROJECT SPECIFIC TASKS');

  return (
    <ProjectTasksAll
      tasks = {projectSpecificTasks}
    />
  );
  },


  render() {

    const projectSpecificTasks = this.props.tasks.filter((task) => {
        return task.projectId === this.props.projectId
    });
    console.log(projectSpecificTasks);
    return (
      <div>
        <button onClick={this.changestate}>View Task</button>
        <div>

        {this.tasks(projectSpecificTasks)}
        </div>
      </div>
    );
  }
});

export default AllProjectTasks;
