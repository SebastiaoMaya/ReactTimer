import React, { Component } from 'react';
import Timing from '../timing/Timing';
import './ListTimings.css';

export default class ListTimings extends Component {
  state = {
    timings: []
  };

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  addTiming = timing => {
    this.setState(currentState => {
      currentState.timings.push(timing);
      return { timings: currentState.timings };
    });
  };

  resetRecordedTimes = () => {
    this.setState({ timings: [] });
  };

  render() {
    return (
      <div>
        {(() => {
          if (this.state.timings.length !== 0) {
            return <p>Recorded Times:</p>;
          }
        })()}

        <table>
          <tbody>
            {this.state.timings.map(timing => (
              <Timing timing={timing} key={timing} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
//12h08
