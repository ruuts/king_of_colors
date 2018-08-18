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

  handleTimerClick = (side) => {
    var other_side = side == 'top' ? 'bottom' : 'top'
    if (other_side != this.state.side) {
      this.setTimer(other_side);
    }
  };

  handleRestart = () => {
    window.clearInterval(this.state.interval);
    this.setState({
      side: null,
      interval: null,
      timer: TIME_PER_TURN
    })
  }

  handleStart = (side) => {
    this.setTimer(side)
  }

  timer = (side) => {
    var active = this.state.side == side
    var html_class = "timer"
    if (side == 'top') html_class += " rotated"
    if (active)        html_class += " timer--active"
    return (
      <div className={ html_class } onClick={ this.handleTimerClick.bind(this, side) }>
        <div>
          <p>nog</p>
          <div className="timer__count">
            { active ? this.state.timer : TIME_PER_TURN }
          </div>
          <p>seconden</p>
          <button className="btn btn--transparent mt-2">
            Ik heb gezet!
          </button>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.side == null) {
      return (
        <div className="centered">
          <div className="dialog">
            <div className="dialog__section">
              <div className="dialog__icon">
                <img src="./logo.png" width="48" height="48" />
              </div>
              <p>
                Welkom bij King of Colors!
                Ik neem aan dat je het bordspel voor je hebt liggen.
              </p>

              <img src="./position.png" style={{ width: '100%' }} />

              <p>
                Belangrijk is dat je tegenover elkaar zit.
                Leg je mobiel naast het bord neer.
              </p>

              <p>Wie begint er?</p>

              <div className="flex">
                <button className="btn" onClick= { this.handleStart.bind(this, 'top') }>
                  ⬆ 
                  <br />
                  Overkant
                </button>
                <button className="btn ml-auto" onClick= { this.handleStart.bind(this, 'bottom') }>
                  ⬇ 
                  <br />
                  Deze kant
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.timer > 0) {
      return (
        <div className="timers">
          { this.timer('top') }
          { this.timer('bottom') }
        </div>
      );
    } else {
      return (
        <div className="centered">
          <div>
            <div className= { "dialog" + (this.state.side == 'bottom' ? ' rotated' : '') }>
              <div className="dialog__section rotated">
                <div className="dialog__icon">
                  😭
                </div>
                Helaas, je hebt te lang gedaan over je beurt en daarom heb jij verloren.
              </div>
              <div className="dialog__section dialog__section--success">
                <div className="dialog__icon">
                  😎
                </div>
                Nice! je tegenstander heeft te lang gedaan over zijn beurt en daarom heb jij gewonnen!
              </div>
            </div>
            <center>
              <button className="btn mt-2" onClick= { this.handleRestart }>
                Start een nieuw spel
              </button>
            </center>
          </div>
        </div>
      )
    }
  }
}

export default App;
