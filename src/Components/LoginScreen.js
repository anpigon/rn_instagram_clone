import React, { Component } from 'react';
import { 
	StyleSheet, 
	View, 
	Modal, 
	// AsyncStorage // here
} from 'react-native';
import { Icon, Container, Button, Text, Input } from 'native-base'; 
import styled from 'styled-components';

import { Constants, SecureStore } from 'expo';
import SteemConnectModal from './SteemConnectModal';
import steemConnect from '../steemConnect';

const Title = styled.Text`
	font-family: 'Sweet_Sensations_Persona_Use';
	font-size: 60;
	/*padding-vertical: 50;*/
	margin-bottom: 60;
	color: #242424;
`;

export default class LoginScreen extends Component {
  static navigationOptions = {
		title: 'Login',
	}
	
  constructor(props) {
    super(props);

    this.state = {
			modalVisible: false,
			loggedin: false
			// username: null,
		}
	}

	_signInAsync = async (userToken) => {
		this.setState({ loggedin: true });

		// 토큰 발급일
		userToken['issued_at'] = Math.floor(Date.now() / 1000);

		// 토큰 저장
    await SecureStore.setItemAsync('userToken', JSON.stringify(userToken), { keychainService: Constants.deviceId });
		// console.log('userToken:', userToken);
		
    this.props.navigation.navigate('App');
  };

	// 모달창 닫기
	_handleOnModalClose = () => {
		this.setState({ modalVisible: false });
	}

	// 스팀커넥트 성공
  _onSteemconnectSuccess = (tokens) => {
		this.setState({ modalVisible: false });
		// console.log('tokens', tokens);

		this._signInAsync(tokens); // 로그인 성공

		/*
		// AccessToken 셋팅
		steemConnect.setAccessToken(tokens.access_token);

		// 계정 정보 조회
		steemConnect.me().then(({ account }) => {
			const { profile }  = JSON.parse(account.json_metadata);
			console.log('profile', profile);
			this.setState({ username: profile.name });
		});
		*/
	}

  render() {
    return (
			<Container style={styles.container}>
				<Title>Insteemgram</Title>
				<Button style={styles.loginButton}
					onPress={() => { 
						this.setState({ modalVisible: true }) 
					}}
					disabled={this.state.loggedin}
					block
					primary>
					<Text>Steemconnect Login</Text>
				</Button>
				{/** 스팀커넥트 모달창 **/}
				<Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <SteemConnectModal
            handleOnModalClose={this._handleOnModalClose}
						onSteemconnectSuccess={this._onSteemconnectSuccess}
          />
        </Modal>
			</Container>
		)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
	},
	loginButton: {
		marginHorizontal: 30, 
		backgroundColor: '#3798f2', 
		height: 55
	}
});
