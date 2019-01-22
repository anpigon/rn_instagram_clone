import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon, Container, Content, Header, Left, Body, Right, Button } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo'

export default class ProfileTab extends Component{

	static navigationOptions = {
		tabBarIcon: ({ tintColor }) => (
			<Icon name='person' style={{ color: tintColor }} />
		)
    }

    state = {
        name: '',
        reputation: 0,
        profile: {},
        postCount: 0,
        followingCount: 0,
        followerCount: 0,
    }

    fetchAccount(username) {
        const data = {
            id: 3,
            jsonrpc: "2.0",
            method: "call",
            params: [
              "database_api",
              "get_accounts",
              [[username]]
            ]
        };
        return fetch('https://api.steemit.com',
        {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => res.result[0])
    }

    fetchFollowCount(username) {
        const data = {
            id: 4,
            jsonrpc: "2.0",
            method: "call",
            params: [
              "follow_api",
              "get_follow_count",
              [username]
            ]
        };
        return fetch('https://api.steemit.com',
        {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => res.result)
    }

    componentWillMount() {
        const username = 'anpigon';

        this.fetchAccount(username).then(({name, post_count, reputation, json_metadata}) => {
            const { profile } = JSON.parse(json_metadata);
            const log = Math.log(parseInt(reputation.substring(0, 4))) / Math.log(10);
            this.setState({
                name,
                reputation: Math.max(((reputation.length - 1) + (log - parseInt(log))) - 9, 0) * 9 + 25,
                postCount: post_count,
                profile
            })
        });

        this.fetchFollowCount(username).then(({following_count, follower_count}) => {
            this.setState({
                followingCount: following_count,
                followerCount: follower_count
            })
        });
    }

    render() {
        const { 
            name,
            reputation,
            profile,
            postCount,
            followingCount,
            followerCount 
        } = this.state;

        return (
            <Container style={{ flex:1, backgroundColor: 'white'}}>
                <Header>
                    <Left><Icon name="md-person-add" style={{ paddingLeft:10 }} /></Left>
                    <Body><Text>{name}</Text></Body>
                    <Right><EntypoIcon name="back-in-time" style={{ paddingRight:10, fontSize: 32 }} /></Right>
                </Header>
                <Content>
                    <View style={{flexDirection:'row', paddingTop:10}}>
                        <View style={{flex:1, alignItems:'center'}}>
                            <Image source={{ url: profile.profile_image }}
                              style={{width:75, height:75, borderRadius:37.5}}/>
                        </View>
                        <View style={{flex:3}}>
                            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                                <View style={{alignItems:'center'}}>
                                    <Text>{postCount}</Text>
                                    <Text style={{fontSize:10, color:'gray'}}>posts</Text>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <Text>{followingCount}</Text>
                                    <Text style={{fontSize:10, color:'gray'}}>follower</Text>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <Text>{followerCount}</Text>
                                    <Text style={{fontSize:10, color:'gray'}}>following</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Button bordered dark
                                    style={{flex:4, marginLeft:10, justifyContent:'center', height:30, marginTop:10}}>
                                    <Text>Edit Profile</Text>
                                </Button>
                                <Button bordered dark small icon
                                 style={{flex:1, marginRight:10, marginLeft:5, justifyContent:'center', height:30, marginTop:10}}>
                                    <Icon name="settings" />
                                </Button>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingHorizontal:10, paddingVertical:10}}>
                        <Text style={{fontWeight:'bold'}}>{profile.name} ({reputation.toFixed(2)})</Text>
                        <Text>{profile.about}</Text>
                        <Text>{profile.website}</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});