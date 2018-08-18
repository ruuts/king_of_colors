import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const TIME_PER_TURN = 60

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      side: null,
      interval: null,
      timer: TIME_PER_TURN
    }
  }

  countDown = () => {
    this.setState({
      timer: this.state.timer - 1
    });
  };

  setTimer = (side) => {
    window.clearInterval(this.state.interval);
    this.setState({
      side: side,
      interval: window.setInterval(this.countDown, 1000),
      timer: TIME_PER_TURN
    });
  };

  handleClick = (side) => {
    var other_side = side == 'top' ? 'bottom' : 'top'
    if (other_side != this.state.side) {
      this.setTimer(other_side);
    }
  };

  timer = (side) => {
    var active = this.state.side == side
    return (
      <div
        className={ "timer timer--" + side + (active ? ' timer--active' : '')}
        onClick={ this.handleClick.bind(this, side) }
      >
        { active ? this.state.timer : TIME_PER_TURN }
      </div>
    );
  }

  render() {
    return (
      <div className="timers">
        { this.timer('top') }
        { this.timer('bottom') }
      </div>
    );
  }
}

export default App;
