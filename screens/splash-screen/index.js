import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Dimensions } from 'react-native';
import { VerifiyAuth } from '../../utilities/FirebaseModule';

export default class SplashScreen extends Component {

    componentDidMount() {
        VerifiyAuth(this.props.navigation);
    }
    render() {
        return (
            <Image source={require('../../assets/background.png')} />
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