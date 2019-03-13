import React, { Component, createContext } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Icon } from 'native-base'; 
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'; // 추가된 코드

import HomeTab from './AppTabNavigator/HomeTab';
import SearchTab from './AppTabNavigator/SearchTab';
import AddMediaTab from './AppTabNavigator/AddMediaTab';
import LikesTab from './AppTabNavigator/LikesTab';
import ProfileTab from './AppTabNavigator/ProfileTab';

const AppTabNavigator = createMaterialTopTabNavigator({
  Home:{ 
    screen: HomeTab, 
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='ios-home' style={{ color: tintColor }} />
      )
    } 
  },
  Search:{ screen: SearchTab },
  AddMedia:{ screen: AddMediaTab },
  Likes:{ screen: LikesTab },
  Profile:{ screen: ProfileTab }
}, {
  animationEnabled: true,
  swipeEnabled: true,
  tabBarPosition: "bottom",
  tabBarOptions: {
    style: {
      backgroundColor:'white'
    },
    iconStyle: { 
      ...Platform.select({
        ios:{
          height: 35,
          marginBottom: 20
        }
      }) 
    },
    activeTintColor: '#000',
    inactiveTintColor: '#d1cece',
    upperCaseLabel: false,
    showLabel: false,
    showIcon: true,
  },
  defaultNavigationOptions: {
    header: null
  }
});
const AppTabContainer = createAppContainer(AppTabNavigator);

export default AppTabContainer;
// export default class MainScreen extends Component {
//   render() {
//     return <AppTabContainet/>;
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
//  