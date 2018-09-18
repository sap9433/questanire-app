import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ajax } from 'rxjs/observable/dom/ajax';
import { loadAssesment, submitAssesment } from "../../actions/assesmentAction";
import { bindActionCreators } from "redux";
import StartTest from "../../components/Modals/StartTest";
import Timer from "../../components/Timer/Timer";
import "./TakeTest.css";
import "./accordion.css";

import { testdata } from './data';

import {
  Grid,
  Button
} from "@material-ui/core";

export class TakeTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testStarted: true
    }
  }

  componentDidMount = () => {
  
  };

  componentWillUnmount() {

  }
  
  

  handleCancelTest = () => {
    this.setState({ showStartModal: false });
    this.props.history.push('/dashboard');
  }

  handleStartTest = () => {
    const {
      match: { params: { testid } }
    } = this.props;

    this.setState({ testStarted: true })

    const url = `/api/start-test/${testid}`;
    
    ajax.getJSON(url)
    .subscribe(
        data => {
          if(data.error){
            this.setState({
              startTestError: data.error
            })
          } else{
            this.setState({ showStartModal: false });
            this.setState({ testStarted: true });
            this.handleRunEvents();
          }
        },
        err => this.setState({ startTestError: JSON.stringify(err) })
    );
  }

  handleTestsubmit = event => {
    event.preventDefault();
    const {
      match: { params: { testid } },
      history: { push },
      submitAssesment
    } = this.props;
    
    // events
    this.handleSendEventsOnSubmit();
    this.handleFinishTest();
    //
    
    const submitData = {
      assementId: testid,
      browser: navigator.appVersion,
      sectionData: this.getSendSectionDataEvent()
    };

    console.log('submit data: ', submitData);
    submitAssesment(submitData);

    push("/candidatelogin");
  };


  handleCountTimer = (fullTime, minutes, seconds) => {
    this.fullTime = fullTime;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  calculateTime = () => {
    const fullTime = this.fullTIme;
    const minutes = this.minutes;
    const seconds = this.seconds;

    const criteria = 80 / 100;
    if (minutes * 60 + seconds >= (1 - criteria) * fullTime) {
      return true;
    }
    return false;
  }

  // Time Maximization - Did candidate utilize 80% of the time (Yes/No)
  handleTestTime = () => {
    console.log('candidate test time over 80%? : ', this.calculateTime());
  }

  render() {

    return ( 
    <Grid container>
      <Grid item xs={12}>
        <div className="headerContainer">
          <Grid container>
            <Grid item md={3} xs={3}>
              <div className="logo__img" />
            </Grid>
            <Grid item md={4} xs={4}>
              <div className="editToolbar">
              </div>
            </Grid>
            <Grid item md={3} xs={3}>
              <Timer 
                onFinish={this.handleFinishTest} 
                onRender={this.handleCountTimer}
                timerStarted={this.state.testStarted}
                key={this.state.testStarted}
              />
            </Grid>
            <Grid item md={2} xs={2}>
              <Button
                className="submit__button"
                variant="contained"
                color="primary"
                onClick={this.handleTestsubmit}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
    );
  }
}

TakeTest.propTypes = {
  testDetails: PropTypes.object,
  answerSubmission: PropTypes.object,
  loadAssesment: PropTypes.func,
  submitAssesment: PropTypes.func
};

const mapStateToProps = state => {
  return {
    testDetails: state.assesments.testDetails,
    answerSubmission: state.assesments.answerSubmission
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      submitAssesment,
      loadAssesment
    },
    dispatch
  );
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TakeTest));
