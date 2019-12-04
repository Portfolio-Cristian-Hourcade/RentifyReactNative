import React, { Component } from 'react';
import { StyleSheet, Platform, Text, TextInput, View, TouchableOpacity, Image, ImageBackground, Button, ScrollView, StatusBar, AsyncStorage } from 'react-native';
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var he = Dimensions.get('window').height; //full width

const DialogMatch = () => {
    return (
        <View style={{ position: 'absolute', left: 0, top: 0, width: width, height: he, backgroundColor: '#0000005c', elevation: 90 }}>
            <View style={{ width: width - 80, position: 'relative', left: 40, top: he / 4, backgroundColor: 'white', minHeight: 200, padding: 15, borderRadius: 8 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ fontFamily: 'font2', fontSize: 26 }}>
                        ¡Increible!
                </Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom:30, paddingTop:10 }}>
                    <Text style={{ fontFamily: 'font1', fontSize: 17, textAlign:'center'}}>
                        Ya hay 9 personas que estan buscando compañero de cuarto en esta propiedad.
                    </Text>
                </View>

                <View style={{ position: 'absolute', bottom: 15, left: 15 }}>
                    <TouchableOpacity style={{ width: (width - 80) - 30, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4b96f3' }}>
                        <Text style={{ color: 'white', fontFamily: 'font1' }}>Ver Compañeros</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default DialogMatch;