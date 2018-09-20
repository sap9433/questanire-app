import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ajax } from 'rxjs/observable/dom/ajax';
import { submitAssesment } from "../../actions/assesmentAction";
import { doLogout } from '../../actions/authAction';
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
      match: { params: { testid } }
    } = this.props;

    this.setState({ testStarted: true })

    const url = `/api/gettest/${testid}`;
    
    ajax.getJSON(url)
    .subscribe(
        data => {
          if(data.error){
            this.setState({
              startTestError: data.error
            })
          } else{
            this.setState({ testStarted: true, questions: data });
          }
        },
        err => this.setState({ startTestError: JSON.stringify(err) })
    );
  };

  handleCancelTest = () => {
    const {
      match: { params: { testid } },
      history: { push }
    } = this.props;
    this.setState({ showStartModal: false });
    this.props.history.push(`/enter/${testid}`);
  }

  componentWillReceiveProps(nextProps){
    const {
      match: { params: { testid } },
      history: { push }
    } = this.props;
    
    if(nextProps.answerSubmission!==this.props.answerSubmission){
      if(!nextProps.answerSubmission.error){
        doLogout();
        push(`/enter/${testid}`);
      }
    }

  }

  handleTestsubmit = event => {
    event.preventDefault();
    const {
      match: { params: { testid } },
      history: { push },
      submitAssesment
    } = this.props;
    const data = this.ansform;
    let result = [];
    for(let i=0; i < testid; i++ ){
      result.push({
        text: data[`text${i}`].value,
        ans: data[`radio${i}`].value
      })
    }
    submitAssesment({ans:result, time: 120});
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
        <form ref={form => this.ansform = form}>
        {
          this.state.questions.map((question, ind) => {
            return(
              <div key={ind}>
                <input className="question" name={`text${ind}`} type="text" value={question.text} disabled /> 
                {
                  question.options.map((option, indx) => {
                    return(
                      <div className="radio" key={indx}>
                        <input type="radio" value={option} name={`radio${ind}`}/> {option}
                      </div>
                    )
                  })
                }
             </div>
            )
          })
        }
        </form>
      </Grid>
    </Grid>
    );
  }
}

TakeTest.propTypes = {
  doLogout: PropTypes.func,
  answerSubmission: PropTypes.object,
  submitAssesment: PropTypes.func
};

const mapStateToProps = state => {
  return {
    answerSubmission: state.assesments.answerSubmission
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { 
      doLogout,
      submitAssesment,
    },
    dispatch
  );
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TakeTest));
