
import React from 'react';
import axios from 'axios';
import ProjectTasks from './ProjectTasks';
import Notifications, {notify} from 'react-notify-toast';

const ForumThread = React.createClass({
  getInitialState() {
    return {clicked: false,
            forumText:[]
            }

  },
changestate() {
  this.setState({ clicked: !this.state.clicked });

},
componentDidMount() {
    this.getForum();
},

getForum() {
  const forum = {projectId:this.props.projectId,

};
  axios.get('/user/forumthread')
    .then(res => {
      console.log(res.data);
      this.setState({forumText:res.data})
      // this.props.addTask(task);
    })
    .then(() => {
      // notify.show('Task added!!', 'success');
    })
    .catch(err => {
      console.error(err);
    });
},
  postForum() {
    event.preventDefault();

    let comment = { comment: this.refs.comment.value,
      projectId:this.props.projectId
    };

    axios.post('/users/forum_thread', comment)
      .then(res => {
        this.props.addTask(task);
        this.refs.comment.value = '';
      })
      .then(() => {
        // notify.show('Task added!!', 'success');
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
      <div class="forum-container">
        <div class="comment">
        <p>Hey this is a nice project.</p>
        </div>
        <div class="post-comment">
         <textarea ref='comment' placeholder='Content'></textarea>
         <button onClick={this.postForum}>post </button>
        </div>
        </div>
    )
  },

  render() {

    return    (


      <div>
        <button onClick={this.changestate}>Forum</button>
        <div>

        {this.task()}
        </div>
      </div>




    );

  }
});

export default ForumThread;
