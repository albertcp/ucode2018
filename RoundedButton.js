import React from 'react';
 import {
   View,
   Text,
   TouchableHighlight,
 } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import SlidingUpPanel from 'rn-sliding-up-panel';

 const styles = {
   button: {
     width: 50,
     height: 50,
     borderRadius: 25,
     borderWidth: 0,
     alignItems: "center",
     justifyContent: "center",
     backgroundColor: "white"
   }
 }

 export default class RoundedButton extends React.Component {

   render() {
     return (
       <TouchableHighlight
         style={[styles.button, this.props.style]}
         onPress={this.props.onPress}
       >
         {this.props.children}
       </TouchableHighlight>
     );
   }
 }
