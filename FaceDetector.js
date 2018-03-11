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
     NativeModules,
     ToastAndroid,
 } from 'react-native';
const Buffer = require('buffer/').Buffer ;
import RNFetchBlob from 'react-native-fetch-blob'

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

import { DeviceEventEmitter } from 'react-native';
const {
    Face,
} = NativeModules;

const uploadImage = (storage, uri, mime = 'application/octet-stream') => {
    return new Promise((resolve, reject) => {
	let uploadBlob = null;
	const imageRef = storage.ref().child('image.jpg')
	fs.readFile(uri, 'base64')
            .then((data) => {
		return Blob.build(data, { type: `${mime};BASE64` })
            })
            .then((blob) => {
		uploadBlob = blob
		return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
		uploadBlob.close()
		return imageRef.getDownloadURL()
            })
            .then((url) => {
		resolve(url)
            })
            .catch((error) => {
		reject(error)
	    })
    })
}


import Camera from 'react-native-camera';

 export default class FaceDetector extends React.Component {
     render(){
	 return( 
		 <View style={{flexDirection: 'column'}}>
        <Camera
            ref={ref => {
              this.camera = ref;
            }}
	     style={{
		 flex: 0,
		 height: Dimensions.get('window').width,
		 width: Dimensions.get('window').width,
	     }}
            captureTarget={"disk"}
             type={'back'}
	     captureQuality="480p"
             permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}>
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        </View>
      </View>
     )}

     takePicture = async function() {
	 if (this.camera) {
         const options = { quality: 0.5, base64: true };
        try{
            const data = await this.camera.capture() ;
	    await uploadImage(this.props.storage, data.path, "image/jpeg");
	    ToastAndroid.show("Subido con exito. Puede", ToastAndroid.SHORT);
	    //ws.send(raw);
        }catch(err){
          console.error(err);
        }
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
