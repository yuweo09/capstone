
import React from 'react';
import axios from 'axios';
import ProjectTasks from './ProjectTasks';
import Notifications, {notify} from 'react-notify-toast';

const AddTasks = React.createClass({
  getInitialState() {
    return {clicked: false}

  },
changestate() {
  this.setState({ clicked: !this.state.clicked });

},
  postActivity() {
    event.preventDefault();

    let task = { task: this.refs.task.value,
      taskValue: this.refs.taskValue.value,
      projectId:this.props.projectId
    };

    axios.post('/api/activity', task)
      .then(res => {
        this.props.addTask(task);
        this.refs.task.value = '';
        this.refs.taskValue.value = '';
      })
      .then(() => {
        notify.show('Task added!!', 'success');
      })
      .catch(err => {
        console.error(err);
      });
  },

  task() {
    if(this.state.clicked === false) {
      return;
    }
    return (
      <div>
        <input ref='task' placeholder="Task" name="task" type="text" />
        <input ref='taskValue' placeholder="TaskValue" name="taskValue" type="number" />
        <button onClick={this.postActivity}> Post Task</button>
     </div>
    )
  },

  render() {

    return    (
      <div>
        <button onClick={this.changestate}>Add Task</button>
        <div>

        {this.task()}
        </div>
      </div>
    );

  }
});

export default AddTasks;
