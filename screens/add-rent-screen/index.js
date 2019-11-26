import React, { Component } from 'react';
import { StyleSheet, Image, StatusBar, View, Platform, Text, Button, TouchableOpacity, CameraRoll, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import Gallery from 'react-native-image-gallery';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import Photo from './Photo';
import PhotoComponent from './PhotoComponent';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width


export default class AddRentScreen extends Component<any> {

    state = { photos: null, images: null, saveTemp: null, rerender:false };
    constructor(props) {
        super(props);
        this.state.saveTemp = [];
    }


    _renderPhotos(photos) {
        let images = [];

        for (let { node: photo } of photos.edges) {
            images.push(
                photo.image);
        }
        this.setState({ images: images });
    }

    reloadComponent = () => {
        const images = this.state.images;
        this.forceUpdate();
        this.setState({images:images});
        this.setState({saveTemp:this.state.saveTemp});
        this.setState({rerender: true})

        // this.setState({ saveTemp: this.props.saveTemp});

    }

    componentDidMount() {
        this._getPhotosAsync().catch(error => {
            console.error(error);
        });
    }

    async _getPhotosAsync() {
        let photos = await CameraRoll.getPhotos({ first: 50 });
        this.setState({ photos });
        this._renderPhotos(photos);
    }

    render() {
        let { photos } = this.state;
        
        return (
            <View style={styles.splash}>
                <View style={styles.bar}>
                    <View>
                        <Text style={styles.title}>Fotos de tu publicación</Text>
                    </View>
                    <TouchableOpacity onPress={() => alert(JSON.stringify(this.state.saveTemp))}>
                        <Text>asd</Text>
                    </TouchableOpacity>
                    <View style={{ position: 'relative' }}>
                        <View style={styles.barraProgres}></View>
                        <View style={styles.barraProgresBg}></View>
                    </View>
                </View>

                <View style={{}}>
                    <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 15, flex: 1, flexDirection: 'row' }}>

                        <ScrollView style={{ width: width, height: height - 125 }}>
                            <View style={{ flex: 1, flexDirection: "row", flexWrap: 'wrap' }}>

                                {
                                    (this.state.images !== null) ?
                                        this.state.images.map((element) => {
                                            return (

                                                <PhotoComponent image={element} saves={this.state.saveTemp} handler={this.reloadComponent} rerender={this.state.rerender} />
                                            )
                                        }) : <Text>Hola gil</Text>}

                                {/* {photos
                                    ? this._renderPhotos(photos)
                                    : <Text>Fetching photos...</Text>} */}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    splash: {
        flex: 1,
    },
    title: {
        fontSize: 18,
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