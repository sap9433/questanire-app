import React, { Component } from "react";
import { Provider } from 'react-redux'
import store from '../../reducers/store';
import Root from '../Root/Root';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

export default App;
