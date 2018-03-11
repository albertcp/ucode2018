 import React from 'react';
 import {
   View,
   Button,
   Text,
   TouchableOpacity,
   Image,
   ScrollView,
   Linking,
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
     fontSize: 25,
     fontWeight: 'bold',
     color: '#900',
     paddingTop: 10
   },
   playTex: {
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

const getUrl = product => `https://adidas.es`;

export default class ShopMain extends React.Component {
    constructor(props){
	super(props);
    }


    
    render() {
	const { products, product_ids } = this.props;
	const cart = product_ids
	      .map(product_id => Object.values(products).find(p => p.id === product_id))
	      .reduce((p,c) => Object.assign({}, p, {[c.id]: { times: ((p[c.id] || {}).times || 0)+1, product: c}}), {});
	return (
	    <View style={{height: "100%",width: "100%" }}>
		<Text style={styles.timeStyle}>Cesta</Text>
	    {Object.values(cart).map(({times, product}, i) => (
				<View key={i}>
		<Text style={styles.lineStyle}>______________________________________________________________</Text>
		    <View style={{flexDirection: 'column'}}>
		    <View style={{alignItems: 'center' , flexDirection: 'row', justifyContent: 'flex-start'}}>
		    <Text onPress={() => Linking.openURL(getUrl(product))} style={styles.titleStyle}>{times > 1 && times} {product.nombre}</Text>
		    <Text onPress={() => Linking.openURL(getUrl(product))}> + info</Text>
		    </View>
		    <View style={{alignItems: 'center', flexDirection: 'row'}}>
		    <Text style={styles.textStyle}>Puntuación eco: {(product.contaminacion)*100/5}%</Text>
		    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: 50}}>
		    <Text onPress={() => {this.props.removeItem(product.id)}}>Quitar uno</Text>
		    </View>
		    </View>
		    </View>

		</View>)
		)}
            </View>
     );
   }
 }
