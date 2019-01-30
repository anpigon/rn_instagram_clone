import React, { Component } from 'react';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './src/App';
import allReducers from './src/reducers';

const store = createStore(allReducers, applyMiddleware(thunk));

// export default () => <App/>;
export default class Root extends Component {
  render() {
    return (
      <Provider store={ store }>
        <App/>
      </Provider>
    )
  }
}