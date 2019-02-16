import React from 'react';
import { ScrollView, StyleSheet, View, AsyncStorage, FlatList, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  state = {
    googleResponse: null
  }
  static navigationOptions = {
    title: 'Links',
  };

  async componentDidMount() {
    this._retrieveData()
  }

  render() {
    //let {googleResponse} = this.state
    return (
      <View>
        <ScrollView>
          <View>
          {this.state.googleResponse && (
              <FlatList
                data={this.state.googleResponse.responses[0].labelAnnotations}  
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => <Text>Item: {item.description}</Text>}
              />
            )}
          </View>
        </ScrollView>
      </View>
    ); 
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('googleResponse');
      let parsed = JSON.parse(value) 
      let parsedArray = []
      if (parsed !== null) {
        // We have data!!
        parsedArray.push(parsed)
        // console.log(parsedArray)
        console.log(parsedArray[0])
        // for (let i = 0; i < parsedArray[0])
        this.setState({
          googleResponse: parsed
        })
      } else {
        parsed = []
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
