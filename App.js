import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainScreen from './Components/MainScreen';
import LoginScreen from './Components/LoginScreen';

const AppStackNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: MainScreen }
});

export default createAppContainer(AppStackNavigator);