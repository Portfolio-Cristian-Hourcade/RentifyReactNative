import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ImageBackground, Button } from 'react-native';
import CardLocal from '../../components/Cards/cardLocal';
import cardOfertaPuntos from '../../components/Cards/cardOfertaPuntos';
import CardOfertasPuntos from '../../components/Cards/cardOfertaPuntos';
import { LogOut } from '../../utilities/firebaseUtility';
export default class HomeScreen extends Component {
    
    logout(){
        LogOut(this.props.navigation);
    }

    render() {
        return (
            <View style={styles.bg}>

                <ImageBackground source={require('../../assets/bg-login.jpg')} style={styles.logo}>

                </ImageBackground>
                <View style={styles.container}>

                    <View style={styles.cardlocal}>
                        <CardLocal />
                    </View>
                    <View style={styles.contenedor}>
                        <View style={styles.row}>
                            <View style={styles.col6}>
                                <CardOfertasPuntos btnAction='Canjear puntos' />
                            </View>
                            <View style={styles.col6}>
                                <CardOfertasPuntos btnAction='Canjear ofertas' />
                            </View>
                        </View>
                        <Button title="Cerrar sesion" color="red" onPress={() => { this.logout() }}/>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        paddingLeft: 15,
        paddingRight: 15
    },
    logo: {
        height: 275,
        backgroundColor: "black",
        alignSelf: 'stretch',
        textAlign: 'center',
    },
    cardlocal: {
        position: 'relative',
        top: -50,
    },
    bg: {
        backgroundColor: "#eee",
        flex: 1
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    col6: {
        flex: 0.5,
        margin: 5
    },
    contenedor:{
        position:'relative',
        top:-25
    }
});