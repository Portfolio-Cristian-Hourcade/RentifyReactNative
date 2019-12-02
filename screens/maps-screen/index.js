import React, { Component } from 'react';
import { StyleSheet, Platform, Text, View, TextInput, Image, ImageBackground, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import StylesGlobal from '../../styles/styles';
import * as Font from "expo-font";
import ButtonPrimary from '../../components/Buttons/buttonPrimary';
import ButtonSecondary from '../../components/Buttons/buttonSecondary';
import { SingIn, SingUp } from '../../utilities/FirebaseModule';
import { Dimensions } from "react-native";
var width = Dimensions.get('window').width; //full width
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { AppLoading } from 'expo';
import CardPropiedadHome from '../../components/Cards/cardPropiedadHome';
import CardPropiedadList from '../../components/Cards/cardPropiedadList';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width


export default class MapsScreen extends Component<any> {
    state = {
        location: null,
        errorMessage: null,
        marker: null,
        listProducts: null,
        selectItem: null
    };

    async componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }

        let x = await AsyncStorage.getItem('Product');

        console.log('Datos de storage')

        this.setState({
            listProducts: JSON.parse(x)
        });

    }

    _getLocationAsync = async () => {
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

    lookProduct = async () => {
        try {
            await AsyncStorage.setItem('Selected', JSON.stringify(this.state.selectItem)).then(e => {
                this.props.navigation.navigate('InfoProduct');
            });
        } catch{
            console.warn;
        }
    }

    render() {
        if (!this.state.marker) {
            return (
                <AppLoading
                    startAsync={this._getLocationAsync}
                    onFinish={() => alert("HOLA")}
                    onError={console.warn}
                />
            );
        } else {

            return (
                <View style={styles.container}>

                    <MapView style={styles.mapStyle}
                        initialRegion={{
                            latitude: this.state.location.coords.latitude,
                            longitude: this.state.location.coords.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        customMapStyle={generateStyle}
                    >
                        {
                            (this.state.listProducts !== null) ?
                                this.state.listProducts.map(element => {
                                    return (
                                        <Marker coordinate={{ latitude: element.ubicacionGPS.latitude, longitude: element.ubicacionGPS.longitude }} style={{ elevation: 10 }} onPress={() => { this.setState({ selectItem: element }) }}>
                                            <View style={{ backgroundColor: '#ff5d5a', borderRadius: 3, paddingTop: 4, paddingBottom: 4, paddingLeft: 10, paddingRight: 10, elevation: 10 }}>
                                                <Text style={{ fontFamily: 'font2', color: 'white', fontSize: 12 }}>${element.price} / Día</Text>
                                            </View>
                                        </Marker>
                                    )
                                }) : null
                        }


                        <Marker coordinate={this.state.marker}>
                            <View style={{ backgroundColor: '#4b96f3', borderRadius: 50, width: 20, height: 20, elevation: 10 }}>
                            </View>
                        </Marker>
                    </MapView>


                    <View style={{ position: 'absolute', left: 5, top: 5, padding: 10, elevation: 9 }}>
                        <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 50, width: 50, height: 50 }} onPress={() => this.props.navigation.navigate('Home')}>
                            <Image source={require('../../assets/close.png')} style={{ height: 25, width: 25, position: 'relative', left: 12, top: 12 }} />
                        </TouchableOpacity>
                    </View>

                    {(this.state.selectItem !== null) ?
                        <TouchableOpacity onPress={() => this.lookProduct()}
                            style={{
                                width: width - 60, height: height / 3,
                                borderTopRightRadius: 5, borderTopLeftRadius: 5,
                                backgroundColor: 'white', elevation: 9,
                                position: 'absolute', bottom: 15,
                                left: 30
                            }}>

                            <CardPropiedadList
                                images={this.state.selectItem.images}
                                title={this.state.selectItem.name}
                                price={this.state.selectItem.price} />

                        </TouchableOpacity>
                        : null}
                </View>
            );
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

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