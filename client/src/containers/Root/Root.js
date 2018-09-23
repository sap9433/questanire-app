import React, { Component } from "react";
import { Route, Switch, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import qs from 'qs';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';
import {
  fetchSession
} from '../../actions/authAction';
import './Root.css';
import Header from '../../components/Header/Header';

const Loading = () => <div>Loading...</div>; //

const NotFound = Loadable({
  loader: () => import('../NotFound/NotFound'),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import('../Login/Login'),
  loading: Loading,
});

const Results = Loadable({
  loader: () => import('../Results/Results'),
  loading: Loading,
});

const CEnter = Loadable({
  loader: () => import('../CEnter/CEnter'),
  loading: Loading,
});

const COnboard = Loadable({
  loader: () => import('../COnboard/COnboard'),
  loading: Loading,
});

const TakeTest = Loadable({
  loader: () => import('../TakeTest/TakeTest'),
  loading: Loading,
});

class Root extends Component {

  componentDidMount() {
    this.props.fetchSession();
  }

  componentWillReceiveProps (newProps) {
    const { user = {}, location: {pathname, search}, history, status } = newProps;
    const enablePrivateRoute = true;

    const privateRoutes = [
      '/results',
      '/createtest',
      '/register/login'
    ];
    if (!this.props.user && newProps.user) {
      // login
      const gotoUrl = qs.parse(search).goto;
      if (gotoUrl) {
        history.push(gotoUrl);
      } else {
        const redirectIfLoggedIn = ['/'];
        if(redirectIfLoggedIn.indexOf(pathname) > -1){
          history.push('/register/login');
        }
      }
    } 
    if( !user && status !== this.props.status &&  privateRoutes.indexOf(pathname) > -1 && enablePrivateRoute){
      history.push(`/?goto=${pathname}`);
    }
  }

  render() {
    const { user, location: { pathname } } = this.props;
    const pageurls = ['/taketest/.*', '^/$', '^/results'];
    const regex = new RegExp(pageurls.join("|"), "i");
    const hideHeader = regex.test(pathname);
    return (
      <MuiThemeProvider theme={theme}>
        <div className="wrapper">
          {!hideHeader && <Header user={user} />}
          <div className={!hideHeader ? "root__container" : ''}>
            <Switch>
              <Route exact path="/" render={(props) => <Login user={user} {...props} />}/>
              <Route exact path="/register/login" render={(props) => <Login user={user} {...props} />}/>     
              <Route path="/results/:count" render={(props) => <Results user={user} {...props}/>}/>
              <Route path="/enter/:testid/:time" render={(props) => <CEnter user={user} {...props}/>}/>
              <Route path="/onboard/:testid/:time" render={(props) => <COnboard user={user} {...props}/>}/>
              <Route path="/taketest/:testid/:time" render={(props) => <TakeTest user={user} {...props}/>}/>
              <Route component={NotFound} />
           </Switch>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Root.propTypes = {
  user: PropTypes.any,
  status: PropTypes.any
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    status: state.auth.status,
    loading: state.auth.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchSession
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
