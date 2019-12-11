import React, { Component } from 'react';
import { StyleSheet, Platform, Text, TextInput, View, TouchableOpacity, Image, ImageBackground, Button, ScrollView, StatusBar, AsyncStorage, Modal, TouchableHighlight, Alert, BackHandler } from 'react-native';
import { Dimensions } from "react-native";
import { getProductsWithKey } from '../../utilities/ProductsModule';
import * as ImagePicker from 'expo-image-picker';

var width = Dimensions.get('window').width - 30; //full width
var he = Dimensions.get('window').height; //full width

export default class UpdatePropiedadScreen extends Component {
    state = {
        product: null,
        modalVisible: false,
        itemSelected: null
    }

    constructor(props) {
        super(props);
    }

    async _pickImage() {
        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        }).then(resulta => {
            if (!resulta.cancelled) {

                const index = this.state.product.images
                    .findIndex(e => e === this.state.itemSelected);

                this.state.product.images[index] = resulta

                this.forceUpdate();
            }
        });
    };

    remove = async () => {
        this.state.product.images.splice(this.state.product.images.findIndex(e => e === this.state.itemSelected), 1);
        this.forceUpdate();
    }

    async componentDidMount() {
        const data = await AsyncStorage.getItem('Selected');
        let productSearch = JSON.parse(data);

        const data2 = await AsyncStorage.getItem('Usuario');
        this.setState({ user: JSON.parse(data2) });


        getProductsWithKey(productSearch.$key).then(e => {
            this.setState({ product: e });
        });
    }

    editItem = (e) => {
        this.setState({ itemSelected: e, modalVisible: true });
    }

    render() {
        if (this.state.product === null) {
            return <Text>Cargando...</Text>
        }
        return (
            <View >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={{
                            height: 50,
                            width: width - 110,
                            marginBottom: 10,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#ff5d5a',
                            borderRadius: 4,
                        }}
                            onPress={() => { this._pickImage() }}
                        >
                            <Text style={{ color: 'white', fontFamily: 'font1', fontSize: 14, position: 'relative', top: 2 }}>Cambiar imagen</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            height: 50,
                            width: width - 110,
                            marginBottom: 5,
                            marginTop: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#3483fa',
                            borderRadius: 4,
                        }}
                            onPress={() => { this.remove() }}>
                            <Text style={{ color: 'white', fontFamily: 'font1', fontSize: 14, position: 'relative', top: 2 }}>Borrar imagen</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            height: 30,
                            width: width - 110,
                            marginBottom: 15,
                            marginTop: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                            onPress={() => { this.setState({ modalVisible: false, itemSelected: null }) }}>
                            <Text>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <ScrollView style={{ height: he - 45, width: width, marginLeft: 15, marginTop: 45, }}>
                    <View>
                        <Text style={{ fontFamily: 'font2', fontSize: 20 }}>Estás por editar tu propiedad</Text>
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontFamily: 'font3', fontSize: 16 }}>Fotos de tu propiedad</Text>
                    </View>
                    <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', marginTop: 15 }}>
                        {this.state.product.images.map(element => {
                            console.log(typeof element);
                            return (
                                <TouchableOpacity onPress={() => this.editItem(element)}>
                                    <Image source={(typeof element === 'object') ? element : { uri: element }} style={{ flex: 1, width: (width) / 3 - 4, height: (width) / 3 - 4, margin: 1.5 }} />
                                </TouchableOpacity>
                            )
                        })}

                        <View>
                            <TouchableOpacity style={{ flex: 1, backgroundColor: '#ededed', justifyContent: 'center', alignItems: 'center', width: (width) / 3 - 4, height: (width) / 3 - 4, margin: 1.5 }} >
                                <Text style={{ fontSize: 26 }}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontFamily: 'font3', fontSize: 16 }}>Titulo de tu publicación</Text>
                        <TextInput style={styles.inputBuscador} placeholderTextColor="#000000" placeholder="0"  value={this.state.product.name} onChangeText={e => this.state.product.name = e} />
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontFamily: 'font3', fontSize: 16 }}>Descripción</Text>
                        <TextInput style={styles.inputBuscador} placeholderTextColor="#000000" placeholder="0"  value={this.state.product.description} onChangeText={e => this.state.product.description = e} />
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.btnSiguiente} onPress={() => { }}>
                    <Text style={{
                        color: 'white', fontSize: 20, fontFamily: 'font3', borderTopLeftRadius: 5,
                        borderTopRightRadius: 5
                    }}
                    >
                        Guardar
                        </Text>
                </TouchableOpacity>
            </View >

        )
    }
}


const styles = StyleSheet.create({
    btnSiguiente: {
        height: 55,
        width: width + 30,
        position: 'absolute',
        left: 0,
        bottom: 0,
        backgroundColor: '#ff5d5a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBuscador: {
        height: 50,
        width: width - 30,
        padding: 15,
        backgroundColor: '#eee',
        borderRadius: 5,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        position: 'relative',
        top: he / 2 - 100,
        width: width - 80,
        left: 50,
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
});