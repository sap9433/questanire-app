import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { email as validEmail } from '../../utils/validation';
import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  TextField
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import bottom from '../../images/bottom.png';
import clouds from '../../images/clouds.png';
import './CRegister.css';

const invalidMsg = [
  'Please type your name!',
  'Please type valid email!',
  'Please type password correctly!',
];

const company = 'McGill Case League';

class CRegister extends Component {
  constructor(props) {
    super(props);
  
    const { user = {} } = props;
    this.state = {
      valid: 0,
      fname: user && user.name || '',
      lname: '',
      email: user && user.user_email || '',
      password: '',
      showPassword: false,
    };
  }


  render() {
    const { user = {} } = this.props;
    const { valid } = this.state;
    const validationStyle = valid === 0 ? 'validationTrue' : 'validationFalse';
    return (
      <div className={'onBoardWrapper'}>
        <Grid 
          container
          direction="column" 
          justify="center"
          alignItems="center"
          className="login_wrapper"
        >
          <Grid item sm={6}>
            <div className="form">
              <div className='text'>
                <h1>
                  Thank you {user && user.name}!
                </h1>
                <p>
                  That's it! We've received your challenge submission. 
                  <br/><br/>
                  If you would like to receive <strong>feedback</strong> on your assessment, please enter your email address below.
                </p>
              </div>        
            </div>
          </Grid>
        </Grid>
        
        <img className='cloudImage' src={clouds} alt="cloud" />
        <img className='bottomImg' src={bottom} alt="nugget" />
      </div>   
    );
  }
}

CRegister.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(CRegister);
