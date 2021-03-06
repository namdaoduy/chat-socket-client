// Comment.js
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const Comment = props => (
  <div className={"singleComment" + (props.uid == props.myid ? " owner" : "")}>
    <img alt="user_image" className="userImage" 
      src={`https://picsum.photos/70?image=${props.uid}`} />
    <div className="textContent">
      <div className="singleCommentContent">
        <h3>{props.username}</h3>
        <ReactMarkdown source={props.children} />
      </div>
      <div className="singleCommentButtons">
        <span className="time">{moment(props.timestamp).fromNow()}</span>
      </div>
    </div>
  </div>
);

Comment.propTypes = {
  username: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Comment;