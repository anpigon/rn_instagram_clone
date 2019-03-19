import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

const ProfileTabPresenter = () => (
  <View style={style.container}>
    <Text>ProfileTab</Text>
  </View>
)
 
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ProfileTabPresenter;