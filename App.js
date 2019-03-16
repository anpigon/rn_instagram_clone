import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Root } from "native-base";
import { Font, AppLoading } from "expo";
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

// import App from './src/App';
import MainNavigation from './src/navagation/MainNavigation';
import allReducers from './src/reducers';

const logger = createLogger(); 
const store = createStore(allReducers, applyMiddleware(logger, thunk));

// export default () => <App/>;
export default class RootApp extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      loaded: false 
    };
  }

  // async componentWillMount() {
  //   console.log('Run App!!!');

  //   await this.loadAssets();
  //   this.setState({ loaded: true });
  // }

  handleError = (error) => console.log(error);

  handleLoaded = () => this.setState({ loaded: true });

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
    return (
      <>
        <StatusBar barStyle="dark-content"/>
        {
          (loaded)
          ?
          <Root>
            <Provider store={ store }>
              <MainNavigation/>
            </Provider>
          </Root>
          :
          <AppLoading 
            startAsync={this.loadAssets}
            onFinish={this.handleLoaded} 
            onError={this.handleError} />
        }
      </>
    );
  }
}