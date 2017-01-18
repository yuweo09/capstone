import React from 'react';
import axios from 'axios';
import { Miss, Match, Redirect } from 'react-router';



const ProjectTask= React.createClass({
  getInitialState() {
    return {clicked: false}

  },
  changestate() {
    axios.delete('/users/task', {data:{taskId:this.props.taskId}})
      .then(res => {
          this.setState({ clicked: true });
      })
      .catch(err => {
        console.error(err);
      });


  },
taskCard() {
  if (this.state.clicked === true) {
    return;
  }
  return (
    <div className="col s12">
      <div className="card">
        <div className="card-content black-text">
          <span className="card-title">Task: {this.props.task}</span>
          <p>Task Value:{this.props.taskValue}</p>
          <button onClick={this.changestate}> Delete </button>
        </div>
      </div>
  </div>

  )
},

delete(){
  if (this.state.clicked === false) {
    return;
  }

  // axios.delete('/users/task', {data:{taskId:this.props.taskId}})
  //   .then(res => {
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });
  // return <Redirect to="/"/>
},

  render() {
    console.log('creating project task');
    return (
      <div>
      {this.taskCard()}
    </div>
    )
  }
});

export default ProjectTask;
