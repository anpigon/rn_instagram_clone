import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Container, 
  Content, 
  Icon, 
  Thumbnail, 
  Header, 
  Title, 
  Left, 
  Right, 
  Body, 
  Spinner 
} from 'native-base';

import CardComponent from '../../components/CardComponent';
import { TINT_COLOR } from '../../constants/Colors'

function HomeTabPresenter(props) {
  // console.log(props);

  const {
    loading,
    followings,
    feeds
  } = props;

  return (
    <Container style={styles.container}>        
      <Header 
        style={{backgroundColor:'white'}}
        androidStatusBarColor="white">
        <Left><Icon name='ios-camera' style={{ paddingLeft:10 }}/></Left>
        <Body>
          <Title style={styles.title}>Insteemgram</Title>
        </Body>
        <Right><Icon name='ios-send' style={{ paddingRight:10 }}/></Right>
      </Header>
      <Content 
        scrollEventThrottle={300} 
        onScroll={this.setCurrentReadOffset}
        removeClippedSubviews={true}>
        {/* 여기부터 스토리 헤더 시작 */}
        <View style={{ height: 100 }}>
          {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 7 }}>
            <Text style={{ fontWeight: 'bold' }}>Stories</Text>
            <View style={{ flexDirection: 'row', 'alignItems': 'center' }}>
              <Icon name="md-play" style={{ fontSize: 14 }}></Icon>
              <Text style={{ fontWeight: 'bold' }}> Watch All</Text>
            </View>
          </View> */}
          <View style={{ flex: 3 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: 'center',
                paddingStart: 5,
                paddingEnd: 5
              }}>
              {
                (followings||[]).map(following => (
                  <Thumbnail 
                    key={ following }
                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                    source={{uri: `https://steemitimages.com/u/${following}/avatar` }} />
                ))
              }
            </ScrollView>
          </View>
        </View>
        {/* 여기까지 스토리 헤더 끝 */}
        {
          (feeds||[]).map(record => {
            if (!record.isSettled) {
              return <Spinner color={ TINT_COLOR } key={ Math.random() }/>;
            }
            const { content } = record;
            return <CardComponent data={ content } key={ content.post_id }/>
          })
        }
      </Content>
    </Container>
  );
}

HomeTabPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  followings: PropTypes.array,
  feeds: PropTypes.object,
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontFamily: 'Sweet_Sensations_Persona_Use', 
    fontSize: 30,
    color: '#242424',
  }
});

export default HomeTabPresenter;