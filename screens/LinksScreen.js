import React from 'react';
import { ScrollView, StyleSheet, View, AsyncStorage, FlatList, Text, ImageBackground } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  state = {
    googleResponse: null
  }
  static navigationOptions = {
    title: 'Fridge',
  };

  async componentDidMount() {
    this._retrieveData()
  }

  render() {
    //let {googleResponse} = this.state
    return (
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={{
            backgroundColor: '#DAF3F7',
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View>
            <ScrollView>
              <View>
                {this.state.googleResponse && (
                  <FlatList
                    data={this.state.googleResponse.responses[0].labelAnnotations}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) => <Text style={styles.itemContiner}>{item.description} {"\n"}Experation date: 7 days</Text>}
                  />
                )}
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
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
    let { googleResponse } = this.state
    if (!googleResponse) {
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
            renderItem={({ item }) => <Text style={styles.itemContiner}>{item.description}Experation date: 7 days</Text>}
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
  itemContiner: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 80,
    paddingTop: 100,
  },
});