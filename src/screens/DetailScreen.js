import React from 'react';
import { View, StyleSheet } from 'react-native';
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

export default (props) => {
	// console.log(props);

	const { content }= props.navigation.state.params;
	console.log(content);

	return (
		<Container style={styles.container}>    
			<Header
        style={{backgroundColor:'white'}}
        androidStatusBarColor="white">
        <Left>
					<Button transparent
						onPress={() => props.navigation.goBack()}>
						<Icon name="arrow-back" />
					</Button>
				</Left>
        <Body>
          <Title>Details</Title>
        </Body>
        <Right />
      </Header>
			<Content>
				<Title>{content.title}</Title>
				<Text>{content.body}</Text>
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
