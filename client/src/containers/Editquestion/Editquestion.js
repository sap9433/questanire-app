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
import "./Editquestion.css";
import _ from 'lodash';
import localStorage from 'localStorage';
import moment from 'moment';

import {
  Grid,
  Button
} from "@material-ui/core";

export class Editquestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  componentDidMount = () => {
    const url = `/api/gettest/50`;
    
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

  componentWillReceiveProps(nextProps){
    const {
      match: { params: { testid, time } },
      history: { push },
      doLogout,
      user
    } = this.props;
    
    if(nextProps.answerSubmission!==this.props.answerSubmission){
      if(!nextProps.answerSubmission.error){
        localStorage.removeItem(user.user_email);
        doLogout();
        push(`/enter/${testid}/${time}`);
      }
    }

  }

  handleTestsubmit = event => {
    event.preventDefault();
    const {
      match: {params: {testid, time}},
      history: { push },
      submitAssesment,
      user
    } = this.props;

    if(!user || user.account_type !== 1){
      alert(' You are not authorised to Edit this test. Log out and log in again as Admin');
      return false;
    }

    if(!parseInt(testid) || !parseInt(time)){
      alert(' Testid and Time must be intger');
      return false;
    }
    const timeElapsed = moment().diff(localStorage.getItem(user.user_email), 'seconds');
    const data = this.ansform;
    let result = [];
    for(let i=0; i < testid; i++ ){
      result.push({
        text: data[`text${i}`] ? data[`text${i}`].value: 'unknown',
        ans: data[`radio${i}`] ? data[`radio${i}`].value: 'unknown'
      })
    }
    submitAssesment({ans:result, time: timeElapsed});
  };

  render() {
    const {
      match: { params: { time } },
    } = this.props;
    return ( 
    <Grid container>
      <div className='instruction'> Edit question and answer. Please make sure that answer conatains exact text with out space</div>
      <Grid item xs={12} className="pagecontain">
        <form ref={form => this.ansform = form}>
        {
          _.shuffle(this.state.questions).map((question, ind) => {
            return(
              <div key={ind}>
                <input className="question" name={`text${ind}`} type="text" value={question.text}/> 
                {
                  _.shuffle(question.options).map((option, indx) => {
                    return(
                      <div className="radio" key={indx}>
                        <input type="text" value={option} style={{width: '100%'}} name={`radio${ind}`}/>
                      </div>
                    )
                  })
                }
             </div>
            )
          })
        }
        </form>
        <Grid item md={2} xs={2}>
          <Button
            className="submit__button"
            variant="contained"
            color="primary"
            onClick={() => alert('Under Construction')}
          >
            SUBMIT
          </Button>
        </Grid>
      </Grid>
    </Grid>
    );
  }
}

Editquestion.propTypes = {
  doLogout: PropTypes.func,
  answerSubmission: PropTypes.object,
  submitAssesment: PropTypes.func,
  user: PropTypes.any
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
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
)(Editquestion));
