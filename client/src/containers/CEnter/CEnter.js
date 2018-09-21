import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clientSoftLogin } from '../../actions/authAction';
import { bindActionCreators } from 'redux';
import bottom from '../../images/bottom.png';
import './CEnter.css';
import {
  Button,
  Grid,
  TextField,
} from '@material-ui/core';

const invalidMsg = [
  'Please type valid name!',
  'Please type valid email!'
];

class CEnter extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      valid: 0,
      fname: '',
      lname: '',
      email: '',
    };
  }
  
  handleChangeInfo = name => event  => {
    this.setState({ [name]: event.target.value, valid: 0 });
  }

  validateEmail =  (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  handleSignin = (evt) => {
    evt.preventDefault();
    const { fname, lname, email } = this.state;
    const { clientSoftLogin } = this.props;
    if (fname.length < 3 || lname.length < 3) {
      this.setState({ valid: 1 });
      return;
    }
    if (!this.validateEmail(email)) {
      this.setState({ valid: 2 });
      return;
    }
    clientSoftLogin({ 
      name: `${fname} ${lname}`,
      email
    });
  }

  componentWillReceiveProps(newProps){
    const { match: { params: { testid, time } }, history: { push }, user } = this.props;
    if(newProps.user && newProps.user !== user){
      push(`/onboard/${testid}/${time}`);
    }
  }

  render() {
    const { valid } = this.state;
    const validationStyle = valid === 0 ? 'validationTrue' : 'validationFalse';
    return (
      <div className='signinWrapper'>
        <img className='bottomImg' src={bottom} alt="nugget" />
        <Grid 
          container
          direction="column" 
          justify="center"
          alignItems="center"
          className="login_wrapper"
        >
          <Grid item sm={6}>
            <div className="login_form">
              <h1><strong>Candidate Login</strong></h1>
              <h4>Enter the form below to begin</h4>

              <TextField
                id="fname"
                label="First Name"
                className="text_field"
                value={this.state.fname}
                onChange={this.handleChangeInfo('fname')}
                margin="normal"
              />

              <TextField
                id="lname"
                label="Last Name"
                className="text_field"
                value={this.state.lname}
                onChange={this.handleChangeInfo('lname')}
                margin="normal"
              />

              <TextField
                id="email"
                label="Email"
                className="text_field"
                value={this.state.email}
                onChange={this.handleChangeInfo('email')}
                margin="normal"
              />
              
              <Button 
                className="enter_but"
                variant="contained" 
                color="primary"
                onClick={this.handleSignin}
              >
                Enter
              </Button>

              {
                <div className={validationStyle}>
                  <i className="fa fa-exclamation-triangle valid__icon"></i>
                  <p className="valid__text">
                    &nbsp;
                    {valid !== 0 && invalidMsg[valid - 1]}
                  </p>
                </div>
              } 

            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CEnter.propTypes = {
  clientSoftLogin: PropTypes.func,
  pushState: PropTypes.func,
  routeParams: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    clientSoftLogin
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(CEnter);

