import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const TIME_PER_LEVEL = 10

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      side: null,
      interval: null,
      turns: 0,
      timer: null,
      level: {
        top: 6,
        bottom: 6
      }
    }
  }

  timeForSide = (side) => {
    return this.state.level[side] * TIME_PER_LEVEL
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
      timer: this.timeForSide(side)
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

  handleRadioSelect = (event) => {
    const newState = { level: this.state.level }
    newState.level[event.target.name] = event.target.value
    this.setState(newState);
  }

  radioButton = (side, level) => {
    const id = side + '-level-' + level;
    const checked = this.state.level[side] == level;
    return (
      <div class="flex-1">
        <input type="radio" id={ id } name={ side } value={ level } checked={ checked } onChange={ this.handleRadioSelect } />
        <label for={ id }>{ level }</label>
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
            { active ? this.state.timer : this.timeForSide(side) }
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

              ↑ Niveau van de overkant
              <div className="flex">
                { this.radioButton('top', 1) }
                { this.radioButton('top', 2) }
                { this.radioButton('top', 3) }
                { this.radioButton('top', 4) }
                { this.radioButton('top', 5) }
                { this.radioButton('top', 6) }
              </div>

              <br />

              ↓ Jouw niveau
              <div className="flex">
                { this.radioButton('bottom', 1) }
                { this.radioButton('bottom', 2) }
                { this.radioButton('bottom', 3) }
                { this.radioButton('bottom', 4) }
                { this.radioButton('bottom', 5) }
                { this.radioButton('bottom', 6) }
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
