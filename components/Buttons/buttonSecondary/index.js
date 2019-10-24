import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const ButtonSecondary = (props) => {
    const { text, onPress } = props;

    return (
        <TouchableOpacity style={styles.buttonStyle} onPress={() => onPress()}>
            <Text style={styles.textStyle}>{text}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        color: '#3657ff',
        textAlign: 'center'
    },

    buttonStyle: {
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 5
    }
});
export default ButtonSecondary;