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
      testStarted: true,
      questions: []
    }
  }

  componentDidMount = () => {
    const {
      match: { params: { count } }
    } = this.props;

    this.setState({ testStarted: true })

    const url = `/api/gettest/${count}`;
    
    ajax.getJSON(url)
    .subscribe(
        data => {
          if(data.error){
            this.setState({
              startTestError: data.error
            })
          } else{
            this.setState({ testStarted: true, questions: data.questions });
          }
        },
        err => this.setState({ startTestError: JSON.stringify(err) })
    );
  };

  handleCancelTest = () => {
    const {
      match: { params: { count } }
    } = this.props;
    this.setState({ showStartModal: false });
    this.props.history.push(`/enter/${count}`);
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

  render() {

    return ( 
    <Grid container>
      <Grid item xs={12}>
        <div className="headerContainer">
          <Grid container>
            <Grid item md={3} xs={3}>
              <div className="logo__img" />
            </Grid>
            <Grid item md={7} xs={7}>
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
      <Grid item xs={12}>
        {
          this.state.questions.map((question, ind) => {
            return(
              <div>
                {question.text}
                {
                  question.options.map((option, indx) => {
                    return(
                      <div> {option} </div>
                    )
                  })
                }
                <div className="container">
                    <div className="row">
                      <div className="col-sm-12">

                        <form>
                          <div className="radio">
                            <label>
                              <input type="radio" value="option1" checked={true} />
                              Option 1
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input type="radio" value="option2" />
                              Option 2
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input type="radio" value="option3" />
                              Option 3
                            </label>
                          </div>
                        </form>

                      </div>
                    </div>
                  </div>
                </div>
            )
          })
        }
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
