import React from 'react';
import Clock from '../components/clock/Clock';
import TimerExt from '../components/timer/TimerExt';
import WhiteSpace from '../components/white-space/WhiteSpace';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Clock />
      <WhiteSpace number={2} />
      <TimerExt />
    </div>
  );
}

export default App;
