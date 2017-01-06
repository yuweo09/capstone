import React from 'react';
import axios from 'axios';

const ProjectBoard = React.createClass({
  getInitialState() {
    return {
      projectBoard: {
        title:'',
        description:''
      }
    }
  },

  componentDidMount() {
    axios.get('/api/boards')
      .then(res => {
        this.setState({ projectBoard: res.data });
      })
      .catch(err => {
        console.log('hey');
        this.setState({ loadErr: err });
      });
  },

  render() {
    return (



      <div className="row">
      <div className="col s12 m6">
        <div className="card">
          <div className="card-content black-text">
            <span className="card-title">Project Title: {this.state.projectBoard.title}</span>
            <p>{this.state.projectBoard.description}</p>
          </div>
          <div className="card-action">
            <a href="#">View Task</a>
            <a href="#">Forum</a>
          </div>
        </div>
      </div>
    </div>
      // <section>
      //   <article>
      //     <header>
      //       <h4>Project Title: {this.state.projectBoard.title}</h4>
      //       <h6>Creator: {this.props.currentUser.firstName}</h6>
      //     </header>
      //     <div>
      //       Description: {this.state.projectBoard.description}
      //     </div>
      //     <div>
      //
      //     </div>
      //     <div>
      //       <button>View Task</button>
      //       <button>Forum</button>
      //     </div>
      //   </article>
      // </section>
    )
  }
});

export default ProjectBoard;
