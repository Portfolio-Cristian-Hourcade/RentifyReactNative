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
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Geocoder from 'react-native-geocoding';

var width = Dimensions.get('window').width - 30; //full width

export default class HomeScreen extends Component<any> {

    state = {
        listProducts: null,
    }



    lookProduct = async (x) => {
        try {
            await AsyncStorage.setItem('Selected', JSON.stringify(x)).then(e => {
                this.props.navigation.navigate('InfoProduct');
            });
        } catch{
            console.warn;
        }
    }

    async componentDidMount() {
        await this.getListProduct();
        // @ts-ignore
        Geocoder.init("AIzaSyDA0NuvPpBCOw5WIOiZ4VS64Od1LocV0XA", { language: 'es' });// use a valid API key
    }

    goToList = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});

        // @ts-ignore
        Geocoder.from(location.coords.latitude, location.coords.longitude)
            .then(async (json) => {
                await AsyncStorage.setItem('Ubication', json.results[3].address_components[0].long_name);
            })
            .catch(error => console.warn(error));

            this.props.navigation.navigate('List');
    }

    goToListFromHomeInput = async (e) => {
        await AsyncStorage.setItem('Ubication', e.nativeEvent.text);
        this.props.navigation.navigate('List');
    };

    async getListProduct() {
        await getProducts().then(data => {
            this.setState({ listProducts: data });
            AsyncStorage.setItem("Product", JSON.stringify(data));
        });
    }


    render() {
        if (this.state.listProducts === null) {
            return (<Spinner
                visible={(this.state.listProducts === null) ? true : false}
                textContent={''} />)
        }

        return (
            <View style={{ backgroundColor: 'white', position: 'relative' }}>

                <ScrollView>
                    <View style={styles.containerData}>
                        <View style={{ marginTop: 15, marginLeft: 30, marginRight: 30 }}>
                            <Text style={{ fontSize: 28, fontFamily: 'font2', textAlign: 'center' }}>Encontrá el alquiler</Text>
                            <Text style={{ fontSize: 28, fontFamily: 'font2', textAlign: 'center' }}> de tus sueños</Text>
                        </View>
                        <View style={styles.buscadorGroup}>
                            <Image source={require('../../assets/lupa.png')} style={styles.searchIcon} />
                            <TextInput style={styles.inputBuscador} keyboardType='web-search' onSubmitEditing={(e) => { this.goToListFromHomeInput(e) }}
                             placeholderTextColor="#000000" placeholder="¿En qué barrio estas buscando alojarte?" />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 0.5 }}>
                            <TouchableOpacity style={styles.btnGuardados}>
                                <View style={styles.btnIcons}>
                                    <Image source={require('../../assets/icons/heart.png')}
                                        style={{ width: 15, height: 15, marginRight: 8, position: 'relative', top: 0.5 }} />
                                    <Text style={{ color: 'white', fontFamily: 'font2', position: 'relative', top: 1 }}>GUARDADOS</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <TouchableOpacity style={styles.btnMapa} onPress={() => this.props.navigation.navigate('Maps')}>
                                <View style={styles.btnIcons}>
                                    <Image source={require('../../assets/icons/placeholder.png')} style={{ width: 15, height: 15, marginRight: 8 }} />
                                    <Text style={{ color: '#ff5d5a', fontFamily: 'font2', position: 'relative', top: 1 }} >BUSCAR EN EL MAPA</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ paddingBottom: 95 }}>
                        <View style={{ marginTop: 30 }}>
                            <MyCarousel />
                        </View>

                        <View style={styles.titleSectionContent}>
                            <Text style={styles.titleSection}>Alquileres en tu zona</Text>
                            <Text style={styles.descriptionSection}>Estos son algunos de los alquileres que están cerca de tu ubicación.</Text>
                        </View>


                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 15, marginRight: 15, marginTop: 20 }}>
                            <View style={{ flex: 0.5, marginRight: 15, }}>
                                <TouchableOpacity onPress={() => this.lookProduct(this.state.listProducts[0])}>

                                    <CardPropiedadHome
                                        images={this.state.listProducts[0].images}
                                        title={this.state.listProducts[0].name}
                                        price={this.state.listProducts[0].price} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <TouchableOpacity onPress={() => this.lookProduct(this.state.listProducts[1])}>

                                    <CardPropiedadHome
                                        images={this.state.listProducts[1].images}
                                        title={this.state.listProducts[1].name}
                                        price={this.state.listProducts[1].price} />
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 15, marginRight: 15, marginTop: 20 }}>
                            <View style={{ flex: 0.5, marginRight: 15, }}>
                                <TouchableOpacity onPress={() => this.lookProduct(this.state.listProducts[2])}>

                                    <CardPropiedadHome
                                        images={this.state.listProducts[2].images}
                                        title={this.state.listProducts[2].name}
                                        price={this.state.listProducts[2].price} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <TouchableOpacity onPress={() => this.lookProduct(this.state.listProducts[3])}>

                                    <CardPropiedadHome
                                        images={this.state.listProducts[3].images}
                                        title={this.state.listProducts[3].name}
                                        price={this.state.listProducts[3].price} />

                                </TouchableOpacity>
                            </View>
                        </View>


                        <View>
                            <TouchableOpacity style={styles.btnVerMas} onPress={() => this.goToList()}>
                                <Text style={{ color: 'white', fontFamily: 'font2', position: 'relative', top: 1 }}>VER MÁS ALQUILERES EN MI ZONA</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.titleSectionContent}>
                            <Text style={styles.titleSection}>¿Tenés una propiedad?</Text>
                            <Text style={styles.descriptionSection}>Alquilá tu propiedad con Rentify y generá una ganancia mensual de hasta $36.000 / Mes</Text>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.btnOutline} onPress={() => this.props.navigation.navigate('AddProducto')}>
                                <Text style={{ color: '#ff5d5a', fontFamily: 'font2', position: 'relative', top: 1 }}>PUBLICAR MI PROPIEDAD</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <NavbarComponent props={this.props} />

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