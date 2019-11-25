import React, { Component } from 'react';
import { StyleSheet, Platform, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';

import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
const { width: screenWidth } = Dimensions.get('window')

const array = ['1', '2', '3'];

export default class CardPropiedadList extends Component<any> {
    // const { text, onPress} = props;

    state = {
        activateSlide: null
    }
    constructor(props) {
        super(props);
    }
    _renderItem({ item, index }, parallaxProps) {
        let someLocalImage;
        switch (item) {
            case '1':
                someLocalImage = require('../../../assets/dog.jpg');
                break;
            case '2':
                someLocalImage = require('../../../assets/bg_app.jpg');
                break;
            default:
                someLocalImage = require('../../../assets/example.jpg');
                break;
        }


        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={someLocalImage}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
            </View>
        );
    }


    render() {
        return (
            <View style={styles.card}>
                <View style={styles.column}>
                    <Carousel
                        sliderWidth={screenWidth}
                        sliderHeight={275}
                        itemWidth={screenWidth}
                        data={['1', '2', '3', '3']}
                        renderItem={this._renderItem}
                        hasParallaxImages={true}
                    />
                    <View style={styles.col12}>
                        <Text style={styles.textWeight}> 22 Reseñas - Belgrano</Text>
                        <Text style={styles.titleCard}>Excelente dpto en belgrano muy luminoso</Text>
                        <Text style={styles.textWeight}> $750 por noche</Text>
                    </View>


                </View>
            </View>

        )
    }
};


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',

        borderColor: 'transparent',
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 7,
    },
    item: {
        width: screenWidth - 30,
        height: 275,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    titleCard: {
        fontFamily: 'font2',
        fontSize: 22,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 3,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    column: {
        flex: 1,
        flexDirection: 'column',
    },
    propiedad: {
        width: 60,
        height: 60,
    },
    col12: {
        flex: 1,
        padding: 15
    },
    centerTop: {
        alignItems: "center",
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
        fontFamily: 'font1',
        fontSize: 16
    }

});