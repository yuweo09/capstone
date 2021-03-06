import React from 'react';
import axios from 'axios';
import ProjectTasks from './ProjectTasks';
import Notifications, {notify} from 'react-notify-toast';

const ViewTask = React.createClass({
  getInitialState() {
    return {clicked: false}

  },
changestate() {
this.setState({ clicked: !this.state.clicked });

},

tasks(projectSpecificTasks) {
  if (this.state.clicked === false) {
    return;
  }

  console.log(projectSpecificTasks, ' PROJECT SPECIFIC TASKS');
  if(projectSpecificTasks.length === 0) {
    return notify.show('No tasks', 'error');
  }
console.log('Why did i get here');

  return (
    <ProjectTasks
      tasks = {projectSpecificTasks}
      projectId = {this.props.projectId}
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
