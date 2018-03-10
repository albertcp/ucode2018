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
     width: 25,
     height: 25,
     borderWidth: 0,
     alignItems: "center",
     justifyContent: "center",
     backgroundColor: "black",
     marginTop: 10
   }
 }

 export default class MenuButton extends React.Component {

   render() {
     return (
       <TouchableHighlight
         style={styles.button}
         onPress={this.props.onPress}
       >
         {this.props.children}
       </TouchableHighlight>
     );
   }
 }
