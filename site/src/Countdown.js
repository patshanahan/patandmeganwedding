import React, { Component } from 'react';
import './Countdown.css';
import countdownImg from './rings.jpg';

var countdownBG = {
  backgroundImage: 'url(' + countdownImg + ')'
}

var targetDate = new Date(2018, 6, 13, 15);

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: null,
      hours: null,
      minutes: null,
      seconds: null
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.updateTime(new Date()), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateTime(curDate) {
    const dateDif = targetDate-curDate;
    const newDays = Math.floor(dateDif/86400000);
    const newHours = Math.floor((dateDif-newDays*86400000)/1000/60/60);
    const newMinutes = Math.floor((dateDif-(newDays*24+newHours)*3600000)/1000/60);
    const newSeconds = Math.floor((dateDif-(newDays*1440+newHours*60+newMinutes)*60000)/1000);

    this.setState({
      days: newDays,
      hours: newHours,
      minutes: newMinutes,
      seconds: newSeconds
    });
  }

  render() {
    const days = this.state.days !== null ? this.state.days : '#';
    const hours = this.state.hours !== null ? this.state.hours : '#';
    const minutes = this.state.minutes !== null ? this.state.minutes : '#';
    const seconds = this.state.seconds !== null ? this.state.seconds : '#';

    return (
      <div className="App-countdown" style={countdownBG}>
        <div className="App-countdownContent style-backdrop">
          <h3 className="App-countdownTitle">
              It finally happens in...
          </h3>
          <table className="App-countdownTable">
            <tbody>
              <tr>
                <th className="App-days">{days}</th>
                <th className="App-hours">{hours}</th>
                <th className="App-minutes">{minutes}</th>
                <th className="App-seconds">{seconds}</th>
              </tr>
              <tr>
                <td>Days</td>
                <td>Hours</td>
                <td>Minutes</td>
                <td>Seconds</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Countdown;