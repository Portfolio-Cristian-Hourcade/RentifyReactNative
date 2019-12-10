import React, { Component } from 'react';
import { StyleSheet, Image, StatusBar, View, AsyncStorage } from 'react-native';
import { Dimensions } from 'react-native';
import { VerifiyAuth } from '../../utilities/FirebaseModule';
import * as Font from "expo-font";

export default class SplashScreen extends Component<any> {

    async componentDidMount() {
        const result = await AsyncStorage.getItem("Usuario");
        await Font.loadAsync({
            font1: require("../../assets/fonts/Poppins-Regular.ttf"),
            font2: require("../../assets/fonts/Poppins-Bold.ttf"),
            font3: require("../../assets/fonts/Poppins-Medium.ttf"),
        });
        
        if (result !== null) {
            this.props.navigation.replace("Home");
        } else {
            this.props.navigation.replace("Login");
        }
    }

    render() {
        return (
            <View>


            </View>
        );
    }
};

const styles = StyleSheet.create({
    splash: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        height: null,
    }
});