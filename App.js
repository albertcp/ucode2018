/**
 *
 */

 import React from 'react';
 import {
   View,
   Button,
   Text,
   TouchableOpacity,
   Image
 } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import SlidingUpPanel from 'rn-sliding-up-panel';
import RoundedButton from './RoundedButton.js';
import {NativeModules} from 'react-native';
import { DeviceEventEmitter } from 'react-native';
const {Firebase,Beacon} = NativeModules;

 const styles = {
   container: {
     flex: 1,
     alignItems: 'flex-start',
     justifyContent: 'space-between',
     flexDirection: 'row',
     padding: 30
   },
   buttonStyle: {
     borderRadius: 100,
     borderWith:1
   }
 }

 export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {beacon: false};
  }

  componentDidMount(){
    Beacon.registerBeacon('tienda','bienvenida',1, 'Bienvenido a Adidas', 'Disfruta de tus compras');
    DeviceEventEmitter.addListener('BEACON_ENTERED', res => this.setState({beacon: true}));
    DeviceEventEmitter.addListener('BEACON_EXIT', res => this.setState({beacon: false}));

  }
  
   render() {
     return (
       <View style={styles.container}>
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
       </View>
     );
   }
 }
