import React, { Component } from 'react';
import { StyleSheet, Platform, Text, View, TextInput, Image, ImageBackground, TouchableOpacity, StatusBar, Alert, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import StylesGlobal from '../../styles/styles';
import * as Font from "expo-font";
import { Dimensions } from "react-native";

// import { GoogleSignIn } from 'expo-google-sign-in';
import * as GoogleSignIn from 'expo-google-sign-in';
// import * as Expo from 'expo';
// import { Google } from 'expo';
import * as Google from 'expo-google-app-auth';
import { Constants } from 'expo-constants';
import { addClient, getClientsByKey } from '../../utilities/ClientsModule';
import * as Facebook from 'expo-facebook';

// import Expo from "expo"

// import { GoogleSignIn } from 'expo';
var width = Dimensions.get('window').width; //full width

export default class LoginScreen extends Component<any> {
    state = {
        fontsLoaded: false,
        isLogin: true,
        user: {
            email: '',
            name: '',
            password: ''
        }
    };


    singUp = () => {
        // if (this.state.user.password.length < 6) {
        //     alert("Por favor, escribí una contraseña de más de 6 caracteres.");
        // } else if (this.state.user.name.length < 2) {
        //     alert("¡Upps! No te olvides de escribir tu nombre.");
        // } else if (this.state.user.email.length < 4) {
        //     alert("¡Uppps! Necesitas escribir tu email para poder iniciar sesión en un futuro.");

        // } else {
        //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //     if (re.test(String(this.state.user.email).toLowerCase())) {
        //         try {
        //             SingUp(this.state.user.email, this.state.user.password, this.state.user.name, this.props.navigation);

        //         } catch (err) {
        //             alert(err);
        //         }
        //     } else {
        //         alert('Ingresaste un email invalido, por favor ingresá uno válido');
        //     }
        // }
    };

    fb = async () => {
        try {

            //@ts-ignore
            const {
                type,
                token,
                expires,
            } = await Facebook.logInWithReadPermissionsAsync("547933809388148", {
            });

            if (type === "success") {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(
                    `https://graph.facebook.com/me?access_token=${token}`
                );
                    // console.log(await response.json());
                    
                    await response.json().then(async (e) => {
                        e.id = 'f'+e.id;
                        e.$key = e.id;
                        // user.id = 'f'+user.id;  
                        await getClientsByKey(e,this.props);
                    })

                //  Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
                //  await getClientsByKey(user, this.props).then(e => { });


            } else {
                alert(`Facebook Login Error: Cancelled`);
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }
    singIn = async () => {
        /**
         * 
         * Desarrollo
         * 
         * android: 998862870360-l50asqfdscqsd9n9ngvq7n86is0or28p.apps.googleusercontent.com
         * ios: 998862870360-aea2odi5navb7ku1ihjv26epip4ep6d1.apps.googleusercontent.com
         *
         * Produccion
         * 
         * android:
         * ios:
         * 
         */

        // Desarrollo config
        // @ts-ignore
        const { type, accessToken, user } = await Google.logInAsync({
            clientId: (Platform.OS === 'ios') ? '998862870360-aea2odi5navb7ku1ihjv26epip4ep6d1.apps.googleusercontent.com' : '998862870360-l50asqfdscqsd9n9ngvq7n86is0or28p.apps.googleusercontent.com',
            scopes: ["profile", "email"]
        });
        if (type === 'success') {
            user['$key'] = 'g'+user.id;
            await getClientsByKey(user, this.props).then(e => { });

        }
    }

    responseGoogle = (response) => {
        console.log(response);
    }


    async componentDidMount() {
        await Font.loadAsync({
            font1: require("../../assets/fonts/Poppins-Regular.ttf"),
            font2: require("../../assets/fonts/Poppins-Bold.ttf"),
            font3: require("../../assets/fonts/Poppins-Medium.ttf"),

        });
        const result = await AsyncStorage.getItem("Usuario");
        
        if(result !== null){
            this.props.navigation.navigate("Home");
        }

        this.setState({ fontsLoaded: true });
    }

    render() {
        if (this.state.fontsLoaded) {
            return (
                <View style={styles.container}>

                    <ImageBackground source={require('../../assets/bg_app.jpg')} style={styles.backgroundImage} />

                    <View style={styles.containerData}>
                        <View style={StylesGlobal.container}>
                            <View style={styles.contTitle}>
                                <Image source={require('../../assets/logo.png')}
                                    style={{ width: 130, height: 130, paddingTop: 20, alignSelf: 'center' }} />
                                <Text style={styles.title}>¡Bienvenido a Rentify! </Text>
                                <Text style={styles.hash}>#SomosRentify</Text>
                            </View>

                        </View>

                    </View>

                    <View style={styles.btnPosition}>
                        <View style={styles.rowAll}>

                            <TouchableOpacity style={styles.btnGoogle} onPress={() => this.singIn()}>
                                <Image source={require('../../assets/gg.png')} style={styles.logoPos} />
                                <Text style={styles.btnGoogleTxt}>Iniciar Sesión</Text>

                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowAll}>
                            <TouchableOpacity style={styles.btnFB} onPress={() => this.fb()}>
                                <Image source={require('../../assets/ff.png')} style={styles.logoPosff} />
                                <Text style={styles.btnFBTxt}>Iniciar Sesion</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View>
                    <Text>Cargando...</Text>
                </View>
            );
        }

    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    containerData: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
    },
    rowAll: {
        flex: 1
    },
    logoPos: {
        position: 'absolute',
        left: 15,
        width: 40,
        height: 40,
    },
    logoPosff: {
        position: 'absolute',
        left: 7,
        width: 50,
        height: 50,
    },
    title: {
        fontFamily: 'font2',
        fontSize: 32,
        color: 'white',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    hash: {
        fontFamily: 'font2',
        fontSize: 42,
        color: 'white',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        marginTop: 15
    },
    contTitle: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        textAlign: 'center',
    },
    btnPosition: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'column',
        width: width,
        bottom: 15
    },
    btnGoogle: {
        backgroundColor: 'white',
        borderRadius: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
        elevation: 15,
        height: 60,
    },
    btnGoogleTxt: {
        fontSize: 22,
        fontFamily: 'font2',
        marginTop: 5

    },
    btnFB: {
        backgroundColor: '#2D5BC1',
        borderRadius: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
        elevation: 15,
        height: 60,
        marginTop: 30,
        marginBottom: 30
    },
    btnFBTxt: {
        fontSize: 22,
        fontFamily: 'font2',
        color: 'white',
        marginTop: 5
    }
}); 