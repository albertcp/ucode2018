 import React from 'react';
 import {
   View,
   Button,
   Text,
   TouchableOpacity,
   Image,
   ScrollView,
 } from 'react-native';

export default class About extends React.Component{
    render(){
	return (
		<View style={{alignItems: 'center', justifyContent: 'center'}}>
		<Text style={{fontSize:50, textAlign: 'center'}}> Hecho por Ned Team para el uCode 2018 </Text>
		</View>
	);
    }
}
