import React, { useState, useRef, useEffect } from 'react';
import { View, Button, Image, StyleSheet, Pressable, Alert } from 'react-native';
import { CameraView, CameraType,Camera, FlashMode } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Link } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';


const Cam=()=> {
  const [val, setVal] = useState<CameraType>("back");
  const [capturedPhoto, setCapturedPhoto] = useState("");
  const cameraRef = useRef<CameraView>(null);
  const [flashLight,setFlashLight]=useState<FlashMode>("off");


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const mediaStatus=await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted' || mediaStatus.status!=='granted') {
        alert('Sorry, we need camera permission and media access permission');
      }

    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo!.uri);
    }
  };

  const Save=async()=>{
    try {
      await MediaLibrary.createAssetAsync(capturedPhoto);
      Alert.alert('Photo Saved', 'Photo has been saved to your media library!');
    } catch (error) {
      console.error('Error saving photo:', error);
      Alert.alert('Error', 'Failed to save photo.');
    }
  }

  



  return (
    <View style={{ flex: 1 }}>
      <CameraView
       style={{ flex: 1,position:"relative"}}
       facing={val}
       flash={flashLight}
       zoom={1}
       enableTorch={flashLight==="on"?true:false}
       ref={cameraRef}
      >
      <Pressable style={styles.btn} onPress={takePhoto}></Pressable>
      <FontAwesome6 name="camera-rotate" size={35} color="white"  onPress={() => setVal(cur => cur === "back" ? "front" : "back")}  style={{position:'absolute',left:10,top:10}} />
      <Ionicons name={flashLight==="on"?"flash":"flash-off"} size={35} color="white" onPress={()=>setFlashLight(cur=>cur==="on"?"off":"on")} style={{position:'absolute',right:10,top:10}}   />
      </CameraView>
      {capturedPhoto && (
        <View style={{width:"100%",height:"100%"}}>
        <Image source={{ uri:capturedPhoto }} style={styles.image} /> 
        <View   style={{flex:1,position:"absolute",bottom:30,width:"100%",alignItems:"center",justifyContent:"space-between",flexDirection:"row",paddingHorizontal:10}}>
        <MaterialCommunityIcons name="camera-retake" size={45} color="white" style={{alignSelf:"flex-start"}}  onPress={()=>setCapturedPhoto("")} />
        <Feather name="save" size={45} color="white" onPress={Save}  style={{alignSelf:"flex-end"}} />
       </View>
      </View>
      )}
    </View>
  );
};

export default Cam;

const styles = StyleSheet.create({
  image:{
    position:"absolute",
    width:"100%",
    height:"100%"
  },
 
  btn:{
   position:"absolute",
   width:75,
   height:75,
   bottom:65,
   backgroundColor:"white",
   borderRadius:50,
  alignSelf:"center"
  }
});
