import React, { Component } from "react";
import { Route, Switch, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import qs from 'qs';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';
import { setItem } from '../../helpers/localStorage';
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

const Home = Loadable({
  loader: () => import('../Home/Home'),
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
const CSignIn = Loadable({
  loader: () => import('../CSignIn/CSignIn'),
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
      '/dashboard',
      '/createtest'
    ];
    if (!this.props.user && newProps.user) {
      // login
      const gotoUrl = qs.parse(search).goto;
      if (gotoUrl) {
        history.push(gotoUrl);
      } else {
        const redirectIfLoggedIn = ['/'];
        setItem('firstlogin', 'true');
        if(redirectIfLoggedIn.indexOf(pathname) > -1){
          history.push('/dashboard');
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
              <Route exact path="/"  component={Home} /> 
              <Route path="/register/:islogin?" render={(props) => {
                const {
                    match: {
                      params: { islogin }
                    }
                  } = props;
                return(<Login 
                key={`${islogin}`}
                user={user} {...props}
                />)
               }
              } />            
              <Route path="/results" render={(props) => <Results user={user} {...props}/>}/>
              <Route path="/enter/:testid" render={(props) => <CEnter user={user} {...props}/>}/>
              <Route path="/onboard/:testid" render={(props) => <COnboard user={user} {...props}/>}/>
              <Route path="/taketest/:testid" render={(props) => <TakeTest user={user} {...props}/>}/>
              <Route path="/candidatelogin" component={CSignIn}/>
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
