import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Button, ScrollView } from 'react-native';

import { LogOut } from '../../utilities/FirebaseModule';
import StylesGlobal from '../../styles/styles';


export default class OfertScreen extends Component {



    logout() {
        LogOut(this.props.navigation);
    }

    

    render(props) {
        return (
            <View style={StylesGlobal.container}>
                <View style={styles.header}>
                    <Text>Volver</Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({

    header: {
        height: 50,
        backgroundColor: "white",
        elevation:9,
        width:null,

    },
   
});