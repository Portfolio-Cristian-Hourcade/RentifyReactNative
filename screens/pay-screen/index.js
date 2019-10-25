//This is an example code to generate QR code//
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Platform
} from 'react-native';
// import all basic components
import {default as QRCodeIOS} from 'react-native-qrcode-svg';
// import QRCode as QrIos from 'react-native-qrcode-svg';
import {default as QRCodeAndroid} from 'react-native-qrcode';

export default class PaymentScreen extends Component {
  constructor() {
    super();
    this.state = {
    
    };
  }

  render() {
    return (
      <View style={styles.MainContainer}>
          { (Platform.OS === 'ios') ? <QRCodeIOS
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
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});