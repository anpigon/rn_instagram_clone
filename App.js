import React, { Component } from 'react';
import { Root } from "native-base";
import { Font, AppLoading } from "expo";
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './src/App';
import allReducers from './src/reducers';

const store = createStore(allReducers, applyMiddleware(thunk));

// export default () => <App/>;
export default class RootApp extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      loaded: false 
    };
  }

  async componentWillMount() {
    console.log('Run App!!!');

    await this.loadAssets();
    this.setState({ loaded: true });
  }

  loadAssets = async() => {
		// Font Preloading
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Sweet_Sensations_Persona_Use: require('./assets/Sweet_Sensations_Persona_Use.ttf')
    });

		// Images Preloading
    // await Asset.loadAsync([
    //   require("./assets/icon.png")
    // ])

    console.log('loadAssets complete!!!');
  }

  render() {
    const { loaded } = this.state;
    if(loaded) {
      return (
        <Provider store={ store }>
          <Root>
            <App/>
          </Root>
        </Provider>
      );
    } else {
      return (
        <AppLoading />
      );
    }
  }
}