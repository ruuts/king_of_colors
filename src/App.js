import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      timer_active: null,
      timer_interval: null,
      timer_count: 60
    }
  }

  countDown = () => {
    this.setState({
      timer_count: this.state.timer_count - 1
    });
  };

  setTimer = (timer) => {
    window.clearInterval(this.state.timer_interval);
    this.setState({
      timer_active: timer,
      timer_interval: window.setInterval(this.countDown, 1000),
      timer_count: 60
    });
  };

  timerCount = (timer) => {
    return (this.state.timer_active == timer ? this.state.timer_count : 60)
  }

  timerClassName = (timer) => {
    return (this.state.timer_active == timer ? 'timer--active' : '')
  }

  handleClickTimerTop = () => {
    this.setTimer('bottom');
  };

  handleClickTimerBottom = () => {
    this.setTimer('top');
  };

  render() {
    return (
      <div className="timers">
        <div className={ "timer timer--top " + this.timerClassName('top')} onClick={ this.handleClickTimerTop }>
          { this.timerCount('top') }
        </div>
        <div className={ "timer timer--bottom " + this.timerClassName('bottom')} onClick={ this.handleClickTimerBottom }>
          { this.timerCount('bottom') }
        </div>
      </div>
    );
  }
}

export default App;
