import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Dimensions } from 'react-native';
import { VerifiyAuth } from '../../utilities/firebaseUtility';

export default class SplashScreen extends Component {

    componentDidMount() {
        VerifiyAuth(this.props.navigation);

        // setTimeout(() => {
        //     this.props.navigation.navigate('Login')
        // }, 3000);
    }
    render() {
        return ( 
            <Image source = { require('../../assets/background.png') } style = { styles.backgroundImage }/>
        );
    }
};

const styles = StyleSheet.create({
    splash: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        height: null,
    }
});