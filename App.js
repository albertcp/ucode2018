/**
 *
 */

 import React from 'react';
 import {
   View,
   Button,
   Text,
   TouchableOpacity,
   Image,
   ScrollView,
 } from 'react-native';
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
   }
 }

 export default class App extends React.Component {

   constructor(props){
     super(props);
     this.state = {
       opened: false,
     };
   }

   renderBottomMenu(){
     return (
       <View style={{width: "100%", height: "100%", backgroundColor: "black", alignItems: "flex-start"}}>
       <View style={{width: "100%", height: "100%"}}>
       <View style={{alignItems: "center", justifyContent: "flex-start"}}>
          <MenuButton style={styles.buttonStyle} onPress={() => this.setState({opened: !this.state.opened})}>
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
            <RoundedButton style={styles.buttonStyle} onPress={() => this.setState({opened: !this.state.opened})}>
              <Icon name="fire" size={30} color="#900" />
            </RoundedButton>
            <Text style={{marginTop: 10, color:'white'}}>Ejercicios</Text>
          </View>
          <View style={{alignItems:  "center"}}>
            <RoundedButton tyle={styles.buttonStyle}>
              <Icon name="camera" size={30} color="#900" />
            </RoundedButton>
            <Text style={{marginTop: 10, color:'white'}}>Scan Code</Text>
          </View>
          <View style={{alignItems:  "center"}}>
            <RoundedButton style={styles.buttonStyle}>
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
             <RoundedButton style={styles.buttonStyle}>
               <Icon name="comments" size={30} color="#900" />
             </RoundedButton>
             <Text style={{marginTop: 10, color:'white'}}>Chat</Text>
           </View>
           <View style={{alignItems:  "center"}}>
             <RoundedButton style={styles.buttonStyle}>
               <Icon name="share-alt" size={30} color="#900" />
             </RoundedButton>
             <Text style={{marginTop: 10, color:'white'}}>Ejercicios</Text>
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

   render() {
     const { opened } = this.state;
     return (
       <View style={styles.container}>
         <ScrollView style={{height: opened ? "15%" : "85%",width: "100%" }}>
           <View style={{ width: "100%", justifyContent: "center", alignItems: "center"}}>
             <Image style={{ height: 300, width: 300}} resizeMode="contain" source={require('./images/QR-code.png')}/>
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
         </ScrollView>
         <View style={{width: "100%", height: opened ? "60%" : "18%"}}>
           {opened && this.renderBottomMenu() || <TouchableOpacity onPress={() => this.setState({opened: true})}>
             {this.renderBottomMenu()}
           </TouchableOpacity>}
         </View>
       </View>
     );
   }
 }
