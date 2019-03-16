import React from 'react';
import { 
  createSwitchNavigator, // here
  createStackNavigator, 
  createAppContainer 
} from 'react-navigation';

import MainScreen from '../components/MainScreen';
import LoginScreen from '../components/LoginScreen';
import AuthLoadingScreen from '../components/AuthLoadingScreen';

const AppStack = createStackNavigator({ 
  Main: { 
    screen: MainScreen 
  } 
}, 
{
  headerMode: 'screen',
  defaultNavigationOptions: {
    header: null
  }
});

const AuthStack = createStackNavigator({ 
  Login: { 
    screen: LoginScreen,
    navigationOptions: {
      // title: 'Login',
      header: null
    }
  }
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading'
  }
));