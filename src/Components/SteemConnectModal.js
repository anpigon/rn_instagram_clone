import React, { Component } from 'react';
import {  WebView } from 'react-native';
import { Icon, Container, Button, Header, Right } from 'native-base'; 
// import Config from 'react-native-config';

import steemConnect from '../steemConnect';

class SteemConnectModal extends Component {

  constructor(props) {
    super(props);

    // console.log(Config);
  }

  // webview 상태 변경 체크
  _onNavigationStateChange = (event) => {
    if (event.url.indexOf('?access_token') > -1) {
      this.webview.stopLoading();
      try {
        const tokens = {};

        // 콜백 URL에서 accessToken 정보 추출하기
        let params = event.url.split('?')[1];
        params = params.split('&');
        params.forEach(e => {
          const [key, val] = e.split('=');
          tokens[key] = val;
        });

        // console.log('tokens:', tokens);
        this.props.onSteemconnectSuccess(tokens);
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    // 로그인 URL 생성
    const link = steemConnect.getLoginURL();
    // console.log(link);
    
    return (
      <Container style={{ flex: 1 }}>
        <Header>
          <Right>
            <Button icon transparent
              onPress={() => {
                this.props.handleOnModalClose()
              }}><Icon name='ios-close'/></Button>
          </Right>
        </Header>
        <WebView
          source={{ uri: link }}
          onNavigationStateChange={this._onNavigationStateChange}
          ref={ref => { this.webview = ref }}
        />
      </Container>
    );
  }
}

export default SteemConnectModal;
