import React, { Component } from 'react';
import { Platform, Text, TextInput, View, TouchableOpacity, Image, ImageBackground, Button, ScrollView } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth } = Dimensions.get('window')

export default class MyCarousel extends Component {

    _renderItem (item: string, parallaxProps) {
        // alert(index);
        const someLocalImage = require(item);


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

    render () {
        return (
            <Carousel
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={['1','2','3','3']}
                renderItem={this._renderItem}
                hasParallaxImages={true}
            />
        );
    }
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
})