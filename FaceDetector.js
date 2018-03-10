import React from 'react';
 import {
   View,
   Button,
   Text,
   TouchableOpacity,
   Image,
   ScrollView,
     AppRegistry,
  Dimensions,
  StyleSheet,
 } from 'react-native';
import Camera from 'react-native-camera';

 export default class FaceDetector extends React.Component {
     render(){
	 return( 
    <View style={styles.container}>
        <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            captureTarget={Camera.constants.CaptureTarget.cameraRoll}
            type={Camera.constants.Type.back}
            flashMode={Camera.constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}>
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        </View>
      </View>
     )}

     takePicture = async function() {
    debugger;
      if (this.camera) {
        const options = { quality: 0.5, base64: true };
        try{
        const data = await this.camera.capture();
        }catch(err){
          debugger
        }
        debugger
        console.log(data);
      }
    };
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black'
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20
    }
  });
