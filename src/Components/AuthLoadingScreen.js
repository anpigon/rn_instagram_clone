import React from 'react';
import { Constants, SecureStore } from 'expo';
import { AsyncStorage } from 'react-native';
import { Spinner, Container } from 'native-base';
import { connect } from 'react-redux';
import { TINT_COLOR } from '../constants/Colors';
import { setUsername } from '../reducers/steemReducer';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  goMainScreen() {
    this.props.navigation.navigate('App');
  }

  goLoginScreen() {
    this.props.navigation.navigate('Auth');
  }

  async componentWillMount() {
    const userToken = await SecureStore.getItemAsync('userToken', { keychainService: Constants.deviceId });
    // console.log('userToken:', userToken);

    if ( !userToken ) {
      return this.goLoginScreen();
    }

    try {
      const {
        access_token,
        issued_at,
        expires_in,
        username
      }  = JSON.parse(userToken);
      
      // 1. exp 날짜 체크  
      if ( (issued_at + expires_in) <= (Date.now() / 1000) ) {
        // 만료일이 지났으면 토큰 삭제
        console.log('expired token!!!');
        await SecureStore.deleteItemAsync('userToken', { keychainService: Constants.deviceId });
        this.goLoginScreen();
      } else {
        // 인증(로그인) 상태
        // console.log('authed');
        this.props.setUsername({ username });
        this.goMainScreen();
      }
      
    } catch(error) {
      console.error(error);
      await SecureStore.deleteItemAsync('userToken', { keychainService: Constants.deviceId });
      this.goLoginScreen();
    }

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <Container style={{flex:1, justifyContent:'center' }}>
        <Spinner color={ TINT_COLOR } />
      </Container>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = { 
  setUsername 
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);