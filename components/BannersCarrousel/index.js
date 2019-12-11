import React, { Component } from 'react';
import { Platform, Text, TextInput, View, TouchableOpacity, Image, ImageBackground, Button, ScrollView } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth } = Dimensions.get('window')

export default class MyCarousel extends Component {

  _renderItem({item, index}, parallaxProps) {
    let someLocalImage;
    switch (item) {
      case '1':
        someLocalImage = require('../../assets/bg_2.png');
        break;
      case '2':
        someLocalImage = require('../../assets/bg_1.png');
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
      <Carousel
        sliderWidth={screenWidth }
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={['1', '2']}
        firstItem={0}
        renderItem={this._renderItem}
        hasParallaxImages={true}
        layout={'default'}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth/2+120,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue

  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode:'contain',
    width:50,
    height:200
  },
})