import React, { Component } from 'react';
import { Platform, NativeModules } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './screens/splash-screen';
import AppNavigator from './navigation/Router';
import { createAppContainer } from 'react-navigation';
import {StatusBar} from 'react-native';
import { initializeApp, newRegistro } from './utilities/firebaseUtility';

const AppContainer = createAppContainer(AppNavigator);


export default class App extends Component {
  


  render(){
    initializeApp();
    return (
      <AppContainer/>
      );
    }
}


