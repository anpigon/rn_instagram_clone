import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFeeds, getFollowing } from '../../steem';
import Dataset from 'impagination';

import HomeTabPresenter from './HomeTabPresenter';

const DEFAULT_LIMIT = 5;

class HomeTabContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
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
      loading,
      followings,
      feeds
    } = this.state;
    // console.log({ loading, followings, feeds });

    return <HomeTabPresenter 
      loading={loading}
      followings={followings}
      feeds={feeds}
      onScroll={this.setCurrentReadOffset}
      navigation={this.props.navigation}
    />;
  }
}

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
)(HomeTabContainer);