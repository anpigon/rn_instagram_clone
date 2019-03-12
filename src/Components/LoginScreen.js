import React, { Component } from 'react';
import { 
	StyleSheet, 
	View, 
	Modal, 
	AsyncStorage // here
} from 'react-native';
import { Icon, Container, Button, Text } from 'native-base'; 

import SteemConnectModal from './SteemConnectModal';
import steemConnect from '../steemConnect';

export default class LoginScreen extends Component {
  static navigationOptions = {
		title: 'Login',
	}
	
  constructor(props) {
    super(props);

    this.state = {
			modalVisible: false,
			// username: null,
		}
	}

	_signInAsync = async (userToken) => {
    await AsyncStorage.setItem('userToken', userToken);
    this.props.navigation.navigate('App');
  };

	// 모달창 닫기
	_handleOnModalClose = () => {
		this.setState({ modalVisible: false });
	}

	// 스팀커넥트 성공
  _onSteemconnectSuccess = (tokens) => {
		this.setState({ modalVisible: false });
		// console.log(tokens);

		this._signInAsync(tokens.access_token)

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
		const { username } = this.state;

    return (
			<Container style={styles.container}>
				<View style={{justifyContent:'center',alignItems: 'center'}}>
					{/* {
						username ? <Text>{ username }님 환영합니다.</Text> : */}
						<Button 
							onPress={() => { 
								this.setState({ modalVisible: true }) 
							}}
							iconLeft primary>
							<Icon name="login" type="AntDesign" />
							<Text>Steemconnect Login</Text>
						</Button>
					{/* } */}
				</View>

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
});
