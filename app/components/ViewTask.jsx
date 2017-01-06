import React from 'react';
import axios from 'axios';
import ProjectTasks from './ProjectTasks';

const ViewTask = React.createClass({
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

  console.log(projectSpecificTasks, ' PROJECT SPECIFIC TASKS');

  return (
    <ProjectTasks
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

export default ViewTask;
