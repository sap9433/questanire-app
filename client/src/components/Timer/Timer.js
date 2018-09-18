import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import { ajax } from 'rxjs/observable/dom/ajax';
import './Timer.css';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false,
    }
    this.fullTime = 20 * 60 * 1000;
    this.remainingSeconds = this.fullTime;
    this.currentStatus = false;
  }
  
  componentDidMount() {
    const url = `/api/timer/${this.props.testid}`;
    
    ajax.getJSON(url)
    .subscribe(
        data => {
          console.log("data ", data);
          const currentTime = new Date();
          const startedAt = new Date();
          const result = currentTime - startedAt;
          console.log("result ", result);
    
          const fullTime = this.fullTime;
          // this.remainingSeconds = result ? fullTime - result : fullTime;
    
          if (this.remainingSeconds <= 0)
            this.setState({completed: true});
        },
        err => console.log(err)
    );
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    if (this.currentStatus) {
      return false;
    }
    return true;
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
            !timerStarted && <span>00:00</span>
          }
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
