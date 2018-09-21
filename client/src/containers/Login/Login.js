import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { doLogout, doSignin } from '../../actions/authAction';
import bottom from '../../images/bottom.png';
import './Login.css';
import {
  Button,
  Grid,
  Hidden,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton
} from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const invalidMsg = [
  'Invalid Username!',
  'Invalid Email!',
  'Invalid Password!',
];

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: 0,
      login_email: '',
      login_pwd: '',
    };
  }

  componentDidMount() {
  }

  handleChangeInfo = name => event  => {
    this.setState({ [name]: event.target.value, valid: 0 });
  }


  handleSignin = (event) => {
    event.preventDefault();
    const { login_email, login_pwd } = this.state;

    this.props.doSignin({ email: login_email, password: login_pwd });
  }

  render() {
    const { valid } = this.state;
    const { user, doLogout, status = {} } = this.props;

    let validationStyle;
    if (valid > 0 || (valid === -1 && status.error))
      validationStyle = 'validationFalse';
    else if (valid === -1 && !status.error)
      validationStyle = 'success';
    else
      validationStyle = 'validationTrue';
    return (
      <div className='loginPage'>
        {
          !user &&
          <Grid 
            sm={12}
            container
            direction="column" 
            justify="center"
            alignItems="center"
            className="login_wrapper"
          >
            <img className='bottomImg' src={bottom} alt="nugget" />
            <Grid item sm={6}>
              <div className="login_form">
                <h1><strong>Admin Login</strong></h1>
                <TextField
                  id="login_email"
                  label="Email"
                  className="text_field"
                  value={this.state.login_email}
                  onChange={this.handleChangeInfo('login_email')}
                  margin="normal"
                />
                <FormControl className={"text_field"}>
                  <InputLabel htmlFor="adornment-password">Password</InputLabel>
                  <Input
                    id="adornment-password"
                    className="password_field"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.login_pwd}
                    onChange={this.handleChangeInfo('login_pwd')}
                  />
                </FormControl>

                <Button 
                  className="register_but"
                  variant="contained" 
                  color="primary"
                  onClick={this.handleSignin}
                >
                  Login
                </Button>
                {
                  <div className={validationStyle}>
                    <i className="fa fa-exclamation-triangle valid__icon"></i>
                    <p className="valid__text">
                      &nbsp;
                      {valid !== 0 && invalidMsg[valid - 1]}
                      {valid === -1 && status.message}
                    </p>
                  </div>
                } 

              </div>
            </Grid>
          </Grid>
        }
        {user && user.account_type === 1 &&
        <div>
          <p>You are currently logged in as {user.name}.</p>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text"> Your account type is <strong>{user.account_type === 1 ? ' Admin ' : 'Quiz Taker'}</strong> . Thank you for registering with us</p>
              <a href="/" onClick={doLogout} className="btn btn-primary" >Log out</a>
              <div className='sidebytop'>
                  <div className='sidebyleft'> <a href='/results'>Leader Board </a> </div>
                  <div className='sidebyright'> <a href='/enter/5/3'> Take Test </a> </div>
              </div>
              <div className='sidebytop'>
                  <div className='sidebyleft'> <a href='/api/download'> Download </a> </div>
                  <div className='sidebyright'> <a href='/api/delete'> Delete Leader board </a> </div>
              </div>
            </div>
          </div>
        </div>
        }
        {user && user.account_type === 2 &&
          <div className='error'> You are not authorised to see this page <a href="/" onClick={doLogout} className="btn btn-primary" >Log out</a></div>
        }
      </div>
    );
  }
}

Login.propTypes = {
  doLogout: PropTypes.func,
  doSignin: PropTypes.func,
  status: PropTypes.object,
};


const mapStateToProps = state => {
  return {
    status: state.auth.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    doLogout,
    doSignin,
  }, dispatch)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
