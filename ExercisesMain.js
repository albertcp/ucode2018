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
   container: {
     flex: 1,
     alignItems: 'flex-start',
     justifyContent: 'space-between',
     flexDirection: 'column',
     backgroundColor: 'white'
   },
   textStyle: {
     paddingLeft: 35,
     paddingTop: 5,
     fontSize: 15,
     color: 'black',
     paddingRight: 20
   },
   titleStyle: {
     paddingLeft: 25,
     fontSize: 20,
     fontWeight: 'bold',
     color: 'black',
     paddingTop: 10
   },
   playTex: {
     paddingLeft: 300,
     fontSize: 15,
     color: '#900',
     paddingTop: 10
   },
   lineStyle: {
     paddingLeft: 10,
     paddingRight: 10,
     color: '#eeeeee'
   },
   spaceText: {
     paddingTop: 30
   },
   timeStyle: {
     paddingLeft: 25,
     fontSize: 75,
     fontWeight: 'bold',
     color: 'black',
     paddingTop: 10
   }
 }

const zeroPad = (number, digits) => Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;

export default class HomeMain extends React.Component {
    constructor(props){
	super(props);
    }

    componentDidMount(){
	//this.props.startTimer();
    }
     
    componentDidUnmount(){
	this.props.stopTimer();
    }


    
    render() {
	const { exercises, user, time } = this.props;
	const seconds = zeroPad(time % 60, 2);
	const minutes = zeroPad(Math.floor(time / 60) % 60, 2);
	const hours = Math.floor(time / 3600);
	const ex = user && user.ejercicios && exercises && Object.values(user.ejercicios).map(key => Object.entries(exercises).find(([k,v]) => v.id === key));
	return (
	    <View style={{height: "100%",width: "100%" }}>
            <View style={{ paddingTop: 30,width: "100%", justifyContent: "center", alignItems: "center"}}>
	    <Text style={styles.timeStyle}>{hours}:{minutes}:{seconds}</Text>
	    </View>
            {ex && ex.map(([k,ex], i) => (
		<View key={i}>
		<Text style={styles.lineStyle}>______________________________________________________________</Text>
		<Text style={styles.titleStyle}>{ex.nombre}</Text>
		<Text style={styles.textStyle}>Duración: {ex.duracion} segundos.</Text>
		<Text style={styles.textStyle}>{ex.descripcion}</Text>
		<Text style={styles.playTex}>► Play video</Text>
		</View>)
	    )
	    }
            </View>
     );
   }
 }
