import React, { Component } from 'react';
import { StyleSheet, Platform, Text, TextInput, View, TouchableOpacity, Image, ImageBackground, Button, ScrollView, StatusBar } from 'react-native';

import { LogOut } from '../../utilities/FirebaseModule';

import StylesGlobal from '../../styles/styles';
import Carousel from 'react-native-snap-carousel';

import Constants from 'expo-constants';
import { Dimensions } from "react-native";
import MyCarousel from ' ../../../components/BannersCarrousel';
import CardPropiedadList from '../../components/Cards/cardPropiedadList';
import CardPropiedadHome from '../../components/Cards/cardPropiedadHome';
import Sidebar from '../../components/Sidebar';
var width = Dimensions.get('window').width; //full width


export default class NavbarComponent extends Component {
    render() {
        return (
            <View style={styles.navbar}>
                <View style={styles.itemNav}>
                    <Image source={require('../../assets/icons/home.png')} style={{ width: 30, height: 30 }} />
                </View>
                <View style={styles.itemNav}>
                    <Image source={require('../../assets/icons/favorites.png')} style={{ width: 30, height: 30 }} />

                </View>
                <View style={styles.itemNav}>
                    <Image source={require('../../assets/icons/chat.png')} style={{ width: 30, height: 30 }} />

                </View>
                <View style={styles.itemNav}>
                    <Image source={require('../../assets/icons/user-1.png')} style={{ width: 30, height: 30 }} />

                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    navbar: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -10,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        width: width,
    },
    itemNav: {
        flex: 0.25,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
