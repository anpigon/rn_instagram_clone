import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Dataset from 'impagination';

import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body, Spinner } from 'native-base';
import CardComponent from '../CardComponent';

import { fetchFeeds } from '../../reducers/steemReducer';

const DEFAULT_LIMIT = 5;

class HomeTab extends Component {

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name='ios-home' style={{ color: tintColor }} />
    )
  }

  constructor(props) {
    super(props);

    this.state = {
      dataset: null,
      feeds: null,
      next: {
        startAuthor: null,
        startPermlink: null,
      },
      followings: []
    };
  }

  // 피드 가져오기
  fetchFeeds = ({ tag, limit, startAuthor, startPermlink }) => {
    const data = {
      id: 1,
      jsonrpc: "2.0",
      method: "call",
      params: [
        "database_api",
        "get_discussions_by_created",
        [
          {
            tag,
            limit,
            start_author: startAuthor,
            start_permlink: startPermlink
          }
        ]
      ]
    };
    return fetch('https://api.steemit.com', { method: 'POST', body: JSON.stringify(data) })
      .then(res => res.json())
      .then(res => res.result)
      .catch(error => {
        console.error(error);
      });
  }

  setupImpagination = () => {
    // 다음 피드 조회
    _fetchFeeds = () => {
      const { startAuthor, startPermlink } = this.state.next;
      return this.fetchFeeds({
        tag: 'kr',
        limit: DEFAULT_LIMIT + 1,
        startAuthor,
        startPermlink
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
      });
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

    this.fetchFollowing().then(followings => {
      this.setState({
        followings
      });
    });
  }

  fetchFollowing() {
    const data = {
      id: 2,
      jsonrpc: "2.0",
      method: "call",
      params: [
        "follow_api",
        "get_following",
        ["anpigon", "", "blog", 10]
      ]
    };
    return fetch('https://api.steemit.com',
    {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => res.result.map(({following}) => following))
  }

  render() {
    // console.log(this.props);
    // console.log('datasetState', this.state.datasetState[0]);
    return (
      <Container style={style.container}>
        <Header>
          <Left><Icon name='ios-camera' style={{ paddingLeft:10 }}/></Left>
          <Body><Text>Instagram</Text></Body>
          <Right><Icon name='ios-send' style={{ paddingRight:10 }}/></Right>
        </Header>
        <Content scrollEventThrottle={300} onScroll={this.setCurrentReadOffset}>
          {/* 여기부터 스토리 헤더 시작 */}
          <View style={{ height: 100 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 7 }}>
              <Text style={{ fontWeight: 'bold' }}>Stories</Text>

              <View style={{ flexDirection: 'row', 'alignItems': 'center' }}>
                <Icon name="md-play" style={{ fontSize: 14 }}></Icon>
                <Text style={{ fontWeight: 'bold' }}> Watch All</Text>
              </View>
            </View>
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
                  this.state.followings.map(following => (
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
            this.state.feeds.map(record => {
              if (!record.isSettled) {
                return <Spinner color='blue' key={ Math.random() }/>;
              }
              const { content } = record;
              return <CardComponent data={ content } key={ content.url }/>
            })
          }
        </Content>
      </Container>
    );
  }
}
 
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

const mapStateToProps = (state) => {
  return {
    feeds: state.steem.feeds
  }
};

const mapDispatchToProps = { fetchFeeds };
// const mapDispatchToProps = (dispatch) => { 
//     return bindActionCreators({
//         fetchFeeds
//     }, dispatch);
// };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeTab);