import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
import { email as validEmail } from '../../utils/validation';
import './CSignIn.css';

const company = 'McGill Case League';

class CSignIn extends Component {
  constructor(props) {
    super(props);
  
    const { user = {} } = props;
    let email = '';
    if (user) {
      email = user.user_email;
    }
    this.state = {
      valid: true,
      email: email,
      password: '',
      showPassword: false
    };
  }

  handleChangeInfo = name => event  => {
    this.setState({ [name]: event.target.value, valid: true });
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleSignin = (evt) => {
    evt.preventDefault();
    const { email, password } = this.state;
    if (validEmail(email) === undefined && password.length > 4 && email.length > 5) {
      // this.props.signin({email, password});
      this.props.history.push('/cdashboard');
      return;
    }
    this.setState({ valid: false });
  }

  render() {
    const { valid, email, password } = this.state;
    const { user = {} } = this.props;
    const validationStyle = valid ? 'validationTrue' : 'validationFalse';
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
            <div className='text'>
              <h1>
                Thank you {user && user.name}!
              </h1>
              <p>
                Great job! We've received your challenge submission. It will be assessed shortly and {company} will receive your results.
                <br/><br/>
              </p>
            </div>

          </div>
        </Grid>
      </Grid>      
      <img className='bottomImg' src={bottom} alt="nugget" />
      </div>
    );
  }
}

CSignIn.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(CSignIn);
