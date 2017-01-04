import React from 'react';

const ForumThread = React.createClass({
  render() {
    return (
      <tr>
        <td>
          {this.props.rank}
        </td>
        <td>
          {this.props.user.username}
        </td>
        <td>
          {this.props.user.highScore+" "}
        </td>
      </tr>
    )
  }
});

export default ForumThread;
