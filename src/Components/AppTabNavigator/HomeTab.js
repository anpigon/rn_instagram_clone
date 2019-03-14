import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { getFeeds, getFollowing } from '../../steem';
// import removeMarkdown from 'remove-markdown';

import Dataset from 'impagination';
// import Remarkable from 'remarkable';

import { Container, Content, Icon, Thumbnail, Header, Title, Left, Right, Body, Spinner } from 'native-base';
import CardComponent from '../CardComponent';
import { TINT_COLOR } from '../../constants/Colors'

const DEFAULT_LIMIT = 5;
// const md = new Remarkable({ html: true, linkify: false, breaks: false });

class HomeTab extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataset: null,
      next: {
        startAuthor: '',
        startPermlink: '',
      },
      feeds: [],
      followings: []
    };
  }

  // 피드 가져오기
  setupImpagination = () => {
    // 다음 피드 조회
    _fetchFeeds = () => {
      const { startAuthor, startPermlink } = this.state.next;
      return getFeeds({
        tag: this.props.username,
        limit: DEFAULT_LIMIT + 1,
        start_author: startAuthor,
        start_permlink: startPermlink
      }).then(feeds => {
        let next = {
          startAuthor: '',
          startPermlink: '',
        }
        if(feeds.length > DEFAULT_LIMIT) {
          const { author, permlink } = feeds.pop();
          next = {
            startAuthor: author,
            startPermlink: permlink
          }
        }
        this.setState({ next });
        return feeds;
      })
      .catch(error => console.log(error));
    }

    let dataset = new Dataset({
      pageSize: DEFAULT_LIMIT, // 한번에 가져올 레코드 갯수
      observe: (nextState) => {
        // 새로운 `state`가 생성될때 마다 호출된다.
        this.setState({ feeds: nextState });
      },
      fetch(pageOffset, pageSize, stats) {
        return _fetchFeeds();
      }
    });

    dataset.setReadOffset(0);
    this.setState({ dataset });
  }

  setCurrentReadOffset = (event) => {
    let itemHeight = 402;
    let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
    let currentItemIndex = Math.ceil(currentOffset / itemHeight);
    this.state.dataset.setReadOffset(currentItemIndex);
  }

  componentWillMount() {
    this.setupImpagination();

    // getFollowing('anpigon', '', 10).then(followings => {
    getFollowing(this.props.username, '', 20).then(followings => {
      this.setState({
        followings
      });
    });
  }

  render() {
    const {
      followings,
      feeds
    } = this.state;

    return (
      <>
        <Container style={styles.container}>        
          <Header 
            style={{backgroundColor:'white'}}
            androidStatusBarColor="white">
            <Left><Icon name='ios-camera' style={{ paddingLeft:10 }}/></Left>
            <Body>
              <Title style={styles.title}>Instagram</Title>
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
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      </>
    );
  }
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

const mapStateToProps = (state) => {
  const { username } = state.steem;
  return {
    username,
  }
};

// const mapDispatchToProps = { fetchFeeds };

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(HomeTab);