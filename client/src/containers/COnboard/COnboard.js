import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Bottom from '../../images/bottom.png';
import './COnboard.css';

import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core';


class COnboard extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }

  startTest = () => {
    const { history: {push}, match: { params: { testid } } } = this.props;
    push('/taketest/${testid}');
  }

  render() {
    const { user } = this.props;
    return (
      <div className='onBoardWrapper'>
        <Grid 
          container
          direction="column" 
          justify="center"
          alignItems="center"
          className="login_wrapper"
        >
        <Grid item sm={6}>
          <div className="form">
            <h1>
              Hi {user && user.name}!
            </h1>
            <p>
              Certent Challenge Quiz
              <br/><br/>
              <strong>IMPORTANT INSTRUCTIONS: </strong>
                You have a few minutes to answer the quiz. Be as correct and as quick as you can. Good Luck !
              <br/><br/>
               Please do not forget to click on the submit button as soon as you complete the quiz.
              <br/><br/>
            </p>
            <Button 
              className="enter_but"
              variant="contained" 
              color="primary"
              onClick={this.startTest}
            >
            <strong>START TEST</strong>
            </Button>
          </div>
        </Grid>
      </Grid>
      <img className='bottomImg' src={Bottom} alt="nugget" />
    </div>
    );
  }
}

COnboard.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(COnboard);
