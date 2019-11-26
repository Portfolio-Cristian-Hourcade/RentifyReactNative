import React, { Component } from 'react';
import { StyleSheet, Image, StatusBar, View, Platform, Text, Button, TouchableOpacity, CameraRoll, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import Gallery from 'react-native-image-gallery';
// import * as ImagePicker from 'expo-image-picker';
// import { ImagePicker, Permissions } from 'expo';
import * as ImagePicker from 'expo-image-picker';

import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import Photo from './Photo';
import PhotoComponent from './PhotoComponent';
import { AppLoading } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width


export default class AddRentScreen extends Component<any> {
    camera = React.createRef();

    state = {
        photos: null,
        images: null,
        saveTemp: null,
        imageToSee: 60,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        imagenList: [],
        auxList: [],
        image: null,

    };
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
            // @ts-ignore
            this.setState({ image: result.uri });
        }
    };
    // selectPicture = async () => {
    //     await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //     const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
    //         aspect: [1,1],
    //         allowsEditing: true,
    //     });
    //     if (!cancelled) this.setState({ image: uri });
    // };

    // takePicture = async () => {
    //     await Permissions.askAsync(Permissions.CAMERA);
    //     const { cancelled, uri } = await ImagePicker.launchCameraAsync({
    //         allowsEditing: false,
    //     });
    //     this.setState({ image: uri });
    // };

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }
    constructor(props) {
        super(props);
        this.state.saveTemp = [];
    }


    async _renderPhotos(photos) {
        let images = [];

        for (let { node: photo } of photos.edges) {
            if (photo.type === 'image/jpeg' || photo.type === 'image/jpg' || photo.type === 'image/png') {
                images.push(photo.image);
            }
        }

        this.setState({ images: images });
    }

    reloadComponent = () => {
        this.setState({image: this.state.saveTemp[0].uri});
        this.setState({ saveTemp: this.state.saveTemp, images: this.state.images });
    }

    async componentDidMount() {
        this.getPermissionAsync();
        this._getPhotosAsync().catch(error => {
            console.error(error);
        });
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }


    async _getPhotosAsync() {
        let photos = await CameraRoll.getPhotos({ first: this.state.imageToSee });
        this.setState({ photos });
        this._renderPhotos(photos);
    }

    addMoreImages() {
        this.setState({ photos: this.state.photos.push() })
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
                    //visibility of Overlay Loading Spinner
                    visible={true}
                    //Text with the Spinner
                    textContent={'Cargando'}
                //Text style of the Spinner Text
                />);
        }
    }


    render() {

        let { image } = this.state;

        return (
            <View style={styles.splash}>
                <View style={styles.bar}>
                    <View>
                        <Text style={styles.title}>¡Seleccioná las fotos de tu propiedad!</Text>
                    </View>
                    <View style={{ position: 'relative' }}>
                        <View style={styles.barraProgres}></View>
                        <View style={styles.barraProgresBg}></View>
                    </View>
                </View>

                <View style={{}}>
                    {image &&
                        <Image source={{ uri: image }} style={{ width: width, height: width}} />}
                    <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 15, flex: 1, flexDirection: 'row' }}>

                        <ScrollView style={{ width: width, height: height - ((this.state.image)?width+180:180) }} onScroll={(e) => {
                            var windowHeight = Dimensions.get('window').height,
                                height = e.nativeEvent.contentSize.height,
                                offset = e.nativeEvent.contentOffset.y;
                            if (windowHeight + offset >= height) {
                                // this.setState({ imageToSee: this.state.imageToSee + 120 });
                                // this._getPhotosAsync();
                            }
                        }}>
                            <View style={{ flex: 1, flexDirection: "row", flexWrap: 'wrap' }}>

                                {
                                    (this.state.images !== null) ?
                                        this.state.images.map((element) => {
                                            return (

                                                <PhotoComponent image={element} saves={this.state.saveTemp} handler={this.reloadComponent} />
                                            )
                                        }) : <Spinner
                                            //visibility of Overlay Loading Spinner
                                            visible={true}
                                            //Text with the Spinner
                                            textContent={'Cargando'}
                                        //Text style of the Spinner Text
                                        />}


                                {/* {this.reloadImages()} */}




                                <Button
                                    title="Ver más fotos"
                                    onPress={this._pickImage}
                                />
                            </View>

                        </ScrollView>
                    </View>
                </View>
                <TouchableOpacity style={styles.btnSiguiente}>
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: 'font3', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                        Siguiente
                    </Text>
                </TouchableOpacity>
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
    title: {
        fontSize: 18,
        fontFamily: 'font2'
    },
    barraProgres: {
        width: 45,
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
    barraProgresBg: {
        width: 300,
        height: 15,
        backgroundColor: '#F5F5F5',
        borderRadius: 50
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