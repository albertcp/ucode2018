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
    	borderWidth:1
    },
    invertedButtonStyle: {
	backgroundColor: '#900',
    	borderRadius: 100,
    	borderWidth:1
    },
    button2Style: {
      backgroundColor: 'black',
      color:'#900',
      borderWidth:1
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
    const { exercises, user, time } = this.props;
      const ex = user && user.ejercicios && exercises && Object.values(user.ejercicios).map(key => Object.entries(exercises).find(([k,v]) => v.id === key)).map(([k,v]) => v);
      const with_pauses = ex.reduce((p,c) => p.concat([c, {
	  duracion: 5,
	  nombre: "Descanso",
	  icono: "plus-square",
      }]),[])
      const completed = with_pauses.reduce((prev, ex) => {
	  if(time > prev.ellapsed + ex.duracion){
	      return {dones: prev.dones.concat(true),  ellapsed: prev.ellapsed + ex.duracion};
	  } else {
	      return {dones: prev.dones.concat(false), ellapsed: prev.ellapsed + ex.duracion};
	  }
      }, {dones: [], ellapsed:0}).dones;
      if(completed.every(c => c))this.props.stopTimer();
     return (
       <View style={{width: "100%", height: "100%", backgroundColor: "black", alignItems: "flex-start"}}>
       <View style={{width: "100%", height: "100%"}}>
       <View style={{alignItems: "center", justifyContent: "flex-start"}}>
         <MenuButton style={styles.buttonStyle} onPress={() => this.props.toggleOpened()}>
            <Icon name="minus" size={25} color="#FFFFFF" />
          </MenuButton>
       </View>
        <View style={styles.first_icon_row}>
         {with_pauses.map((ex, i) => <View key={i} style={{alignItems:  "center"}}>
            <RoundedButton style={completed[i] && styles.invertedButtonStyle || styles.buttonStyle}>
              <Icon name={ex.icono} size={30} color={completed[i] && "white" || "#900"} />
            </RoundedButton>
            <Text style={{marginTop: 10, color:'white'}}>{completed[i] && "Finalizado" || ex.nombre}</Text>
          </View>)}
         </View>
         <View style={styles.icon_row}>
             { this.props.timer_id && <Button color= '#900' title="Pausa" onPress={() => {this.props.pauseTimer()}} />}
         { !this.props.timer_id && <Button color='#900' title="Reanudar" onPress={() => {this.props.startTimer()}} />}
             <Button color='#900' title="Salir" onPress={() => {this.props.stopTimer(); this.props.changeScreen('home')}} />
         </View>
        </View>
        </View>
     );
   }
 }
