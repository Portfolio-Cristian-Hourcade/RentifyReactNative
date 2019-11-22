//This is an example code to generate QR code//
import React, { Component } from 'react';
import StylesGlobal from '../../styles/styles';
import { StyleSheet, Platform, Text, TextInput, View, TouchableOpacity, Image, ImageBackground, Button, ScrollView, StatusBar, Dimensions } from 'react-native';
import Constants from 'expo-constants';

// import all basic components
import { default as QRCodeIOS } from 'react-native-qrcode-svg';
// import QRCode as QrIos from 'react-native-qrcode-svg';
import { default as QRCodeAndroid } from 'react-native-qrcode';
var height = Dimensions.get('window').height; //full width
var width = Dimensions.get('window').width; //full width

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View>

                <View style={styles.sidebar} >
                </View>
                <View style={styles.sidebarContent}>
                    <ScrollView>
                        <View style={styles.topSide}>
                            <Text style={{fontSize:24, fontFamily:'font2', color:'white'}}>¡Hola Renty Usuario!</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    topSide:{
        backgroundColor:'#ff489a',
        height:225,
        color:'white',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        padding:15
    },
    sidebar: {
        width: width,
        backgroundColor: 'black',
        opacity: 0.2,
        position: 'absolute',
        left: 0,
        right: 0,
        top: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
        elevation: 20,
        height: height,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0,
        shadowRadius: 0.00,
    },
    sidebarContent: {
        width: 300,
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        elevation: 20,
        top: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight+0.5,
        height: height
    }
});