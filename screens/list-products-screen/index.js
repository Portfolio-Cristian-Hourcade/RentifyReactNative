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

var width = Dimensions.get('window').width - 30; //full width

export default class ListProductScreen extends Component<any> {

    state = {
        listProducts: null,
        location: null,
        marker: null,
        listFilters: null
    }

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
        this.setState({ marker: { latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude } })
    };



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
    }

    async getListProduct() {
        this.setState({ listProducts: JSON.parse(await AsyncStorage.getItem("Product")) });
        this._filters();

    }

    _filters = () => {
        this.getLocationAsync().then(e => {

            const filters = []
            // Si nuestra latitud es negativa
            if (this.state.marker.latitude < 0) {
                // Si nuestra longitud es negativa
                if (this.state.marker.longitude < 0) {

                    // Buscamos en el listado de productos
                    this.state.listProducts.map(element => {

                        // Si el producto tiene latitud negativa
                        if (element.ubicacionGPS.latitude < 0) {

                            // Si el producto tiene longitud negativa
                            if (element.ubicacionGPS.longitude < 0) {
                                let aux;
                                if (this.state.marker.latitude > element.ubicacionGPS.latitude) {
                                    aux = this.state.marker.latitude - element.ubicacionGPS.latitude;
                                } else {
                                    aux = element.ubicacionGPS.latitude - this.state.marker.latitude;
                                }

                                if (aux < 0.01) {

                                    let aux2;
                                    if (this.state.marker.longitude > element.ubicacionGPS.longitude) {
                                        aux2 = this.state.marker.longitude - element.ubicacionGPS.longitude;
                                    } else {
                                        aux2 = element.ubicacionGPS.longitude - this.state.marker.longitude;
                                    }
                                    if (aux2 < 0.01) {
                                        filters.push(element);
                                    }
                                }
                            }
                        }
                    });
                }
            } else if (this.state.marker.latitude > 0) {
                // Si nuestra longitud es negativa
                if (this.state.marker.longitude > 0) {
                    alert('entra aca')

                    // Buscamos en el listado de productos
                    this.state.listProducts.map(element => {

                        // Si el producto tiene latitud negativa
                        if (element.ubicacionGPS.latitude > 0) {

                            // Si el producto tiene longitud negativa
                            if (element.ubicacionGPS.longitude > 0) {
                                let aux = this.state.marker.latitude - element.ubicacionGPS.latitude;
                                if (aux < 0.01) {
                                    let aux2 = this.state.marker.longitude - element.ubicacionGPS.longitude;

                                    if (aux2 < 0.01) {
                                        filters.push(element);
                                    }
                                }
                            }
                        }
                    });
                } else if (this.state.marker.longitude < 0) {
                    this.state.listProducts.map(element => {

                        // Si el producto tiene latitud negativa
                        if (element.ubicacionGPS.latitude > 0) {

                            // Si el producto tiene longitud negativa
                            if (element.ubicacionGPS.longitude < 0) {
                                let aux;
                                if (this.state.marker.latitude > element.ubicacionGPS.latitude) {
                                    aux = Number(this.state.marker.latitude) - Number(element.ubicacionGPS.latitude);
                                } else {
                                    aux = Number(element.ubicacionGPS.latitude) - Number(this.state.marker.latitude);
                                }
                                alert(aux);

                                if (aux < 0.01) {
                                    let aux2;
                                    if (this.state.marker.longitude > element.ubicacionGPS.longitude) {
                                        aux2 = this.state.marker.longitude - element.ubicacionGPS.longitude;
                                    } else {
                                        aux2 = Number(element.ubicacionGPS.longitude) - Number(this.state.marker.longitude);
                                    }
                                    alert(aux2);
                                    if (aux2 < 0.01) {
                                        filters.push(element);
                                    }
                                }
                            }
                        }
                    });
                }
            }
            alert('cantidad:' + filters.length);
        })

    }

    render() {
        console.log(this.state.listProducts);
        if (this.state.listProducts === null) {
            return (<Spinner
                visible={(this.state.listProducts === null) ? true : false}
                textContent={''} />)
        }

        return (
            <View style={{ backgroundColor: 'white', position: 'relative' }}>

                <ScrollView>
                    <View style={styles.containerData}>
                        <View style={styles.buscadorGroup}>
                            <TextInput style={styles.inputBuscador} placeholderTextColor="#000000" placeholder="¿Dondé estás buscando alojarte?" />
                            <TouchableOpacity style={{
                                height: 50, width: 100, backgroundColor: '#ff5d5a',
                                position: 'absolute', top: 5, right: 15, borderBottomRightRadius: 8, borderTopRightRadius: 8,
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Text style={{ fontFamily: 'font2', color: 'white' }}>FILTROS</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ paddingBottom: 95 }}>
                        <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', marginLeft: 15, marginRight: 15, marginTop: 5, justifyContent: 'center' }}>
                            {this.state.listProducts.map(element => {
                                return (<TouchableOpacity style={{ marginTop: 30 }} onPress={() => this.lookProduct(element)}>
                                    <CardPropiedadList
                                        images={element.images}
                                        title={element.name}
                                        price={element.price} />
                                </TouchableOpacity>)
                            })}
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