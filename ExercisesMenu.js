 import React from 'react';
 import {
   View,
   Button,
   Text,
   TouchableOpacity,
   Image,
   ScrollView,
 } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Icon from "react-native-vector-icons/FontAwesome";
import SlidingUpPanel from 'rn-sliding-up-panel';
import RoundedButton from './RoundedButton.js';
import MenuButton from'./MenuButton.js';


const styles = {
    buttonStyle: {
    	borderRadius: 100,
    	borderWith:1
    },
    button2Style: {
      backgroundColor: 'black',
      color:'#900',
      borderWith:1
    },
    first_icon_row: {
    	alignItems: 'flex-start',
    	justifyContent: 'space-between',
    	flexDirection: 'row',
    	paddingLeft: 15,
    	paddingRight: 15,
    	paddingTop: 10
    },
    icon_row: {
    	alignItems: 'flex-start',
    	justifyContent: 'space-between',
    	flexDirection: 'row',
    	paddingLeft: 15,
    	paddingRight: 15,
    	paddingTop: 30
    }
};

export default class App extends React.Component {

  render(){
     return (
       <View style={{width: "100%", height: "100%", backgroundColor: "black", alignItems: "flex-start"}}>
       <View style={{width: "100%", height: "100%"}}>
       <View style={{alignItems: "center", justifyContent: "flex-start"}}>
          <MenuButton style={styles.buttonStyle} onPress={() => this.props.toggleOpened()}>
            <Icon name="minus" size={25} color="#FFFFFF" />
          </MenuButton>
       </View>
        <View style={styles.first_icon_row}>
          <View style={{alignItems:  "center"}}>
            <RoundedButton style={styles.buttonStyle}>
              <Icon name="heartbeat" size={30} color="#900" />
            </RoundedButton>
            <Text style={{marginTop: 10, color:'white'}}>Cardio</Text>
          </View>
          <View style={{alignItems:  "center"}}>
             <RoundedButton style={styles.buttonStyle} onPress={() => this.props.changeScreen('exercises')}>
              <Icon name="plus-square" size={30} color="#900" />
            </RoundedButton>
            <Text style={{marginTop: 10, color:'white'}}>2 min</Text>
          </View>
          <View style={{alignItems:  "center"}}>
            <RoundedButton tyle={styles.buttonStyle}>
              <Icon name="bicycle" size={30} color="#900" />
            </RoundedButton>
            <Text style={{marginTop: 10, color:'white'}}>Bici</Text>
          </View>
          <View style={{alignItems:  "center"}}>
            <RoundedButton style={styles.buttonStyle}>
              <Icon name="plus-square" size={30} color="#900" />
            </RoundedButton>
            <Text style={{marginTop: 10, color:'white'}}>2 min</Text>
          </View>
         </View>

         <View style={styles.icon_row}>
             <Button style={styles.button2Style} title="Pausa" onPress={() => {this.props.changeScreen("home"); this.props.toggleOpened()}} />
             <Button style={styles.button2Style} title="Stop" />
         </View>
        </View>
        </View>
     );
   }
 }
