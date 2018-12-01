import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = (props) => {
  const commentNodes = props.data.map(comment => (
    <Comment 
      username={comment.username} 
      key={comment._id} 
      id={comment._id}
      uid={comment.uid}
      myid={props.myid}
      timestamp={comment.updatedAt}>
      { comment.text}
    </Comment>
  ));
  return (
    <div>
      { commentNodes }
    </div>
  );
};

CommentList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    uid: PropTypes.number,
    myid: PropTypes.number,
    id: PropTypes.string,
    text: PropTypes.string,
    updatedAt: PropTypes.string,
  }))
};

CommentList.defaultProps = {
  data: [],
};

export default CommentList;