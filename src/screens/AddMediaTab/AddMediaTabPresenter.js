import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

const AddMediaTabPresenter = () => (
  <View style={style.container}>
    <Text>AddMediaTab</Text>
  </View>
)
 
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default AddMediaTabPresenter;