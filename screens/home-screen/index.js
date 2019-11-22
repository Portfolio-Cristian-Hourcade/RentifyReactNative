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
var width = Dimensions.get('window').width - 30; //full width


export default class HomeScreen extends Component {

    render() {
        return (
            <View>
                <Sidebar/>

                <TouchableOpacity style={styles.actionLeft}>
                    <Image source={require('../../assets/menu.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionRight}>
                    <Image source={require('../../assets/gps.png')} style={styles.icon2} />
                </TouchableOpacity>
                <View style={styles.containerData}>
                    <View style={styles.logoCont}>
                        <Image style={{width:80, height:80, position:'relative',
                    top:2}} source={require('../../assets/logo.png')}/>
                    </View>
                    <View style={styles.buscadorGroup}>
                        <Image source={require('../../assets/lupa.png')} style={styles.searchIcon} />
                        <TextInput style={styles.inputBuscador} placeholder="¿Qué estás buscando?"/>
                    </View>
                </View>


                <ScrollView >
                    <View style={{ paddingBottom: 235 }}>
                        <View style={{ marginTop: 30 }}>
                            <MyCarousel />
                        </View>

                        <View style={styles.titleSectionContent}>
                            <Text style={styles.titleSection}>Alquileres en tu zona</Text>
                            <Text style={styles.descriptionSection}>Estos son algunos de los alquileres que están cerca de tu ubicación.</Text>
                        </View>

                        <View style={styles.titleSectionContent}>
                            <CardPropiedadList />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 15, marginRight: 15, marginTop: 30 }}>
                            <View style={{ flex: 0.5, marginRight: 15, }}>
                                <CardPropiedadHome />
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <CardPropiedadHome />
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.btnVerMas}>
                                <Text style={{ color: 'white' }}>VER MÁS ALQUILERES EN MI ZONA</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleSectionContent}>
                            <Text style={styles.titleSection2}>Encontrá tu compañero de cuarto</Text>
                            <Text style={styles.descriptionSection2}>
                                Compartí los gatos del alquiler con otra
                                 persona que comparta tu misma situación
                            </Text>
                        </View>
                        <View>

                            <Image resizeMode="contain" source={require('../../assets/student.jpg')}
                                style={{ width: width + 30, height: 300 }} />
                            <TouchableOpacity style={styles.btnMatch}>
                                <Text style={{ color: 'black',fontFamily:'font1' }}>
                                BUSCAR ACOMPAÑANTES
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.titleSectionContent}>
                            <Text style={styles.titleSection3}>Alquileres más recomendados</Text>
                            <Text style={styles.descriptionSection}>Estos son los alquileres más recomendados por los usuarios de la comunidad.</Text>
                        </View>
                        <View style={styles.titleSectionContent}>
                            <CardPropiedadList />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 15, marginRight: 15, marginTop: 30 }}>
                            <View style={{ flex: 0.5, marginRight: 15, }}>
                                <CardPropiedadHome />
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <CardPropiedadHome />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 15, marginRight: 15, marginTop: 30 }}>
                            <View style={{ flex: 0.5, marginRight: 15, }}>
                                <CardPropiedadHome />
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <CardPropiedadHome />
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.btnVerMas}>
                                <Text style={{ color: 'white' }}>VER MÁS ALQUILERES RECOMENDADOS</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        flexDirection: 'row',
    },
    titleSection2: {
        fontFamily: 'font2',
        fontSize: 22,
        textAlign: 'center'
    },
    titleSection3:{
        fontSize: 25,
        fontFamily: 'font2',

    },
    descriptionSection2: {
        fontFamily: 'font1',
        fontSize: 14,
        textAlign: 'center'
    },
    titleSection: {
        fontFamily: 'font2',
        fontSize: 32
    },
    btnVerMas: {
        backgroundColor: '#b43d4c',
        marginLeft: 15,
        marginRight: 15,
        height: 45,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        marginTop: 30
    },
    btnMatch:{
        backgroundColor: '#FFF',
        height: 45,
        marginLeft:40,
        marginRight:40,
        width:270,
        paddingLeft:30,
        paddingRight:30,
        borderRadius:5,
        left:width/2 - 135 - 28,
        position:'absolute',
        bottom:25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    descriptionSection: {
        fontFamily: 'font1',
        fontSize: 16
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
        marginTop: 10,
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
        borderRadius: 5,
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
    titleSectionContent: {
        marginTop: 45,
        width: width,
        marginLeft: 15,
    }
});