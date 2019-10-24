import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

const CardLocal = (props) => {
    // const { text, onPress} = props;

    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <View style={styles.col3}>
                    <Image source={require("../../../assets/burger.png")} style={styles.logo} />
                </View>
                <View style={styles.col6}>
                    <Text style={styles.textStyle}>Belgica Cervecería</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.btnShare}>
                    <Image source={require("../../../assets/share.png")} style={styles.share} />

                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        height: 100,
        borderRadius: 12,
        borderColor:'transparent',
        padding: 10,
        elevation: 5
    },
    textStyle: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold"
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    logo: {
        width: 60,
        height: 60,
    },
    col6: {
        flex: 0.8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    col3: {
        flex: 0.2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    btnShare:{
        backgroundColor:"#3C7FFF",
        flex:1,
        position:"absolute",
        right:-10,
        borderTopRightRadius:12,
        borderBottomRightRadius:12,
        borderColor:"transparent",
        top:-10.5,
        height:100.5,
        width:50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    share:{
        width:20,
        height:20,
    }

});
export default CardLocal;