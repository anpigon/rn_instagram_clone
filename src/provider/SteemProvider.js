import React, { Component, createContext } from 'react';

const Context = createContext(); 

const { Provider, Consumer: SteemConsumer } = Context; 

class SteemProvider extends Component {
  state = {
    username: '', // 사용자 이름
  }

  actions = {
    setUsername: (username) => {
      this.setState({ username });
    }
  }

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    )
  }
}

export {
  SteemProvider,
  SteemConsumer,
};