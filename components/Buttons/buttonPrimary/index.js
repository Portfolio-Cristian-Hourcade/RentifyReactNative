import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const ButtonPrimary = (props) => {
    const { text, onPress} = props;

    return(
        <TouchableOpacity style={styles.buttonStyle} onPress={() => onPress()}>
            <Text style={styles.textStyle}>{text}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize:20,
        color: '#fff',
        textAlign: 'center'
      },
      
      buttonStyle: {
        padding:10,
        backgroundColor: '#3657ff',
        borderRadius:5
      }
});
export default ButtonPrimary;