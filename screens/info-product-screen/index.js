import React, { Component } from 'react';
import { StyleSheet, Platform, Text, TextInput, View, TouchableOpacity, Image, ImageBackground, Button, ScrollView, StatusBar, AsyncStorage, Modal, TouchableHighlight, Alert } from 'react-native';

import { LogOut } from '../../utilities/FirebaseModule';


import StylesGlobal from '../../styles/styles';
import MapView, { Marker } from 'react-native-maps';
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
import { CheckBox } from 'react-native-elements';

import { Asset } from 'expo-asset';
import DialogMatch from '../../components/Cards/dialogMatch';
import DialogMatchAdd from '../../components/Cards/dialogMatchAdd';
var width = Dimensions.get('window').width; //full width
var he = Dimensions.get('window').height; //full width

export default class InfoProductScreen extends Component<any> {

    state = {
        product: null,
        isOpenMatch1: false,
        isOpenMatch2: false,
        modalVisible: false,
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible, isOpenMatch1: true });
    }
    addDaysMatch() {
        // TODO - Agregar dias a la busqueda
        this.setState({ isOpenMatch1: false, isOpenMatch2: true });
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

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    {this.state.isOpenMatch1 ?
                        <View style={styles.modalContent}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 110, paddingTop: 10 }}>
                                <Text style={{ fontFamily: 'font1', fontSize: 17, textAlign: 'center', marginBottom: 10 }}>
                                    ¿Querés buscar un compañero de cuarto para este alquiler?
                                </Text>
                                <TextInput style={{
                                    height: 50,
                                    width: (width - 80) - 30,
                                    padding: 15,
                                    marginBottom: 15,
                                    textAlign: 'center',
                                    backgroundColor: '#eee',
                                    borderRadius: 5,
                                }} placeholderTextColor="#000000" placeholder="¿Cuantos días querés alquilar?" keyboardType='phone-pad' onChangeText={() => { }} />

                            </View>

                            <View style={{ position: 'absolute', bottom: 15, left: 15 }}>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ isOpenMatch1: false, isOpenMatch2: true }) }}
                                    style={{ width: (width - 80) - 30, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4b96f3' }}>
                                    <Text style={{ color: 'white', fontFamily: 'font1' }}>¡Si! buscar compañeros</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { this.setState({ isOpenMatch1: false, isOpenMatch2: false, modalVisible: false }) }}
                                    style={{ width: (width - 80) - 30, height: 50, marginTop:5, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                                    <Text style={{ color: '#ff5d5a', fontFamily: 'font1' }}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        : null}
                    {
                        this.state.isOpenMatch2 ?
                            <View style={styles.modalContent}>

                                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                    <Text style={{ fontFamily: 'font2', fontSize: 26 }}>
                                        ¡Increible!
                                </Text>
                                </View>

                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 110, paddingTop: 10 }}>
                                    <Text style={{ fontFamily: 'font1', fontSize: 17, textAlign: 'center' }}>
                                        Ya hay 9 personas que estan buscando compañero de cuarto en esta propiedad.
                                </Text>
                                </View>

                                <View style={{ position: 'absolute', bottom: 15, left: 15 }}>
                                    <TouchableOpacity style={{ width: (width - 80) - 30, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4b96f3' }}>
                                        <Text style={{ color: 'white', fontFamily: 'font1' }}>Ver Compañeros</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { this.setState({ isOpenMatch1: false, isOpenMatch2: false, modalVisible: false }) }}
                                        style={{ width: (width - 80) - 30, height: 50,marginTop:5, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                                        <Text style={{ color: '#ff5d5a', fontFamily: 'font1' }}>Cancelar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            : null
                    }
                </Modal>

                <ScrollView style={{ height: he }}>
                    <Image style={{ width: width, height: width, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }} source={{ uri: this.state.product.images[0], cache: 'force-cache' }} />
                    <View style={{ elevation: 0, width: width, padding: 20, paddingBottom: 100 }}>
                        <Text style={{ color: 'black', fontSize: 22, fontFamily: 'font1' }}>
                            {this.state.product.name}
                        </Text>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ color: 'black', fontSize: 32, fontFamily: 'font2', flex: 0.6 }}>
                                ${this.state.product.price} <Text style={{ fontSize: 17, fontFamily: 'font1', color: '#333', paddingLeft: 10 }}> / Día</Text>
                            </Text>
                            <View style={{ flex: 0.4, justifyContent: 'flex-start', alignContent: 'flex-start', position: 'relative' }}>
                                <TouchableOpacity style={{ backgroundColor: '#ff5d5a', borderRadius: 50, height: 60, width: 60, position: 'absolute', top: -15, right: 0 }}
                                    onPress={() => { this.setModalVisible(true) }}>
                                    <Image source={require('../../assets/icons/user.png')} style={{ width: 30, height: 30, position: 'relative', left: 13, top: 15 }} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View>
                            <View>

                                <Image source={require('../../assets/icons/favorites.png')} style={{ width: 20, height: 20, position: 'absolute', }} />
                                <Text style={{ marginLeft: 30 }}>4.7 Puntuación ( 9 Reseñas )</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ fontSize: 12, fontFamily: 'font1', flex: 1 }}>
                                {this.state.product.ubicacion}
                            </Text>
                        </View>

                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#eee', marginTop: 10, marginBottom: 10 }} />

                        <View>
                            <MapView style={{ width: width - 40, height: 145 }}
                                initialRegion={{
                                    latitude: this.state.product.ubicacionGPS.latitude,
                                    longitude: this.state.product.ubicacionGPS.longitude,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                                pitchEnabled={false}
                                rotateEnabled={false}
                                scrollEnabled={false}
                                zoomEnabled={false}
                                customMapStyle={generateStyle}
                            >
                                <Marker coordinate={{
                                    latitude: this.state.product.ubicacionGPS.latitude,
                                    longitude: this.state.product.ubicacionGPS.longitude,
                                }}>
                                    <View style={{ backgroundColor: '#4b96f3', borderRadius: 50, width: 20, height: 20, elevation: 10 }}>
                                    </View>
                                </Marker>
                            </MapView>
                            <View style={{ width: width - 40, minHeight: 20, borderWidth: 1, borderColor: '#eee', paddingBottom: 5, paddingTop: 5, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, paddingLeft: 15 }}>
                                <Text style={{ color: '#333' }}>
                                    Esta es la ubicación aproximada del alquiler
                                </Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity style={{
                                height: 50,
                                width: width - 40,
                                marginBottom: 10,
                                marginTop: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#ff5d5a',
                                borderRadius: 4,
                            }}>
                                <Text style={{ color: 'white', fontFamily: 'font1', fontSize: 14, position: 'relative', top: 2 }}>
                                    Compartir Propiedad
                    </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#eee', marginTop: 10, marginBottom: 10 }} />

                        <View>
                            <Text style={{ color: 'black', fontSize: 22, fontFamily: 'font1' }}>
                                Prestaciones & Comodiades
                        </Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                this.state.product.prestaciones.map(element => {
                                    return (<CheckBox
                                        containerStyle={{ width: (width + 60) / 3 }}
                                        title={element.name}
                                        checked={element.check}
                                    />)
                                }
                                )}
                        </View>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#eee', marginTop: 15, marginBottom: 15 }} />

                        <View>
                            <Text style={{ color: 'black', fontSize: 22, fontFamily: 'font1' }}>
                                Descripción
                            </Text>
                            <Text style={{ marginTop: 10 }}>
                                {this.state.product.description}
                            </Text>
                        </View>

                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#eee', marginTop: 15, marginBottom: 15 }} />


                        <View>
                            <Text style={{ color: 'black', fontSize: 22, fontFamily: 'font1' }}>
                                Normas del alquiler
                        </Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 5 }}>
                            {
                                this.state.product.normas.map(element => {
                                    return (<CheckBox
                                        containerStyle={{ width: (width + 60) / 3 }}
                                        title={element.name}
                                        checked={element.check}
                                    />)
                                }
                                )}
                        </View>

                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#eee', marginTop: 15, marginBottom: 15 }} />

                        <View style={{ marginTop: 5, marginBottom: 5 }}>
                            <Text style={{ color: 'black', fontSize: 22, fontFamily: 'font1' }}>
                                Politicas de cancelación
                            </Text>
                            <Text>
                                La cancelación es gratuita dentro de las 48hs
                            </Text>
                        </View>

                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#eee', marginTop: 15, marginBottom: 15 }} />

                        <View style={{ marginTop: 5, marginBottom: 5 }}>
                            <Text style={{ color: 'black', fontSize: 22, fontFamily: 'font1' }}>
                                Politicas de reservación
                            </Text>
                            <Text>
                                Mirá cuales son las politicas de reservación
                            </Text>
                        </View>

                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#eee', marginTop: 15, marginBottom: 15 }} />

                    </View>
                </ScrollView>


                <View style={{
                    width: width,
                    backgroundColor: 'white',
                    position: 'absolute',
                    height: 80,
                    bottom: 0,
                    left: 0,
                    flex: 1,
                    paddingLeft: 20,
                    paddingRight: 20,
                    flexDirection: 'row',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: -6,
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 4.62,
                }}>
                    <TouchableOpacity style={{
                        flex: 0.4,
                        height: 50,
                        top: 15,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#3483fa',
                        borderRadius: 4,
                    }}>
                        <Text style={{ color: 'white', fontFamily: 'font1', fontSize: 14, position: 'relative', top: 2 }}>
                            Contactar Rentador
                    </Text>
                    </TouchableOpacity>


                    <View style={{ flex: 0.2 }} ></View>

                    <TouchableOpacity style={{
                        flex: 0.4,
                        height: 50,
                        top: 15,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#ff5d5a',
                        borderRadius: 4,
                    }}>
                        <Text style={{ color: 'white', fontFamily: 'font1', fontSize: 14, position: 'relative', top: 2 }}>
                            Reservar propiedad
                    </Text>
                    </TouchableOpacity>
                </View>

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
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        position: 'relative',
        top: he / 2 - 100,
        width: width - 80,
        left: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
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


const generateStyle = [
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
];