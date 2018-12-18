import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import './Timer.css';


export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false,
    }
    const { time } = this.props;
    this.fullTime = time * 60 * 1000;
    this.remainingSeconds = this.fullTime;
    this.currentStatus = false;
  }
  

  renderer = ({ minutes, seconds, completed }) => {

    if (completed || this.completed) {
      // Render a completed state
      // this.props.onFinish();
      this.props.onRender(this.fullTime, 0, 0);
      return <span>Finished</span>;
    } else {
      // Render a countdown
      this.props.onRender(this.fullTime, minutes, seconds);
      return <span>{minutes} : {seconds}</span>;  
    }
  };

  render() {
    const { timerStarted } = this.props;
    this.currentStatus = timerStarted;

    return (
      <div className='timer'>
        <p>
          <small>Time remaining</small>
          {
            timerStarted && 
            <Countdown
              date={Date.now() + this.remainingSeconds}
              renderer={this.renderer}
            />
          }          
        </p>
      </div>
    );
  }
}
