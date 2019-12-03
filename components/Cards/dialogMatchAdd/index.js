import React, { Component } from 'react';
import { StyleSheet, Platform, Text, TextInput, View, TouchableOpacity, Image, ImageBackground, Button, ScrollView, StatusBar, AsyncStorage } from 'react-native';
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var he = Dimensions.get('window').height; //full width

const DialogMatchAdd = (props) => {
    console.log(props)
    return (
        <View style={{ position: 'absolute', left: 0, top: 0, width: width, height: he, backgroundColor: '#0000005c', elevation: 9 }}>
            <View style={{ width: width - 80, position: 'relative', left: 40, top: he / 4, backgroundColor: 'white', minHeight: 200, padding: 15, borderRadius: 8 }}>

                <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 30, paddingTop: 10 }}>
                    <Text style={{ fontFamily: 'font1', fontSize: 17, textAlign: 'center', marginBottom: 10 }}>
                        ¿Querés buscar un compañero de cuarto para este alquiler?
                    </Text>
                    <TextInput style={{
                        height: 50,
                        width: (width - 80) - 30,
                        padding: 15,
                        marginBottom: 15,
                        textAlign: 'center',
                        backgroundColor: '#eee',
                        borderRadius: 5,
                    }} placeholderTextColor="#000000" placeholder="¿Cuantos días querés alquilar?" keyboardType='phone-pad' onChangeText={() => { }} />

                </View>

                <View style={{ position: 'absolute', bottom: 15, left: 15 }}>
                    <TouchableOpacity
                    onPress={() => {}}
                    style={{ width: (width - 80) - 30, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4b96f3' }}>
                        <Text style={{ color: 'white', fontFamily: 'font1' }}>¡Si! buscar compañeros</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default DialogMatchAdd;