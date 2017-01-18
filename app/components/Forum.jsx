import React from 'react';
import ForumThread from './ForumThread';

const Forum = React.createClass({
  getInitialState() {
    return {
      forumText:[]
    }
  },
  postForum() {
    event.preventDefault();

    let comment = { comment: this.refs.comment.value,
      taskValue: this.refs.taskValue.value,
      projectId:this.props.projectId
    };

    axios.post('/api/activity', task)
      .then(res => {
        this.props.addTask(task);
        this.refs.comment.value = '';
        this.refs.taskValue.value = '';
      })
      .then(() => {
        notify.show('Task added!!', 'success');
      })
      .catch(err => {
        console.error(err);
      });
  },

  render() {
    <div class="forum-container">
      <div class="comment">
      <p>Hey this is a nice project.</p>
      </div>
      <div class="post-comment">
          <input ref='task' placeholder="Task" name="task" type="text" />
       <textarea ref='comment' placeholder='Content'></textarea>
       <button>post </button>
      </div>
      </div>
  }

});

export default Forum;
