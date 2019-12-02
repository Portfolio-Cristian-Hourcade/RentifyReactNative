import React, { Component } from 'react';
import { StyleSheet, Platform, Text, TextInput, View, TouchableOpacity, Image, ImageBackground, Button, ScrollView, StatusBar, AsyncStorage } from 'react-native';

import { LogOut } from '../../utilities/FirebaseModule';


import StylesGlobal from '../../styles/styles';
import Carousel from 'react-native-snap-carousel';

import Constants from 'expo-constants';
import { Dimensions } from "react-native";
import MyCarousel from ' ../../../components/BannersCarrousel';
import CardPropiedadList from '../../components/Cards/cardPropiedadList';
import CardPropiedadHome from '../../components/Cards/cardPropiedadHome';
import Sidebar from '../../components/Sidebar';
import NavbarComponent from '../../navigation/Navbar';
import { Review } from '../../models/Review';
import { getProducts } from '../../utilities/ProductsModule';
import Spinner from 'react-native-loading-spinner-overlay';
import { Asset } from 'expo-asset';
var width = Dimensions.get('window').width; //full width
var he = Dimensions.get('window').height; //full width

export default class InfoProductScreen extends Component<any> {

    state = {
        product: null
    }

    async componentWillMount() {
        var data = await AsyncStorage.getItem('Selected');
        this.setState({ product: JSON.parse(data) });
        console.log(this.state.product);
    
    }

    render() {
        if (this.state.product === null) {
            return <Text>Cargando...</Text>
        }

        return (
            <View style={{ position: 'relative', }}>
                <ScrollView style={{ height: he }}>

                    <Image style={{ width: width, height: width, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }} source={{ uri: this.state.product.images[0] , cache: 'force-cache'}} />
                    <View style={{ elevation: 0, width: width, padding: 20 }}>
                        <Text style={{ color: 'black', fontSize: 22, fontFamily: 'font1' }}>
                            {this.state.product.name}
                        </Text>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ color: 'black', fontSize: 26, fontFamily: 'font2', flex: 0.6 }}>
                                ${this.state.product.price} <Text style={{ fontSize: 16, fontFamily: 'font3', color: 'orange', paddingLeft: 30 }}> %20</Text>
                            </Text>
                            <View style={{ flex: 0.4, justifyContent: 'flex-start', alignContent: 'flex-start', position: 'relative' }}>
                                <TouchableOpacity style={{ backgroundColor: '#ff5d5a', borderRadius: 50, height: 60, width: 60, position: 'absolute', top: -15, right: 0 }}>
                                    <Image source={require('../../assets/icons/share.png')} style={{ width: 30, height: 30, position: 'relative', left: 13, top: 15 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={{ fontSize: 12, fontFamily: 'font1' }}>
                            {this.state.product.ubicacion}
                        </Text>

                    </View>
                </ScrollView>
                <TouchableOpacity style={{
                    width: width,
                    height: 50,
                    backgroundColor: '#ff5d5a',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',

                }}>
                    <Text style={{ color: 'white', fontFamily: 'font1' }}>
                        Reservar propiedad
                    </Text>
                </TouchableOpacity>
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
    btnGuardados: {
        backgroundColor: '#ff5d5a',
        marginLeft: 15,
        marginRight: 5,
        height: 50,
        flex: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8
    },
    btnIcons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnMapa: {
        borderColor: '#ff5d5a',
        borderWidth: 2,
        marginRight: 15,
        marginLeft: 5,
        height: 50,
        flex: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8
    },
    titleSection2: {
        fontFamily: 'font2',
        fontSize: 22,
        textAlign: 'center'
    },
    titleSection3: {
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
        fontSize: 28
    },
    btnVerMas: {
        backgroundColor: '#ff5d5a',
        marginLeft: 15,
        marginRight: 15,
        height: 50,
        flex: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        marginTop: 30
    },
    btnOutline: {
        borderColor: '#ff5d5a',
        borderWidth: 2,
        marginLeft: 15,
        marginRight: 15,
        height: 50,
        flex: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8
    },
    btnMatch: {
        backgroundColor: '#FFF',
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        width: 270,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 5,
        left: width / 2 - 135 - 28,
        position: 'absolute',
        bottom: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    descriptionSection: {
        fontFamily: 'font1',
        fontSize: 14
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
        marginTop: 8,
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
        backgroundColor: '#eee',
        borderRadius: 5,
    },
    searchIcon: {
        position: 'absolute',
        right: 20,
        top: 17,
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