import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

const LikesTabPresenter = () => (
  <View style={style.container}>
    <Text>LikesTab</Text>
  </View>
)
 
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default LikesTabPresenter;