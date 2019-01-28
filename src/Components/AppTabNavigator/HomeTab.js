import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body, Spinner } from 'native-base';
import CardComponent from '../CardComponent';

import { fetchFeeds } from '../../reducers/steemReducer';
 
class HomeTab extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-home' style={{ color: tintColor }} />
        )
    }

    state = {
        feeds: [],
        followings: []
    }

    componentWillMount() {
        this.props.fetchFeeds('kr');

        // this.fetchFeeds().then(feeds => {
        //     this.setState({
        //         feeds
        //     })
        // });
        this.fetchFollowing().then(followings => {
            this.setState({
                followings
            })
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

    // fetchFeeds() {
    //     const data = {
    //         id: 1,
    //         jsonrpc: "2.0",
    //         method: "call",
    //         params: [
    //             "database_api",
    //             "get_discussions_by_created",
    //             [
    //                 {
    //                     tag: "kr",
    //                     limit: 10,
    //                     // start_author:"",
    //                     // start_permlink:""
    //                 }
    //             ]
    //         ]
    //     };
    //     return fetch('https://api.steemit.com',
    //     {
    //         method: 'POST',
    //         body: JSON.stringify(data)
    //     })
    //     .then(res => res.json())
    //     .then(res => res.result)
    // }

    render() {
        // console.log(this.props);
        return (
            <Container style={style.container}>
                <Header>
                    <Left><Icon name='ios-camera' style={{ paddingLeft:10 }}/></Left>
                    <Body><Text>Instagram</Text></Body>
                    <Right><Icon name='ios-send' style={{ paddingRight:10 }}/></Right>
                </Header>
                <Content>
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
                        !this.props.feeds || this.props.feeds.length === 0
                        ?
                        <Spinner color='blue'/>
                        :
                        this.props.feeds.map(feed => (
                            <CardComponent data={ feed } key={ feed.url }/>
                        ))
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
    // console.log('mapStateToProps', state);
    return {
        feeds: state.steem.feeds
    }
};

const mapDispatchToProps = { fetchFeeds };
// const mapDispatchToProps = (dispatch) => { 
//     return bindActionCreators({
//         fetchFeeds
//     });
// };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeTab);