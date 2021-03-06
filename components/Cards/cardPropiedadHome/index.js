import React, { Component } from 'react';
import { StyleSheet, Platform, Text, View, Image, Button, TouchableOpacity, AsyncStorage } from 'react-native';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';

import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
const { width: screenWidth } = Dimensions.get('window')

const array = ['1', '2', '3'];

export default class CardPropiedadHome extends Component<any> {
    // const { text, onPress} = props;

    state = {
        activateSlide: null,
        images: null,
    }
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({ images: this.props.images })
    }


    _renderItem = ({ item, index }, parallaxProps) => {
        if (this.state.images == null) {
            return <Text>Loading</Text>
        }

        return (
            <TouchableOpacity style={styles.item} onPress={() => { this.lookProduct() }}>

                <ParallaxImage
                    source={{ uri: item }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
            </TouchableOpacity>
        );
    }

    lookProduct = async () => {
        await AsyncStorage.setItem('Selected', JSON.stringify(this.props.product)).then(e => {
            this.props.navigation.navigate('InfoProduct');
        })
    }

    getArrayData = () => {
        let aux = 1;
        let array = [];
        this.state.images.map(element => {
            array.push(aux);
            aux++;
        });
        return array;
    }

    render() {
        if (this.props === undefined) {
            return <Text>Cargando..</Text>
        }
        return (
            <View style={styles.card}>
                <View style={styles.column}>
                    <Carousel
                        sliderWidth={(screenWidth / 2) - 20}
                        sliderHeight={170}
                        itemWidth={(screenWidth / 2 ) - 20}
                        data={this.state.images}
                        renderItem={({ item, index }, parallaxProps) => this._renderItem({ item, index }, parallaxProps)}
                        hasParallaxImages={true}
                    />
                    <TouchableOpacity style={styles.col12} onPress={() => { this.lookProduct() }}>
                        <Text style={styles.textWeight}> 20 Reseñas - Belgrano</Text>
                        <Text style={styles.titleCard}>
                            {this.props.title}
                        </Text>
                        <Text style={styles.textWeight}> ${this.props.price} por noche</Text>
                    </TouchableOpacity>


                </View>
            </View>

        )
    }
};


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 3,
        borderColor: 'transparent',
        borderColor: 'transparent',
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 4,
    },
    item: {
        width: (screenWidth / 2) - 22,
        height: 170,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    titleCard: {
        fontFamily: 'font2',
        fontSize: 16,
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
        padding: 10
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
        fontSize: 12
    }

});