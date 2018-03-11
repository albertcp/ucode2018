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
	alignItems: 'center',
	justifyContent: 'flex-start',
	flexDirection: 'row',
	paddingLeft: 15,
	paddingRight: 15,
	paddingTop: 10
    },};

export default class App extends React.Component {

    render(){
	const { products, product_ids } = this.props;

	const cart = product_ids
	      .map(product_id => Object.values(products).find(p => p.id === product_id))
	const price = cart.reduce((p,c) => p + c.precio, 0);
     return (
       <View style={{width: "100%", height: "100%", backgroundColor: "black", alignItems: "flex-start"}}>
       <View style={{width: "100%", height: "100%"}}>
       <View style={{alignItems: "center", justifyContent: "flex-start"}}>
          <MenuButton style={styles.buttonStyle} onPress={() => this.props.toggleOpened()}>
            <Icon name="minus" size={25} color="#FFFFFF" />
          </MenuButton>
       </View>
        <View style={styles.first_icon_row}>
	     <Text style={{color: 'white', fontSize: 30, flex: 1}}>Total: {price} €</Text>
             <View style={{alignItems:  "center"}}>
             <RoundedButton style={styles.buttonStyle} onPress={() => this.props.changeScreen('home')}> 
              <Icon name="arrow-circle-left" size={30} color="#900" />
            </RoundedButton>
             <Text style={{marginTop: 10, color:'white'}}>Volver</Text>
          </View>
             <View style={{alignItems:  "center", marginRight: 10,marginLeft: 30}}>
            <RoundedButton style={styles.buttonStyle}>
              <Icon name="shopping-cart" size={30} color="#900" />
            </RoundedButton>
            <Text style={{marginTop: 10, color:'white'}}>Pagar</Text>
          </View>
         </View>
        </View>
        </View>
     );
   }
 }
