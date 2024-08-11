import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
<Ionicons name="arrow-back" size={24} color="black" />
import { Link,router } from 'expo-router';
const About = () => {


  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center",position:"relative"}}>
      <Ionicons name="arrow-back" size={35} color="black"  style={{position:"absolute",top:20,left:20}}  onPress={()=>router.push("/Camera")}/>
      <Text style={{fontWeight:"bold",color:"red"}}>In this App you can click Selfies very easily</Text>
    </View>
  )
}

export default About