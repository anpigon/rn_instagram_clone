import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
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
	Button,
	Spinner ,
	Text
} from 'native-base';
import styled from 'styled-components';
import MarkdownView from '../components/MarkdownView';

const PostTitle = styled.Text`
	color: black;
	font-size: 28px;
	font-family: 'Noto Serif KR Bold';
	font-weight: bold;
`;

export default (props) => {
	// console.log(props);

	const { content }= props.navigation.state.params;
	// console.log(content);

	return (
		<Container style={styles.container}>    
			<Header
				style={{backgroundColor:'white'}}
				iosBarStyle="light-content"
        androidStatusBarColor="white">
				<StatusBar 
          backgroundColor="white" 
          barStyle="dark-content"/>
        <Left>
					<Button transparent
						onPress={() => props.navigation.goBack()}>
						<Icon name="arrow-back" style={{ color: "black" }}/>
					</Button>
				</Left>
        <Body>
          <Title style={{ color: "black" }}>Details</Title>
        </Body>
        <Right />
      </Header>
			<Content padder>
				<PostTitle>{content.title}</PostTitle>
				<MarkdownView>{content.body}</MarkdownView>
			</Content>
		</Container>
	)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
	},
});
