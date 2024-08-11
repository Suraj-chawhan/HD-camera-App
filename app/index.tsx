import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import {createDrawerNavigator} from "@react-navigation/drawer"
import Camera from "./Camera"
import About from "./About"


const drawer=createDrawerNavigator()
const index = () => {
  return (
  <SafeAreaView style={{flex:1,marginTop:-35}}>
    <drawer.Navigator >
      <drawer.Screen name="Camera"  component={Camera} />
      <drawer.Screen name="About"  component={About} />
    </drawer.Navigator>
    </SafeAreaView>
  )
}

export default index