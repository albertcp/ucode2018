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

export default class HomeMain extends React.Component {
   render() {
       return (
	   <View style={{height: "100%",width: "100%" }}>
             <View style={{ paddingTop: 30,width: "100%", justifyContent: "center", alignItems: "center"}}>
	       <Text style={styles.timeStyle}>00:10:32</Text>
	   </View>
           <Text style={styles.lineStyle}>______________________________________________________________</Text>
           <Text style={styles.titleStyle}>Recompens</Text>
           <Text style={styles.textStyle}>Pasa por a taquilla nº 510 para recoger su recompensa. </Text>
           <Text style={styles.lineStyle}>______________________________________________________________</Text>
           <Text style={styles.titleStyle}>Tabla de Ejercicios</Text>
           <Text style={styles.textStyle}>Pasa por a taquilla nº 510 para recoger su recompensa. </Text>
           <Text style={styles.lineStyle}>______________________________________________________________</Text>
           <Text style={styles.titleStyle}>Recomendaciones</Text>
           <Text style={styles.textStyle}>Nuevos modelos disponibles para ti ¡No dudes en mirralos!</Text>
           <Text style={styles.lineStyle}>______________________________________________________________</Text>
           <Text style={styles.titleStyle}>Descuento</Text>
           <Text style={styles.textStyle}>Pasa por nuestra tienda y disfruta de un 20% de descuento en la compra de hoy.</Text>
           <Text style={styles.spaceText}></Text>
         </View>
     );
   }
 }
