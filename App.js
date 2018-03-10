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
<<<<<<< HEAD
import {NativeModules} from 'react-native';
import { DeviceEventEmitter } from 'react-native';
const {Firebase,Beacon} = NativeModules;
=======
import MenuButton from'./MenuButton.js';

>>>>>>> a439f3e93d50eb06eb278c0acc86d8bf020f03fd

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
    this.state = {beacon: false,
		opened: false,
	 screen: 'home',};
  }

  componentDidMount(){
    Beacon.registerBeacon('tienda','bienvenida',1, 'Bienvenido a Adidas', 'Disfruta de tus compras');
    DeviceEventEmitter.addListener('BEACON_ENTERED', res => this.setState({beacon: true}));
    DeviceEventEmitter.addListener('BEACON_EXIT', res => this.setState({beacon: false}));

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

>>>>>>> a439f3e93d50eb06eb278c0acc86d8bf020f03fd
   render() {
     const { opened } = this.state;
     return (
       <View style={styles.container}>
<<<<<<< HEAD
         <TouchableOpacity onPress={() => this.setState({visible: true})}>
           {this.state.beacon && <Text>Hay beacon</Text>}
           <Image source={require('./images/QR-code.png')}/>
         </TouchableOpacity>
         <SlidingUpPanel
           draggableRange={{top: 675,bottom: 120}}
           ref={c => this._panel = c}
           visible={true}
           onRequestClose={() => this.setState({visible: false})}>
           <View style={{width: "100%", height: "100%", backgroundColor: "black"}}>
            <View style={styles.container}>
                <RoundedButton style={styles.buttonStyle}>
                  <Icon name="rocket" size={30} color="#900" />
                </RoundedButton>
                <RoundedButton style={styles.buttonStyle}>
                  <Icon name="rocket" size={30} color="#900" />
                </RoundedButton>
                <RoundedButton style={styles.buttonStyle}>
                  <Icon name="rocket" size={30} color="#900" />
                </RoundedButton>
                <RoundedButton style={styles.buttonStyle}>
                  <Icon name="rocket" size={30} color="#900" />
                </RoundedButton>
             </View>
             <View style={styles.container}>
                 <Text style={{color:'white'}}>Hola</Text>
                 
             </View>
           </View>
         </SlidingUpPanel>
=======
         <ScrollView style={{height: opened ? "15%" : "85%",width: "100%" }}>
	     {this.renderMain(this.state.screen)}
         </ScrollView>
         <View style={{width: "100%", height: opened ? "60%" : "18%"}}>
           {opened && this.renderMenu() || <TouchableOpacity onPress={() => this.setState({opened: true})}>
	     {this.renderMenu(this.state.screen)}
           </TouchableOpacity>}
         </View>
>>>>>>> a439f3e93d50eb06eb278c0acc86d8bf020f03fd
       </View>
     );
   }
 }
