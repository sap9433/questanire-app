import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { doLogout, doSignin, register } from '../../actions/authAction';
import Ellipse from '../../images/Ellipse.png';
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
      register_name: '',
      register_email: '',
      register_pwd: '',
      login_email: '',
      login_pwd: '',
      showRegister: true,
      reg_show_password: false,
      login_show_password: false,
    };
  }

  componentDidMount() {
    const { match: { params: { islogin } } } = this.props;
    if (islogin === 'login') {
      this.setState({ showRegister: false });
    }
  }

  handleRegister = (event) => {
    event.preventDefault();
    
    const { register_name, register_email, register_pwd } = this.state;

    if (register_name.length < 3 || register_name.indexOf('asds') !== -1) {
      this.setState({ valid: 1});
      return;
    }
    if (!register_email.length || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(register_email)) {
      this.setState({ valid: 2});
      return;    
    }
    if (register_pwd.length < 5) {
      this.setState({ valid: 3});
      return;
    }
    
    this.setState({ valid: -1});
    this.props.register({ email:register_email, password:register_pwd, name:register_name, accounttype: 1 });
  }

  handleChangeInfo = name => event  => {
    this.setState({ [name]: event.target.value, valid: 0 });
  }

  handleRegisterSuccess = () => {
    this.props.history.push('/dashboard');
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

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
        {!user && this.state.showRegister &&
          <Grid 
            className="register_wrapper"
            container 
            spacing={40} 
            justify="center"
          >
            <Grid item sm={6}>
              <div className="login_form">
                <h1><strong>Tell us about yourself</strong></h1>
                <h4>Own your personal space.</h4>
                <TextField
                  id="company"
                  label="Username"
                  className="text_field"
                  value={this.state.register_name}
                  onChange={this.handleChangeInfo('register_name')}
                  margin="normal"
                />
                <TextField
                  id="register_email"
                  label="Email"
                  className="text_field"
                  value={this.state.register_email}
                  onChange={this.handleChangeInfo('register_email')}
                  margin="normal"
                />
                <FormControl className={"text_field"}>
                  <InputLabel htmlFor="adornment-password">Password</InputLabel>
                  <Input
                    id="adornment-password"
                    className="password_field"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.register_pwd}
                    onChange={this.handleChangeInfo('register_pwd')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                        >
                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <Button 
                  className="register_but"
                  variant="contained" 
                  color="primary"
                  onClick={this.handleRegister}
                >
                  Get Started
                </Button>

                <div className='toggleText'>
                  Already have an account?
                  <span  
                    onClick={() => this.setState({ showRegister: false })}
                    className="goto_login"
                  >
                    &nbsp;Login
                  </span>
                </div>

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
            <Hidden only="xs">
              <Grid item xs={6}>
                <img src={Ellipse} alt="nugget" />
              </Grid>
            </Hidden>
          </Grid>
        }
        {!user && !this.state.showRegister &&
        <Grid 
          sm={12}
          container
          direction="column" 
          justify="center"
          alignItems="center"
          className="login_wrapper"
        >
          <Grid item sm={6}>
            <div className="login_form">
              <h1><strong>Employer Login</strong></h1>
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
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
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

              <div className='toggleText'>
                Don't have an account?
                <Link to="/">
                  <span>&nbsp;Register</span>
                </Link>
              </div>

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
           
           <img className='bottomImg' src={bottom} alt="nugget" />
        </Grid>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>
          <h1> Account Details </h1>
          <div className="card">
            <img className="card-img-top" src="https://iffhs.de/wp-content/uploads/2017/12/lionel-messi.jpg" alt="ProfilePic" style={{ width: 150, height: 150 }}/>
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text"> Your account type is <strong>{user.account_type === 1 ? ' Employer' : 'Test Taker'}</strong> . Thank you for registering with us</p>
              <a href="/" onClick={doLogout} className="btn btn-primary" >Log out</a>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}

Login.propTypes = {
  register: PropTypes.func,
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
    register,
  }, dispatch)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
