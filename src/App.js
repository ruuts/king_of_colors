import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const TIME_PER_STEP = 10
const TIME_STEPS    = 12

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      side: null,
      interval: null,
      turns: 0,
      timer: null,
      seconds: {
        top: 60,
        bottom: 60
      }
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
      turns: this.state.turns + 1,
      timer: this.state.seconds[side]
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
      interval: null
    })
  }

  handlePause = () => {
    if(this.state.interval == null)  {
      this.setState({
        interval: window.setInterval(this.countDown, 1000)
      });
    } else {
      window.clearInterval(this.state.interval);
      this.setState({
        interval: null
      });
    }
  }

  handleStart = (side) => {
    this.setTimer(side)
  }

  handleSelectTime = (event) => {
    const newState = { seconds: this.state.seconds }
    newState.seconds[event.target.name] = event.target.value
    this.setState(newState);
  }

  selectTime = (side) => {
    const selected = this.state.seconds[side]
    const steps = Array.from(Array(TIME_STEPS - 1).keys()).map(
      (step) => { return (step + 1) * TIME_PER_STEP }
    )

    return (
      <div class="flex-1">
        <select name={ side } onChange={ this.handleSelectTime }>
          {
            steps.map((seconds) => {
              return <option value={ seconds } selected={ selected == seconds ? 'selected' : '' }>{ seconds } seconden</option>;
            })
          }
        </select>
      </div>
    )
  }

  timer = (side) => {
    var active = this.state.side == side
    var html_class = "timer"
    if (side == 'top') html_class += " rotated"
    if (active)        html_class += " timer--active"
    return (
      <div className={ html_class }>
        <div>
          <div className="timer__turn-counter faded">
            beurt: { Math.ceil(this.state.turns / 2) }
          </div>
          <div className="timer__pause btn btn--transparent btn--small" onClick={ this.handlePause }>
            { this.state.interval == null ? '▶ hervat' : '▌▌ pauzeer' }
          </div>
          <p className="faded">nog</p>
          <div className="timer__count">
            { active ? this.state.timer : this.state.seconds[side] }
          </div>
          <p className="faded">seconden</p>
          <button className="btn btn--transparent mt-1" onClick={ this.handleTimerClick.bind(this, side) }>
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
                <img src="./logo.png" width="48" />
              </div>
              <p>
                <center>
                  Welkom bij King of Colors!
                </center>
              </p>

              <img src="./position.png" style={{ width: '100%' }} />

              <p>
                Belangrijk is dat je tegenover elkaar zit.
                Leg je mobiel naast het bord neer.
              </p>

              <div>
                <strong>Seconden per beurt</strong>
              </div>

              <div className="mt-1">
                ↑ Overkant
                <div className="flex">
                  { this.selectTime('top') }
                </div>
              </div>

              <div className="mt-1">
                ↓ Deze kant
                <div className="flex">
                  { this.selectTime('bottom') }
                </div>
              </div>

              <p>Wie begint er?</p>

              <div className="flex">
                <button className="btn" onClick= { this.handleStart.bind(this, 'top') }>
                  ↑
                  <br />
                  Overkant
                </button>
                <button className="btn ml-auto" onClick= { this.handleStart.bind(this, 'bottom') }>
                  ↓
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
                <div className="mt-1">
                  Helaas, je hebt te lang gedaan over je beurt en daarom heb jij verloren.
                </div>
              </div>
              <div className="dialog__section dialog__section--success">
                <div className="dialog__icon">
                  😎
                </div>
                <div className="mt-1">
                  Nice! je tegenstander heeft te lang gedaan over zijn beurt en daarom heb jij gewonnen!
                </div>
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
