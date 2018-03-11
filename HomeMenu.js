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
              <Icon name="trophy" size={30} color="#900" />
            </RoundedButton>
            <Text style={{marginTop: 10, color:'white'}}>Perfil</Text>
          </View>
          <View style={{alignItems:  "center"}}>
             <RoundedButton style={styles.buttonStyle} onPress={() => this.props.changeScreen('exercises')}>
              <Icon name="fire" size={30} color="#900" />
            </RoundedButton>
            <Text style={{marginTop: 10, color:'white'}}>Ejercicios</Text>
          </View>
          <View style={{alignItems:  "center"}}>
             <RoundedButton style={styles.buttonStyle} onPress={() => this.props.changeScreen('scanner')}>
              <Icon name="camera" size={30} color="#900" />
            </RoundedButton>
            <Text style={{marginTop: 10, color:'white'}}>Scan Code</Text>
          </View>
          <View style={{alignItems:  "center"}}>
            <RoundedButton style={styles.buttonStyle} onPress={() => this.props.changeScreen('shop')}>
              <Icon name="shopping-bag" size={30} color="#900" />
            </RoundedButton>
            <Text style={{marginTop: 10, color:'white'}}>Tienda</Text>
          </View>
         </View>
         <View style={styles.icon_row}>
           <View style={{alignItems:  "center"}}>
             <RoundedButton style={styles.buttonStyle}>
               <Icon name="star" size={30} color="#900" />
             </RoundedButton>
             <Text style={{marginTop: 10, color:'white'}}>Evaluar</Text>
           </View>
           <View style={{alignItems:  "center"}}>
             <RoundedButton style={styles.buttonStyle} onPress={() => this.props.changeScreen('facedetector')}>
               <Icon name="id-card" size={30} color="#900" />
             </RoundedButton>
             <Text style={{marginTop: 10, color:'white'}}>ID</Text>
           </View>
           <View style={{alignItems:  "center"}}>
             <RoundedButton style={styles.buttonStyle}>
               <Icon name="share-alt" size={30} color="#900" />
             </RoundedButton>
             <Text style={{marginTop: 10, color:'white'}}>Compartir</Text>
           </View>
           <View style={{alignItems:  "center"}}>
             <RoundedButton style={styles.buttonStyle}>
               <Icon name="cog" size={30} color="#900" />
             </RoundedButton>
             <Text style={{marginTop: 10, color:'white'}}>Ajustes</Text>
           </View>
         </View>
         <View style={styles.icon_row}>
            <Text style={{marginTop: 20, marginLeft: 20,color:'#900', fontSize: 20, fontWeight: 'bold',}}>
            Salir</Text>
            <Text style={{marginTop: 20, marginRight: 20,color:'#900', fontSize: 20, fontWeight: 'bold',}}>
            Ayuda</Text>
         </View>
        </View>
        </View>
     );
   }
 }
