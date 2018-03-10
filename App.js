 import React from 'react';
 import {
   View,
   Button,
   Text,
   TouchableOpacity,
   Image,
   ScrollView,
 } from 'react-native';

import HomeMain from './HomeMain';
import HomeMenu from './HomeMenu';
import ExercisesMain from './ExercisesMain';
import ExercisesMenu from './ExercisesMenu';

import QRCode from 'react-native-qrcode-svg';
import Icon from "react-native-vector-icons/FontAwesome";
import SlidingUpPanel from 'rn-sliding-up-panel';
import RoundedButton from './RoundedButton.js';
import {NativeModules} from 'react-native';
import { DeviceEventEmitter } from 'react-native';
const {
    Firebase,
    Beacon,
    NFC,
} = NativeModules;
import MenuButton from'./MenuButton.js';


 const styles = {
   container: {
     flex: 1,
     alignItems: 'flex-start',
     justifyContent: 'space-between',
     flexDirection: 'column',
     backgroundColor: 'white'
   },
 }

 export default class App extends React.Component {

  constructor(props){
    super(props);
      this.state = {
	  beacon: false,
	  opened: false,
	  last_tag: null,
	  screen: 'home',
      };
  }

  componentDidMount(){
    Beacon.registerBeacon('tienda','bienvenida',1, 'Bienvenido a Adidas', 'Disfruta de tus compras');
    DeviceEventEmitter.addListener('BEACON_ENTERED', res => this.setState({beacon: true}));
    DeviceEventEmitter.addListener('BEACON_EXIT', res => this.setState({beacon: false}));
    DeviceEventEmitter.addListener('NFC_TAG_READ', () => NFC.getLastReadTag().then(last_tag => {
	this.setState({last_tag});
    }));
  }

   renderMain(screen){
       switch(screen){
       case 'home':
	   return (<HomeMain/>);
       case 'exercises':
	   return (<ExercisesMain/>);
       }
   }

   renderMenu(screen){
       switch(screen){
       case 'home':
	   return (<HomeMenu
		   changeScreen={screen => {debugger; this.setState({screen})}}
		   toggleOpened={() => this.setState({ opened: !this.state.opened })}
		   />);
       case 'exercises':
	   return (<ExercisesMenu
		   changeScreen={screen => {debugger; this.setState({screen})}}
		   toggleOpened={() => this.setState({ opened: !this.state.opened })}
		   />);
       }
   }

   render() {
     const { opened } = this.state;
     return (
       <View style={styles.container}>
         <Text>Last tag:{this.state.last_tag}</Text>
         <ScrollView style={{height: opened ? "15%" : "85%",width: "100%" }}>
	 {this.renderMain(this.state.screen)}
         </ScrollView>
         <View style={{width: "100%", height: opened ? "60%" : "18%"}}>
           {opened && this.renderMenu() || <TouchableOpacity onPress={() => this.setState({opened: true})}>
	     {this.renderMenu(this.state.screen)}
           </TouchableOpacity>}
         </View>
       </View>
     );
   }
 }
