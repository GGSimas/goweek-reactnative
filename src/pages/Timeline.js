import React, {Component} from 'react';
import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   FlatList
  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';

export default class Timeline extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Inicio",
    headerRight: (
      <TouchableOpacity onPress={() => {navigation.navigate('New')}}>
        <Icon
          name="add-circle-outline"
          style={{marginRight: 20}} 
          size={24}
          color="#4BB0EE"
        />
      </TouchableOpacity>
    )
  })
  state = {
    tweets: []
  }

  async componentDidMount() {
    this.subscribeToEvents();
    const response = await api.get('tweets');
    this.setState({
      tweets: response.data
    })
  }
 
  subscribeToEvents = () => {
    const io = socket('http://192.168.1.2:3000/'); 

    io.on('tweet', data => {
      this.setState({ tweets: [data, ...this.state.tweets] });
    });

    io.on('like', data => {
      this.setState({ tweets: this.state.tweets.map(tweet =>
          tweet._id === data._id? data : tweet
      )})
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.tweets}
          keyExtractor={tweet => tweet._id}
          renderItem={({ item }) => <Tweet tweets={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
