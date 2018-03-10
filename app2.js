/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  AppRegistry
} from 'react-native';

import Icon from "react-native-vector-icons/FontAwesome";
import SlidingUpPanel from "rn-sliding-up-panel";

type Props = {};
export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      opened: false,
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Image source={require('./images/QR_code.png')}/>
        <SlidingUpPanel visibleS>
          <View>
            <Image source={require('./images/QR_code.png')}/>
          </View>
        </SlidingUpPanel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  up: {

}
});
