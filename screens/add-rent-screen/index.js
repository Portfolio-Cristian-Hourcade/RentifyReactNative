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
        images: [],
        saveTemp: [],
        imageToSee: 40,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        imagenList: [],
        auxList: [],
        image: null,
        step: 1
    };
    constructor(props) {
        super(props);
    }

    async _pickImage() {
        const images = this.state.images;
        const saves = this.state.saveTemp;

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        }).then(resulta => {
            if (!resulta.cancelled)
                images.push(resulta);
            saves.push(resulta);
            this.setState({ images: images, saveTemp: saves, image: resulta.uri });
        });
    };


    getPermissionAsync = async () => {
        // if (status !== 'granted') {
        //     alert('Hey! You heve not enabled selected permissions');
        // }

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
        alert(JSON.stringify(images));

        this.setState({ images: images });
    }

    reloadComponent = () => {
        if (this.state.saveTemp[0] !== undefined) {
            this.setState({ image: this.state.saveTemp[0].uri });
        } else {
            this.setState({ image: null });
        }

        this.setState({ saveTemp: this.state.saveTemp, images: this.state.images });
    }

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
        // CameraRoll.getPhotos({ first: this.state.imageToSee, assetType: 'All', groupTypes: 'All' }).then(data => {
        //     this.setState({ data });
        //     this._renderPhotos(data);
        // }).catch((e) => {
        //     alert(JSON.stringify(e));
        // });


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
                    <View>
                        <Text>Datos de tu propiedad</Text>
                    </View>);
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
                    <View style={{ position: 'relative' }}>
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
                            }} />
                            :
                            null
                        }
                    </View>
                </View>

                <View style={{}}>

                    {(image && this.state.saveTemp[0] !== undefined) ?

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

                        <ScrollView style={{ width: width, height: height - ((this.state.image || this.state.saveTemp[0] !== undefined) ? (width > 500) ? 680 : (width + 180) : 180) }}>
                            {this.calculateStep()}

                        </ScrollView>
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