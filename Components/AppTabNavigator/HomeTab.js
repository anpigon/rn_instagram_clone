import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Container, Content, Icon } from 'native-base';
import CardComponent from '../CardComponent';
 
export default class HomeTab extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-home' style={{ color: tintColor }} />
        )
    }

    state = {
        feeds: []
    }

    componentWillMount() {
        this.fetchFeeds().then(feeds => {
            this.setState({
                feeds
            })
        });
    }

    fetchFeeds() {
        const data = {
            id: 1,
            jsonrpc: "2.0",
            method: "call",
            params: [
                "database_api",
                "get_discussions_by_created",
                [
                    {
                        tag: "kr",
                        limit: 10,
                        // start_author:"",
                        // start_permlink:""
                    }
                ]
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

    render() {
        return (
            <Container style={style.container}>
                <Content>
                    {
                        this.state.feeds.map(feed => <CardComponent data={ feed } key={ feed.url }/>)
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