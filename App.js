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
import FaceDetector  from './FaceDetector';
import * as firebase from 'firebase';

import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';
import Icon from "react-native-vector-icons/FontAwesome";
import SlidingUpPanel from 'rn-sliding-up-panel';
import RoundedButton from './RoundedButton.js';
import {NativeModules, ToastAndroid} from 'react-native';
import { DeviceEventEmitter } from 'react-native';
const {
    Firebase,
    Beacon,
    NFC,
} = NativeModules;

const USER_NAME = 'usuario1';

import MenuButton from './MenuButton.js';


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
	  in_shop: false,
	  screen: 'home',
	  time: 0,
	  timer_id: null,
      };
      this.renderMain = this.renderMain.bind(this);
      this.renderMenu = this.renderMenu.bind(this); 
      this.startTimer = this.startTimer.bind(this); 
      this.stopTimer = this.stopTimer.bind(this); 
      this.pauseTimer = this.pauseTimer.bind(this); 
      this.onSuccess = this.onSuccess.bind(this);
      console.disableYellowBox = true; 
  }

     onSuccess(e) {
	 debugger;
	 this.setState({read: e})
	 console.log(e);
	 ToastAndroid.show(e.data, ToastAndroid.SHORT);
	 this.setState({screen: 'home'})
     }
     
     startTimer(){
	 if(!this.state.timer_id){
	     this.setState({timer_id: setInterval(() => this.setState({time: this.state.time + 1}), 1000)});
	 }
     }

     pauseTimer(){
	 if(this.state.timer_id){
	     clearInterval(this.state.timer_id);
	     this.setState({timer_id: null});
	 }
     }

     stopTimer(){
	 if(this.state.timer_id){
	     clearInterval(this.state.timer_id);
	     this.setState({timer_id: null, time: 0});
	 }
     }
     
     componentDidMount(){
	 Beacon.registerBeacon('tienda','bienvenida',1, 'Bienvenido a Adidas', 'Disfruta de tus compras');
	 DeviceEventEmitter.addListener('BEACON_ENTERED', res => {
	     if("8ca81e54e30ad964de19faeae4f23e21" === res.id){
		 this.setState({in_shop: true});
	     }
	     
	 });
	 DeviceEventEmitter.addListener('BEACON_EXIT', res => this.setState({beacon: false}));
	 DeviceEventEmitter.addListener('NFC_TAG_READ', () => NFC.getLastReadTag().then(last_tag => {
	     this.setState({last_tag});
	 }));
	 const config = {
	     apiKey: "AIzaSyASYljbbW_OZWr9evgjJkdY4-BBqHkWZm8",
	     authDomain: "adidas-b2c4e.firebaseapp.com",
	     databaseURL: "https://adidas-b2c4e.firebaseio.com",
	     projectId: "adidas-b2c4e",
	     storageBucket: "adidas-b2c4e.appspot.com",
	     messagingSenderId: "707908398505"
	 };
	 firebase.initializeApp(config);
	 const database = firebase.database();
	 this.setState({
	     database: database,
	 });
	 const userRef = firebase.database().ref('usuarios/' + USER_NAME);
	 userRef.on('value', res => this.setState({ user: res.val() }));
	 const exercisesRef = firebase.database().ref('ejercicios');
	 exercisesRef.on('value', res => this.setState({ exercises: res.val() }));
     }

   renderMain(screen){
       switch(screen){
       case 'home':
	   return (<HomeMain
		   user={this.state.user}
		   in_shop={this.state.in_shop}
                   />);
       case 'exercises':
	       return (<ExercisesMain
		   user={this.state.user}
	           startTimer={this.startTimer}
	           stopTimer={this.stopTimer}
		   exercises={this.state.exercises}
		   time={this.state.time} 
		   setTime={time => this.setState({time})}
		   in_shop={this.state.in_shop}
		   />);
	   case 'scanner':
	       return (
		   <QRCodeScanner
		     onRead={this.onSuccess.bind(this)}
		     topContent={(
		       <Text style={styles.centerText}>
			 Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text>
			 on your computer and scan the QR code.
                       </Text>
		     )}
		     bottomContent={(
		       <TouchableOpacity style={styles.buttonTouchable}>
		       <Text style={styles.buttonText}>OK. Got it!</Text>
		       </TouchableOpacity>
		     )}
		   />
	       );
	   case 'facedetector':
	       return <FaceDetector/>;
       }
   }

     renderMenu(screen){
       switch(screen){
       case 'home':
       case 'facedetector':
       case 'scanner':
	   return (<HomeMenu
		   changeScreen={screen => {debugger; this.setState({screen})}}
                   toggleOpened={() => this.setState({ opened: !this.state.opened })}
		   />);
       case 'exercises':
	   return (<ExercisesMenu
		   user={this.state.user}
		   exercises={this.state.exercises}
		   changeScreen={screen => {debugger; this.setState({screen})}}
	       stopTimer={this.stopTimer}
	       pauseTimer={this.pauseTimer}
	       timer_id={this.state.timer_id}
	       startTimer={this.startTimer}
	           time={this.state.time} 
		   toggleOpened={() => this.setState({ opened: !this.state.opened })}
		   />);
       }
   }

   render() {
       const { opened, user } = this.state;
     return (
       <View style={styles.container}>
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
