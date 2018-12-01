// CommentBox.js
import React, { Component } from 'react';
import io from 'socket.io-client'
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import './CommentBox.css';

const server_api = 'http://127.0.0.1:3001';
const server_socket = 'http://127.0.0.1:3002';

class CommentBox extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null,
      text: '',
      user_id: (Math.random() * 100) + 1,
      username: 'Anonymous',
    };
    this.socket = null;
  }

  listener = () => {
    this.socket.removeAllListeners('message', 'signup', 'login');

    this.socket.on('message', newmsg => {
      const data = [...this.state.data, newmsg]
      this.setState({data: data})
    })

    this.socket.on('signup', obj => {
      if (obj.message !== 'OK') {
        alert(obj.message);
        this.openning();
      }
      else {
        alert('Successs!\nLog In now to chat!');
        this.login();
      }
    })

    this.socket.on('login', obj => {
      if (obj.message !== 'OK') {
        alert(obj.message);
        this.openning();
      }
      else {
        const data = [...this.state.data, ...obj.old_messages]
        this.setState({
          username: obj.username,
          data: data
        })
      }
    })
  }

  openning = () => {
    let login = window.confirm('Do you have an account?\n\nIf not, cancel to Sign Up');
    if (login) {
      this.login();
    }
    else {
      this.signup();
    }
  }

  login = () => {
    const username = prompt('Username');
    const password = prompt('Password');
    this.socket.emit('login', {
      username: username,
      password: password
    })
  }

  signup = () => {
    const username = prompt('Username');
    const password = prompt('Password');
    this.socket.emit('signup', {
      username: username,
      password: password
    })
  }

  onChangeText = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  submitComment = (e) => {
    e.preventDefault();
    const { username, text } = this.state;
    const date = Date.now();
    if (!username || !text) return;
    this.socket.emit('message', {
      id: date.toString(),
      user_id: this.state.user_id,
      username: this.state.username,
      text: this.state.text,
      createAt: date,
      updateAt: date
    })
    this.setState({ text: '', error: null });
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  start = () => {
    this.socket = io(server_socket);
    this.listener();
    this.openning();
    this.scrollToBottom();
  }

  componentDidMount = () => {
    this.start();
  }

  componentDidUpdate = () => {
    this.scrollToBottom();
  }

  render() {
    return (
      <div className="container">
        <div className="comments">
          <CommentList
            data={this.state.data}
          />
        <div style={{ float:"left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}>
        </div>
        </div>
        <div className="form">
          <CommentForm
            username={this.state.username}
            text={this.state.text}
            handleChangeText={this.onChangeText}
            handleSubmit={this.submitComment}
          />
        </div>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default CommentBox;