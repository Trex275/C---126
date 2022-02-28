import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from "react";
import PickImage from "./screens/Camera";
  
export default class App extends React.Component{
  render(){
    return(<PickImage />);
  }
}