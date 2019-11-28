import React, { Component } from 'react';
import { StyleSheet, Image, StatusBar, View, Platform, Text, Button, TouchableOpacity, CameraRoll, ScrollView, TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import PhotoComponent from './PhotoComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import { CheckBox } from 'react-native-elements';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


export default class AddRentScreen extends Component<any> {

    state = {
        photos: null,
        images: [],
        saveTemp: [],   //add to product
        ubication: null,   //add to product
        ubicationGPS: null,//add to product
        mt2: null,//add to product
        imageToSee: 40,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        imagenList: [],
        auxList: [],
        image: null,
        step: 1,
        isOpenMap: false,
        isOpenPrestaciones: false,
        location: null,
        errorMessage: null,
        marker: null,
        region: null
    };

    constructor(props) {
        super(props);
    }

    async _pickImage() {
        const images = this.state.images;
        const saves = this.state.saveTemp;

        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        }).then(resulta => {
            if (!resulta.cancelled) {
                images.push(resulta);
                saves.push(resulta);
                this.setState({ images: images, saveTemp: saves, image: resulta.uri });
            }
        });
    };


    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    async _renderPhotos(photos) {
        let images = [];

        if (Platform.OS !== 'ios') {
            for (let { node: photo } of photos.edges) {

                if (photo.type === 'image/jpeg' || photo.type === 'image/jpg' || photo.type === 'image/png') {
                    images.push(photo.image);
                }
            }
        } else {
            for (let { node: photo } of photos.edges) {

                if (photo.type === 'image') {
                    images.push(photo.image);
                }
            }
        }
        this.setState({ images: images });
    }

    toggleMap() {
        this.setState({ isOpenMap: !this.state.isOpenMap });
    }
    onRegionChange = (region) => {
        this.setState({ region });
    }

    getAdressUbication = () => {
        Geocoder.from(this.state.region.latitude, this.state.region.longitude)
            .then(json => {
                var addressComponent = json.results[0].address_components[0];
                alert("Tu dirección aproximada es: " + json.results[0].formatted_address);
                this.setState({ ubicationGPS: { latitude: this.state.region.latitude, longitude: this.state.region.longitude } });
                this.setState({ ubication: json.results[0].formatted_address, isOpenMap: false });
            })
            .catch(error => console.warn(error));
    }

    showMap = () => {
        if (this.state.isOpenMap) {
            return (
                <View style={styles.container}>

                    <MapView
                        style={styles.mapStyle}
                        region={
                            this.state.region
                        }
                        onRegionChangeComplete={(region) => this.setState({ region })}
                        customMapStyle={generateStyle}
                    />

                    <View style={{
                        position: 'absolute', top: height / 2 - 50, height: 100, width: 100, left: width / 2 - 60, backgroundColor: '#0080ff82', borderRadius: 50, justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{ position: 'relative', color: 'white', fontFamily: 'font2', padding: 5, textAlign: 'center', alignSelf: 'center' }}>Ubicación de tu propiedad</Text>
                    </View>

                    <View style={{ position: 'absolute', left: 5, top: 5, padding: 10, elevation: 9 }}>
                        <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 50, width: 50, height: 50 }} onPress={() => this.setState({ isOpenMap: !this.state.isOpenMap })}>
                            <Image source={require('../../assets/close.png')} style={{ height: 25, width: 25, position: 'relative', left: 12, top: 12 }} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{
                        position: 'absolute', height: 50, bottom: 25, width: width - 30, left: 15, backgroundColor: '#3483fa', justifyContent: 'center',
                        borderRadius: 5,
                        alignItems: 'center',
                    }}
                        onPress={() => this.getAdressUbication()}
                    >
                        <Text style={{ fontFamily: 'font2', color: 'white' }}>Guardar ubicación</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    showPrestaciones = () => {
        if (this.state.isOpenPrestaciones) {
            return (
                <View style={styles.container}>
                    <View style={{ height: height, width: width, padding: 15, backgroundColor: 'white' }}>
                        <TouchableOpacity>
                            <Image source={require('../../assets/close.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ fontFamily: 'font2', fontSize: 20 }}>Seleccioná las prestaciones de tu propiedad</Text>
                        </View>
                        <View style={styles.card}>
                            <Text>Hola :D</Text>
                            <CheckBox
                                title="Press me"
                                checked={true}
                                onPress={() => alert("HOLA :D")}
                            />
                        </View>
                    </View>
                </View>
            )
        }
    }


    reloadComponent = () => {
        if (this.state.saveTemp[0] !== undefined) {
            this.setState({ image: this.state.saveTemp[0].uri });
        } else {
            this.setState({ image: null });
        }

        this.setState({ saveTemp: this.state.saveTemp, images: this.state.images });
    }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();

            Geocoder.init("AIzaSyDA0NuvPpBCOw5WIOiZ4VS64Od1LocV0XA", { language: 'es' }); // use a valid API key

        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let region = await Location.getCurrentPositionAsync({});
        this.setState({ region: { latitude: region.coords.latitude, longitude: region.coords.longitude, longitudeDelta: 0.01, latitudeDelta: 0.01 } })
    };

    async componentDidMount() {
        this.getPermissionAsync();
        this._getPhotosAsync().catch(error => {
            console.error(error);
        });
    }


    async _getPhotosAsync() {
        let photos
        if (Platform.OS === 'ios') {
            CameraRoll.getPhotos({ first: this.state.imageToSee, assetType: 'All', groupTypes: 'All' }).then(data => {
                this.setState({ data });
                this._renderPhotos(data);
            }).catch((e) => {
                alert(JSON.stringify(e));
            });
        } else {
            CameraRoll.getPhotos({ first: this.state.imageToSee }).then(data => {
                this.setState({ data });
                this._renderPhotos(data);
            }).catch((e) => {
                alert(JSON.stringify(e));
            });
        }
    }

    addMoreImages() {
        this.setState({ photos: this.state.photos.push() })
    }

    changeStep() {
        if (this.state.saveTemp.length > 0) {
            this.setState({ step: this.state.step + 1 });
        }
    }

    calculateStep = () => {
        switch (this.state.step) {
            case 1:
                return (
                    <View style={{ flex: 1, flexDirection: "row", flexWrap: 'wrap' }}>


                        {
                            (this.state.images.length !== 0) ?
                                this.state.images.map((element) => {
                                    return (
                                        <PhotoComponent image={element} saves={this.state.saveTemp} handler={this.reloadComponent} />
                                    )
                                }) :
                                (Platform.OS !== 'ios') ?
                                    <Spinner
                                        visible={true}
                                        textContent={''} />
                                    : null
                        }

                        <TouchableOpacity
                            onPress={() => this._pickImage()}
                            style={styles.btnVerMas}
                        >
                            <Text style={{ color: 'white' }}>VER MÁS FOTOS</Text>
                        </TouchableOpacity>
                    </View>)
            case 2:
                return (
                    <View style={{ marginTop: 15 }}>
                        <View>
                            <Text style={{ fontFamily: 'font3', fontSize: 21, alignSelf: 'center' }}>¡Cargaste las fotos con exito!</Text>
                            <Text style={{ fontFamily: 'font1', fontSize: 18, marginTop: 40 }}>Ahora contanos donde se ubica</Text>
                        </View>
                        <View style={{ marginTop: 15, position: 'relative', }}>
                            <TouchableOpacity style={styles.inputBuscador} onPress={() => this.toggleMap()}>
                                <Text>{this.state.ubication === null ? 'Av. Ejemplo 1234' : this.state.ubication}</Text>
                                <Image source={require('../../assets/gps.png')} style={{ width: 25, height: 25, position: 'absolute', right: 15, top: 13 }} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 40 }}>
                            <Text style={{ fontFamily: 'font1', fontSize: 18 }}>¿Cuantos mt2 tiene tu propiedad?</Text>
                        </View>
                        <View style={{ marginTop: 15, position: 'relative' }}>
                            <TextInput style={styles.inputBuscador} placeholderTextColor="#000000" placeholder="0" keyboardType='number-pad' value={this.state.mt2} onChangeText={mt2 => this.setState({ mt2: mt2 })} />
                            <Text style={{ position: 'absolute', right: 15, top: 17 }}>mt²</Text>
                        </View>

                        <View style={{ marginTop: 40 }}>
                            <Text style={{ fontFamily: 'font1', fontSize: 18 }}>¿Que prestaciones tiene tu propiedad?</Text>
                            <TouchableOpacity style={{
                                backgroundColor: 'white',
                                borderWidth: 2,
                                borderColor: '#ff5d5a',
                                height: 50,
                                width: width - 30,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                elevation: 3,
                                marginTop: 10
                            }}
                                onPress={() => this.togglePrestaciones()}>
                                <View style={{
                                    position: 'absolute', justifyContent: 'center',
                                    alignItems: 'center', left: 10, top: 7, height: 30, width: 30, borderRadius: 50, backgroundColor: '#ff5d5a'
                                }}>
                                    <Text style={{ color: 'white', fontFamily: 'font2', position: 'relative', top: 1 }}>0</Text>
                                </View>
                                <Text style={{ fontFamily: 'font3', fontSize: 16, color: '#ff5d5a', position: 'relative', top: 1 }}>Seleccionar las prestaciones </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 40 }}>
                            <Text style={{ fontFamily: 'font1', fontSize: 18 }}>¿Cuales son las normas?</Text>
                            <TouchableOpacity style={{
                                backgroundColor: 'white',
                                borderWidth: 2,
                                borderColor: '#3483fa',
                                height: 50,
                                width: width - 30,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                elevation: 3,
                                marginTop: 10
                            }}>
                                <View style={{
                                    position: 'absolute', justifyContent: 'center',
                                    alignItems: 'center', left: 10, top: 7, height: 30, width: 30, borderRadius: 50, backgroundColor: '#3483fa'
                                }}>
                                    <Text style={{ color: 'white', fontFamily: 'font2', position: 'relative', top: 1 }}>0</Text>
                                </View>
                                <Text style={{ fontFamily: 'font3', fontSize: 16, color: '#3483fa', position: 'relative', top: 1 }}>Seleccionar las normas </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                );
        }
    }


    reloadImages() {
        if (this.state.auxList.length !== 0) {
            if (this.state.auxList.length !== this.state.images.length) {
                const cont = 1;
                this.state.images.map(element => {
                    if (cont > this.state.auxList.length) {
                        this.state.auxList.push(<PhotoComponent image={element} saves={this.state.saveTemp} handler={this.reloadComponent} />);
                    }
                })
            }
            return (this.state.auxList);
        }
        if (this.state.images !== null) {
            const aux = []
            this.state.images.map((element) => {
                aux.push(
                    <PhotoComponent image={element} saves={this.state.saveTemp} handler={this.reloadComponent} />
                );
            });
            this.setState({ auxList: aux })
            return aux;
        } else {
            return (
                <Spinner
                    visible={true}
                    textContent={'Cargando'}
                />);
        }
    }

    togglePrestaciones() {
        this.setState({ isOpenPrestaciones: !this.state.isOpenPrestaciones });
    }

    render() {
        let widthProgress;
        let titleText;
        let { image, step } = this.state;
        switch (step) {
            case 1:
                widthProgress = 40;
                titleText = "¡Seleccioná las fotos de tu propiedad!"
                break;
            case 2:
                widthProgress = 140
                titleText = "Contanos un poco sobre tu propiedad"

                break;
            case 3:
                widthProgress = 190;
                break;
        }
        return (
            <View style={styles.splash}>
                <View style={styles.bar}>
                    <View>
                        <Text style={styles.title}>{titleText}</Text>
                    </View>
                    <View style={{ position: 'relative', marginTop: 15 }}>
                        <View style={styles.barraProgresBg}></View>
                        {(step !== undefined) ?
                            < View style={{
                                width: widthProgress,
                                height: 15,
                                backgroundColor: '#ff5d5a',
                                borderRadius: 50,
                                elevation: 2,
                                position: 'absolute',
                                bottom: 0
                            }} >
                                <LinearGradient
                                    colors={['#ff5d5a', '#f0476d']}
                                    style={{ height: 15, alignItems: 'center', borderRadius: 5 }}
                                    start={[0, 0]}
                                    end={[1, 0]}>
                                </LinearGradient>
                            </ View>
                            :
                            null
                        }
                    </View>
                </View>

                <View style={{}}>

                    {(image && this.state.saveTemp[0] !== undefined && step === 1) ?

                        <Image source={{ uri: image }} style={{
                            width: (step === 1) ? width : width - 60,
                            height: (step === 1) ? width : width - 60,
                            maxHeight: 500,
                            maxWidth: 500,
                            marginLeft: 0,
                            alignSelf: 'center',
                            borderRadius: 3,
                        }} />
                        : null}

                    <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 15, flex: 1, flexDirection: 'row' }}>

                        {
                            (step === 1) ?
                                <ScrollView style={{ width: width, height: height - ((this.state.image || this.state.saveTemp[0] !== undefined) ? (width > 500) ? 680 : (width + 180) : 180) }}>
                                    {this.calculateStep()}
                                </ScrollView>
                                :
                                <ScrollView style={{ width: width, height: height - 200 }}>
                                    {this.calculateStep()}
                                </ScrollView>
                        }
                    </View>
                </View>

                <TouchableOpacity style={styles.btnSiguiente} onPress={() => this.setState({ step: step + 1 })}>
                    <Text style={{
                        color: 'white', fontSize: 20, fontFamily: 'font3', borderTopLeftRadius: 5,
                        borderTopRightRadius: 5
                    }}
                    >
                        Siguiente
                    </Text>
                </TouchableOpacity>
                {this.showMap()}
                {this.showPrestaciones()}

            </View>
        );
    }
};

const styles = StyleSheet.create({
    splash: {
        flex: 1,
    },
    btnSiguiente: {
        height: 55,
        width: width,
        position: 'absolute',
        left: 0,
        bottom: 0,
        backgroundColor: '#ff5d5a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnVerMas: {
        height: 55,
        width: width - 30,
        backgroundColor: '#3483fa',
        justifyContent: 'center',
        borderRadius: 5,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontFamily: 'font2'
    },
    barraProgres: {
        // width: this.state.step,
        height: 15,
        backgroundColor: '#ff5d5a',
        borderRadius: 50,
        elevation: 2,
        position: 'relative',
        bottom: -15
    },
    row: { flexDirection: 'row' },
    image: { width: 300, height: 300, backgroundColor: 'gray' },
    button: {
        padding: 13,
        margin: 15,
        backgroundColor: '#dddddd',
    },
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        elevation: 20,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute',
        top: 0,
        left: 0
    },
    inputBuscador: {
        height: 50,
        width: width - 30,
        padding: 15,
        backgroundColor: '#eee',
        borderRadius: 5,
    },
    barraProgresBg: {
        width: 300,
        height: 15,
        backgroundColor: '#F5F5F5',
        borderRadius: 50
    },
    card: {
        marginTop: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        width: width - 30,
        height: 120,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 7
    },
    bar: {
        backgroundColor: 'white',
        height: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        flexDirection: 'column',
        elevation: 14,
        justifyContent: 'center',
        alignItems: 'center',
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