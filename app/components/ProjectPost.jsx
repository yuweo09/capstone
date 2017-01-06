import React from 'react';
import axios from 'axios';

const ProjectPost = React.createClass({
  getInitialState() {
    return {
      posted: false,
      projectId:null
    }
  },

  post() {
    event.preventDefault();

    let project = { title: this.refs.title.value,
      description: this.refs.description.value
    };

    axios.post('/users/board', project)
      .then(res => {
        this.props.addProject(project);
        this.setState({posted: true,
                      projectId:res.data[0].id
        } );
        console.log(res.data);

        // this.props.stateMutator();
        // this.setState({loggedIn: true});
        // this.props.signIn;
      })
      .catch(err => {
        console.error(err);
      });
  },

  postActivity() {
    event.preventDefault();

    let task = { task: this.refs.task.value,
      taskValue: this.refs.taskValue.value,
      projectId:this.state.projectId
    };

    axios.post('/api/activity', task)
      .then(res => {
        this.props.addTask(task);
        this.refs.task.value = '';
        this.refs.taskValue.value = '';
      })
      .catch(err => {
        console.error(err);
      });
  },

  task() {
    if(this.state.posted === false) {
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

  postBoard() {
    if(this.state.posted === true) {
      return;
    }

    return (
      <div>
        <input placeholder="Project Title" ref='title' name="title" type="text"  />
        <input placeholder="Project Description" ref='description' name="description" type="text" />
        <button onClick={this.post}>Post</button>
      </div>
    );
  },

  render() {
    console.log(this.props.addProject);
    return (
      <div>
        { this.postBoard() }
        {this.task()}
      </div>
    );
  }
});

export default ProjectPost;
