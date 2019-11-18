import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import Carousel from 'react-native-snap-carousel';
import {Dimensions } from "react-native";

const screenWidth = Math.round(Dimensions.get('window').width);

export default class CardProductos extends Component {


    constructor() {
        super();
        this.state = {
            carouselItems: [
                {
                    title: "Item 1"
                },
                {
                    title: "Item 2"
                },
                {
                    title: "Item 3"
                },
                {
                    title: "Item 4"
                },
                {
                    title: "Item 5"
                }
            ]
        };
    }

    _renderItem({ item, index }) {
        return (
            <View style={{flex:1}}>
                <Image source={require('../../../assets/bg-login.jpg')} style={{ flex:1, width: null, height: null,  borderBottomRightRadius:12, borderBottomLeftRadius:12 }} />
            </View>
        )
    }




    render() {

        return (
            <View style={styles.card}>
                <View style={styles.column}>
                    <View style={styles.col12}>

                        <View style={styles.col4}>
                            <Image source={require("../../../assets/news.png")} style={styles.icono} />
                        </View>

                        <View style={styles.col6}>
                            <Text style={styles.fontTitle}>
                                Productos destacados
                            </Text>
                        </View>
                    </View>

                    <SafeAreaView style={styles.container}>
                        <Carousel data={this.state.carouselItems} sliderWidth={(screenWidth-20)} itemWidth={screenWidth-15} renderItem={this._renderItem} />
                    </SafeAreaView>


                </View>
            </View>

        )
    };
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        height: 360,
        borderRadius: 12,
        borderColor: 'transparent',
        marginTop: 20,
        paddingBottom:20,
        elevation: 5,
        flex: 1
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    column: {
        flex: 1,
        flexDirection: 'column',
    },
    icono: {
        width: 60,
        height: 60,
        margin: 15
    },
    col12: {
        flexDirection: 'row'
    },
    col4: {
        flex: 0.2
    },
    col6: {
        flex: 0.8,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    btnToAction: {
        backgroundColor: "#3C7FFF",
        padding: -8,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        height: 40,
        color: 'white',
        alignItems: "center",
        justifyContent: "center",
    },
    textButton: {
        color: 'white'
    },
    mTop: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    textWeight: {
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        backgroundColor: '#131420',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fontTitle: {
        fontSize: 18,
        fontWeight: '700',
        paddingLeft:15
    }
});
