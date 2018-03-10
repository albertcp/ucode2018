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

 const styles = {
   container: {
     flex: 1,
     backgroundColor: 'white',
     alignItems: 'center',
     justifyContent: 'space-between',
     flexDirection: 'row'
   },
   buttonStyle: {
     borderRadius: 100,
     borderWith:1
   }
 }

 export default class App extends React.Component {
   state = {
     visible: true
   }

   render() {
     return (
       <View style={styles.container}>
         <TouchableOpacity onPress={() => this.setState({visible: true})}>
           <Image source={require('./images/QR_code.png')}/>
         </TouchableOpacity>
         <SlidingUpPanel
           draggableRange={{top: 675,bottom: 100}}
           ref={c => this._panel = c}
           visible={true}
           onRequestClose={() => this.setState({visible: false})}>
           <View style={[styles.container, {backgroundColor: "black"}]}>
              <Icon name="rocket" size={30} color="#900" />
              <Button style={styles.buttonStyle} title='hide' />
             <Text style={{color:"white"}}>Here is the content inside panel</Text>
           </View>
         </SlidingUpPanel>
       </View>
     );
   }
 }
