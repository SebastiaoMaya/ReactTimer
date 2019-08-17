import React, { Component } from 'react';
import './Clock.css';

export default class Clock extends Component {
  state = {
    date: new Date()
  };

  tick = () =>
    this.setState(currentState => ({
      date: new Date()
    }));

  render() {
    return (
      <div>
        <p className='clock'>{this.state.date.toLocaleTimeString()}</p>
      </div>
    );
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }
}
