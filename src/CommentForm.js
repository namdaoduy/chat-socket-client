import React from 'react';
import PropTypes from 'prop-types';

const CommentForm = props => (
  <div>
    {/* <input
      type="text"
      name="username"
      placeholder="Your name…"
      autoComplete="off"
      value={props.username}
      onChange={props.handleChangeText}
    /> */}
    <span>{props.username}</span>
    <input
      type="text"
      name="text"
      placeholder="Say something..."
      autoComplete="off"
      value={props.text}
      onChange={props.handleChangeText}
      onKeyPress={(e) => {e.key === "Enter" ? props.handleSubmit(e) : ()=>{}}}
    />
    <button onClick={props.handleSubmit}><i className="fab fa-telegram-plane"></i></button>
  </div>
);

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  text: PropTypes.string,
  username: PropTypes.string,
};

CommentForm.defaultProps = {
  text: '',
  username: '',
};

export default CommentForm;