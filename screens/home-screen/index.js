import React, { Component } from 'react';
import { StyleSheet, Platform, Text, TextInput, View, TouchableOpacity, Image, ImageBackground, Button, ScrollView } from 'react-native';

import { LogOut } from '../../utilities/FirebaseModule';

import StylesGlobal from '../../styles/styles';
import Carousel from 'react-native-snap-carousel';

import Constants from 'expo-constants';
import { Dimensions } from "react-native";
import MyCarousel from ' ../../../components/BannersCarrousel';
import CardProductos from '../../components/Cards/cardProductos';
var width = Dimensions.get('window').width - 30; //full width


export default class HomeScreen extends Component {



    logout() {
        LogOut(this.props.navigation);
    }



    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.actionLeft}>
                    <Image source={require('../../assets/menu.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionRight}>
                    <Image source={require('../../assets/gps.png')} style={styles.icon2} />
                </TouchableOpacity>
                <View style={styles.containerData}>
                    <View style={styles.logoCont}>
                        <Text style={styles.textLogo}>Space</Text>
                    </View>
                    <View style={styles.buscadorGroup}>
                        <Image source={require('../../assets/lupa.png')} style={styles.searchIcon} />
                        <TextInput style={styles.inputBuscador} />
                    </View>
                    <View style={styles.arrayAnuncios}>
                        
                        {/* <Image source={require('../../assets/dog.jpg')} style={styles.anuncio1} /> */}
                        {/* <Image source={require('../../assets/dog.jpg')} style={styles.anuncio2} /> */}
                    </View>
                    <MyCarousel/>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        flexDirection: 'column',
    },
    actionLeft: {
        height: 60,
        width: 60,
        position: 'absolute',
        backgroundColor: 'white',
        elevation: 15,
        left: 0,
        top: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
        borderBottomRightRadius: 50
    },
    actionRight: {
        height: 60,
        width: 60,
        position: 'absolute',
        backgroundColor: 'white',
        elevation: 15,
        right: 0,
        top: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
        borderBottomLeftRadius: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 25,
        height: 25,
        position: 'relative',
        top: 13,
        left: 11
    },
    icon2: {
        width: 25,
        height: 25,
        position: 'relative',
        top: -3,
        right: -4
    },
    containerData: {
        marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
        flexDirection: 'column',
    },
    logoCont: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buscadorGroup: {
        marginTop: 20,
        height: 60,
        justifyContent: 'center',

        alignItems: 'center',
    },
    textLogo: {
        fontSize: 28,
        fontFamily: 'font2'
    },
    inputBuscador: {
        height: 50,
        width: width,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 15
    },
    searchIcon: {
        position: 'absolute',
        right: 20,
        top: 17,
        elevation: 20,
        height: 25,
        width: 25
    },
    anuncio1: {
        marginLeft: 10,
        marginRight: 10,
        width: width,
        height: 200,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    arrayAnuncios: {
        marginTop: 30
    }
});