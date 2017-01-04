import React from 'react';
import ForumThread from './ForumThread';

const Forum = React.createClass({



  render() {
    let sortedUsers = this.props.users;
    sortedUsers.sort(function(a, b) {
      if (a.highScore > b.highScore) {
        return -1;
      }
      if (a.highScore < b.highScore) {
        return 1;
      }
      return 0;
    });
    return (
      <table className="clearfix" id="leaderboard-table">
        <thead>
          <tr>
            <th>RANK</th>
            <th>USER</th>
            <th>HIGH SCORE</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user,index) => {
            return<ForumThread key={index} rank={index + 1} user={user}/>;
          })}
        </tbody>
      </table>
    )
  }
});

export default Forum;
