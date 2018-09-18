import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import bottom from '../../images/bottom.png';
import clouds from '../../images/clouds.png';
import './COnboard.css';

import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core';

const company = 'McGill Case League';

class COnboard extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }

  render() {
    const { user, match: { params: { testid } } } = this.props;

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
              Hi there!
            </h1>
            <p>
              {company} would like to see if you’re a good fit for the program. We’re going to give you a challenge and ask you to solve it in three steps.

              <br/><br/>
              <strong>IMPORTANT INSTRUCTIONS:</strong>
              There are four containers which you will be asked to “identify the problem”, “collect important information” (you can drag and drop text), “engender ideas (brainstrom up to 3 alternatives)”, and “recommend a solution”. Use bullet points or full sentences, it’ s up to you! We’re measuring your decision-making process and problem solving skills.

              <br/><br/>
              A confirmation message will pop up just after this screen before you get started. You 'll have 20 minutes to complete the challenge.
              <br/><br/>

              Goodluck!
            </p>

            <a href={`/taketest/${testid}`}>
              <Button 
                className="enter_but"
                variant="contained" 
                color="primary"
              >
              <strong>START TEST</strong>
              </Button>
            </a>

          </div>
        </Grid>
      </Grid>
      
      <img className='cloudImage' src={clouds} alt="cloud" />
      <img className='bottomImg' src={bottom} alt="nugget" />

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