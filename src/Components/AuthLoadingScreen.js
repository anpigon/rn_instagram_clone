import React from 'react';
import { Constants, SecureStore } from 'expo';
import { AsyncStorage } from 'react-native';
import { Spinner, Container } from 'native-base';
import { connect } from 'react-redux';
import { TINT_COLOR } from '../constants/Colors';
import { loadUser } from '../reducers/steemReducer';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    const userToken = await SecureStore.getItemAsync('userToken', { keychainService: Constants.deviceId });
    // console.log('userToken:', userToken);

    try {
      if(userToken) {
        const {
          access_token,
          issued_at,
          expires_in,
          username
        }  = JSON.parse(userToken);
        
        // 1. exp 날짜 체크  
        if((issued_at + expires_in) <= (Date.now()/1000)) {
          // 만료일이 지났으면 토큰 삭제
          console.log('expired token!!!');
          await SecureStore.deleteItemAsync('userToken', { keychainService: Constants.deviceId });
          this.props.navigation.navigate('Auth');
        } else {
          console.log('authed');
          this.props.loadUser({ username });
          this.props.navigation.navigate('App', { username, token: access_token });
        }
      } else {
        this.props.navigation.navigate('Auth');
      }
    } catch(error) {
      console.error(error);
      await SecureStore.deleteItemAsync('userToken', { keychainService: Constants.deviceId });
      this.props.navigation.navigate('Auth');
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
const mapDispatchToProps = { loadUser };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);