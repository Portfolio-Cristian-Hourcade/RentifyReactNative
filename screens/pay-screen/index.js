//This is an example code to generate QR code//
import React, { Component } from 'react';
import StylesGlobal from '../../styles/styles';

import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Text,
    Platform
} from 'react-native';
// import all basic components
import { default as QRCodeIOS } from 'react-native-qrcode-svg';
// import QRCode as QrIos from 'react-native-qrcode-svg';
import { default as QRCodeAndroid } from 'react-native-qrcode';

export default class PaymentScreen extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        return (
            <View style={StylesGlobal.container}>
            <ScrollView>
                
                <View style={styles.headerTop}>
        
                <View style={{flex:0.2, justifyContent:'center', alignItems: 'center',alignSelf: 'center', }}>
                  <Image source={require('../../assets/payment.png')} style={styles.logo} />
                </View>
                <View style={{flex:0.8,paddingLeft:15,paddingRight:5}}>

                    <Text style={styles.titleText}>¡Pagar el servicio es super fácil!</Text>
                    <Text style={styles.bodyText}>Dale el código  que esta abajo al cajero para que pueda escanear y elegir el producto que estas comprando.</Text>

                </View>
                </View>
                <View style={styles.MainContainer}>

                    <View>

                        {(Platform.OS === 'ios') ? <QRCodeIOS
                            //QR code value 
                            value="hola mundo"
                            //size of QR Code
                            size={250}
                            //Color of the QR Code (Optional) 
                            color="black"
                            //Background Color of the QR Code (Optional)
                            backgroundColor="white"

                        />
                            :
                            <QRCodeAndroid
                                value='Hola mundo'
                                //Setting the value of QRCode
                                size={250}
                                //Size of QRCode
                                bgColor="#000"
                                //Backgroun Color of QRCode
                                fgColor="#fff"
                            //Front Color of QRCode
                            />
                        }

                    </View>
                    <Text style={{paddingTop:20,fontSize:20}}>
                        Código: ARS-R142DXXA-4242
                    </Text>

                </View>
            </ScrollView>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        paddingTop: 40,
    },
    TextInputStyle: {
        width: '100%',
        height: 40,
        marginTop: 20,
        borderWidth: 1,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        paddingTop: 8,
        marginTop: 10,
        paddingBottom: 8,
        backgroundColor: '#F44336',
        marginBottom: 20,
    },
    logo: {
        width: 60,
        height: 60,
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
    headerTop: {
        backgroundColor: '#3C7FFF',
        padding:25,
        elevation:999999,
        flex:1,
        flexDirection:'row'
    },
    titleText:{
        fontSize:22,
        fontWeight:"500",
        color:'white'
    },
    bodyText:{
        fontSize:16,
        paddingTop:5,
        color:'#eee'
    }
});