import React, { Component } from 'react';
import { IoIosPower, IoIosRefresh } from 'react-icons/io';
import ListTimings from '../list-timings/ListTimings';
import WhiteSpace from '../white-space/WhiteSpace';
import './TimerExt.css';

export default class TimerExt extends Component {
  state = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    timerRunning: false
  };

  initState = this.state;

  //utils
  swapTimerRunningState = () => {
    this.setState(currentState => ({
      timerRunning: !currentState.timerRunning
    }));
  };

  resetState = () => {
    this.setState(this.initState);
  };

  shouldDisplayReset = () => {
    const { hours, minutes, seconds, milliseconds } = this.state;

    return hours !== 0 || minutes !== 0 || seconds !== 0 || milliseconds !== 0;
  };

  //stopwatch increment function
  add = () => {
    this.setState(currentState => {
      currentState.milliseconds += 10;
      let ms = currentState.milliseconds;
      if (ms >= 1000) {
        currentState.milliseconds = 0;
        let seconds = currentState.seconds++;
        if (seconds >= 60) {
          currentState.seconds = 0;
          let minutes = currentState.minutes++;
          if (minutes >= 60) {
            currentState.minutes = 0;
            currentState.hours++;
          }
        }
      }
      return currentState;
    });
  };

  timerStart = () => {
    const { hours, minutes, seconds, milliseconds } = this.state;

    if (this.state.timerRunning) {
      this.timings.addTiming(
        `${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`
      );
      clearInterval(this.interval);
    } else {
      this.interval = setInterval(this.add, 10);
    }
    this.swapTimerRunningState();
  };

  timerReset = () => {
    if (this.state.timerRunning) {
      clearInterval(this.interval);
    }
    this.resetState();
    this.timings.resetRecordedTimes();
  };

  //Format functions
  formatTime60 = time => {
    return time ? (time > 9 ? time : '0' + time) : '00';
  };

  formatTime1000 = time => {
    return time > 0
      ? time < 100
        ? time
        : time < 1000
        ? time / 10
        : time / 100
      : '00';
  };

  render() {
    return (
      <div>
        <div className='timer-div'>
          <button className='timer-button' onClick={() => this.timerStart()}>
            <IoIosPower />
          </button>
          <button
            style={{
              display: this.shouldDisplayReset() ? 'inline-flex' : 'none'
            }}
            className='timer-button'
            onClick={() => this.timerReset()}
          >
            <IoIosRefresh />
          </button>

          <WhiteSpace number={2} />
          <table className='timer'>
            <tbody>
              <tr>
                <td>{this.formatTime60(this.state.hours)}</td>
                <td>{this.formatTime60(this.state.minutes)}</td>
                <td>{this.formatTime60(this.state.seconds)}</td>
                <td>{this.formatTime1000(this.state.milliseconds)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <WhiteSpace number={1} />
        <ListTimings onRef={ref => (this.timings = ref)} />
      </div>
    );
  }
}
