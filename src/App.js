import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      timer_top: 60,
      timer_top_id: null,
      timer_bottom: 60,
      timer_bottom_id: null
    }
  }

  countDownTop = () => {
    this.setState({
      timer_top: this.state.timer_top - 1
    });
  };

  countDownBottom = () => {
    this.setState({
      timer_bottom: this.state.timer_bottom - 1
    });
  };

  resetTimers = () => {
    window.clearInterval(this.state.timer_top_id);
    window.clearInterval(this.state.timer_bottom_id);
    this.setState({
      timer_top: 60,
      timer_bottom: 60
    });
  };

  handleClickTimerTop = () => {
    this.resetTimers();
    this.setState({
      timer_top_id: window.setInterval(this.countDownTop, 1000)
    })
  };

  handleClickTimerBottom = () => {
    this.resetTimers();
    this.setState({
      timer_bottom_id: window.setInterval(this.countDownBottom, 1000)
    })
  };

  render() {
    return (
      <div className="timers">
        <div className="timer timer--top" onClick={this.handleClickTimerTop}>
          {
            this.state.timer_top
          }
        </div>
        <div className="timer timer--bottom" onClick={this.handleClickTimerBottom}>
          {
            this.state.timer_bottom
          }
        </div>
      </div>
    );
  }
}

export default App;
