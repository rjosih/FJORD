import React from 'react';
import { ScrollView, StyleSheet, View, AsyncStorage } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  async componentDidMount() {
    this._retrieveData()
  }

  render() {
    return (
      <View>
      </View>
    ); 
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('googleResponse');
      if (value !== null) {
        // We have data!!
        console.log(value);
      } else {
        console.log('Nothing found')
      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
  }
  renderGoogleResponse = () => {
    let {googleResponse} = this.state
    if(!googleResponse) {
      console.log('hello')
      return;
    }
    return (
      <View>
      {googleResponse && (
        <FlatList
          data={googleResponse.responses[0].labelAnnotations}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => <Text>Item: {item.description}</Text>}
        />
      )}
      </View> 
    )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
