import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import MainScreen from './components/MainScreen';
import LoginScreen from './components/LoginScreen';

const AppStackNavigator = createStackNavigator({
  Main: { screen: MainScreen },
  Login: { screen: LoginScreen },
});

export default createAppContainer(AppStackNavigator);