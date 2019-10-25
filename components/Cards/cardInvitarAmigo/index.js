import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

const CardInvitarAmigo = (props) => {
    // const { text, onPress} = props;

    return (
        <View style={styles.card}>
            <View style={styles.column}>
                <View style={styles.col12, styles.centerTop}>
                    <Image source={require("../../../assets/burger.png")} style={styles.icono} />
                </View>
                <View style={styles.col12, styles.centerTop, styles.mTop}>
                    <Text style={styles.textWeight}>¡Referí a un amigo y ganá!</Text>
                    <Text >Si tu amigo se une ganas puntos ¡Aprovechalo!</Text>
                </View>


            </View> 
            <View>
                <TouchableOpacity style={styles.btnToAction}>
                    <Text style={styles.textButton}>Invitar a un amigo</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        height: 180,
        borderRadius: 12,
        borderColor: 'transparent',
        marginTop:20,
        elevation: 5,
        flex: 1
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,

    },
    icono: {
        width: 60,
        height: 60,
    },
    col12: {
        flex: 1,
        backgroundColor: 'violet' 
    },
    centerTop: {
        alignItems: "center",
        justifyContent: "center",
    },
    btnToAction: {
        backgroundColor: "#3C7FFF",
        padding: -8,
        borderBottomLeftRadius:12,
        borderBottomRightRadius:12,
        height:40,
        color:'white',
        alignItems: "center",
        justifyContent: "center",
    },
    textButton:{
        color:'white'
    },
    mTop:{
        marginTop:10,
        alignItems: "center",
        justifyContent: "center",
    },
    textWeight:{
        fontWeight:'bold'
    }

});
export default CardInvitarAmigo;