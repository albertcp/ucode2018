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
import ShopMain from './ShopMain';
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
	  product_ids: [],
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
	 this.setState({read: e})
	 console.log(e);
	 //ToastAndroid.show(e.data, ToastAndroid.SHORT);
	 this.setState({
	     screen: 'shop',
	     product_ids: this.state.product_ids.concat(parseInt(e.data)),
	 })
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
	     const product_tag = Object.values(this.state.tags).find(tag => tag.tag_id === last_tag);
	     if(last_tag === '04D22482C75580'){
		 this.setState({in_shop: true});
	     } else if(product_tag){
		 this.setState({
		     in_shop: true,
		     screen: 'shop',
		     product_ids: this.state.product_ids.concat(product_tag.product_id),
		 })
	     }
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
	 const storage = firebase.storage();
	 this.setState({
	     database,
	     storage,
	 });
	 const userRef = firebase.database().ref('usuarios/' + USER_NAME);
	 userRef.on('value', res => this.setState({ user: res.val() }));
	 const exercisesRef = firebase.database().ref('ejercicios');
	 exercisesRef.on('value', res => this.setState({ exercises: res.val() }));
	 const tagsRef = firebase.database().ref('etiquetas');
	 tagsRef.on('value', res => this.setState({ tags: res.val() }));
	 const productsRef = firebase.database().ref('productos');
	 productsRef.on('value', res => this.setState({ products: res.val() }));
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
		   />
	       );
	   case 'facedetector':
	   return <FaceDetector storage={this.state.storage}/>;
       case 'shop':
	   return <ShopMain
	   removeItem={item_id => {
	       const index = this.state.product_ids.findIndex(id => id === item_id)
	       if(index > -1) this.setState({ product_ids: this.state.product_ids.slice(0, index).concat(this.state.product_ids.slice(index+1)) });
	   }}
	   product_ids={this.state.product_ids}
	   products={this.state.products}
	       />
       }
   }

     renderMenu(screen){
       switch(screen){
       case 'home':
       case 'shop':
       case 'facedetector':
       case 'scanner':
	   return (<HomeMenu
		   changeScreen={screen => this.setState({screen})}
                   toggleOpened={() => this.setState({ opened: !this.state.opened })}
		   />);
       case 'exercises':
	   return (<ExercisesMenu
		   user={this.state.user}
		   exercises={this.state.exercises}
		   changeScreen={screen => this.setState({screen})}
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
