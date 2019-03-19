import React from 'react';
import { Platform } from 'react-native';
import { Icon } from 'native-base'; 
import { createMaterialTopTabNavigator, createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'; // 추가된 코드

// import HomeTab from '../components/AppTabNavigator/HomeTab';
import HomeTab from '../screens/HomeTab';
import SearchTab from '../screens/SearchTab';
import AddMediaTab from '../screens/AddMediaTab';
import LikesTab from '../screens/LikesTab';
import ProfileTab from '../screens/ProfileTab';

// const TabNavigation = createMaterialTopTabNavigator({
const TabNavigation = createBottomTabNavigator({
  Home:{ 
    // screen: createStackNavigator({
		// 	HomeTab : {
		// 		screen: HomeTab,
		// 		navigationOptions: {
		// 			title: 'Home',
		// 		}
		// 	}
		// }), 
		screen: HomeTab, 
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => <Icon name='ios-home' style={{ color: tintColor }} />
    } 
  },
  Search:{ 
		screen: SearchTab, 
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => <Icon name='ios-search' style={{ color: tintColor }} />
		}  
	},
  AddMedia:{ screen: AddMediaTab, 
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => <Icon name='ios-add-circle' style={{ color: tintColor }} />
		}  
	},
  Likes:{ 
		screen: LikesTab, 
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => <Icon name='ios-heart' style={{ color: tintColor }} />
		} 
	},
  Profile:{ 
		screen: ProfileTab, 
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => <Icon name='person' style={{ color: tintColor }} />
		} 
	}
}, {
  // animationEnabled: true,
  // swipeEnabled: true,
  // tabBarPosition: "bottom",
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
  // defaultNavigationOptions: {
  //   header: null
  // }
});

export default createAppContainer(TabNavigation);