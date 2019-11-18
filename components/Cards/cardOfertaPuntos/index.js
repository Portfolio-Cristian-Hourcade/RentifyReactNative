import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';


export default class CardOfertasPuntos extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isShow: true,
        };
    }
    
    cangeNavigate(){
        this.props.url.navigation.navigate('Ofert');
    }
    
    render() {
        const data = (this.props.btnAction === 'Canjear puntos')?'../../../assets/tag.png':'../../../assets/payment.png';
        
        return (
            <View style={styles.card}>
                <View style={styles.row}>
                    <View style={styles.col6}> 
                    {
                        (this.props.btnAction === 'Canjear puntos')?
                        <Image source={require('../../../assets/tag.png')} style={styles.logo} />:
                        <Image source={require('../../../assets/payment.png')} style={styles.logo} />
                    }
                        
                    </View>
                    <View style={styles.pullTop}>
                        <View style={styles.w10}>
                            <Text style={styles.textStyle}>{(this.props.btnAction == 'Canjear puntos') ? 'Puntos' : 'Ofertas'}</Text>
                        </View>
                        <View style={styles.w10}>
                            <Text style={styles.textStylePoint}>0</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.w100}>
                    <TouchableOpacity style={styles.btnShare} onPress={() => this.cangeNavigate()}>
                        <Text style={styles.btnShareData}>{this.props.btnAction}</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        )
    }
};
 
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        height: 200,
        borderRadius: 12,
        borderColor: 'transparent',
        elevation: 5
    },
    textStyle: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold"
    },
    w10: {
        flex: 1
    },
    row: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,

    },
    logo: {
        width: 60,
        height: 60,
    },
    col6: {
        flex: 0.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    pullTop: {
        flex: 0.5,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    btnShare: {
        backgroundColor: "#3C7FFF",
        height: 40,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },
    btnShareData: {
        color: 'white'
    },
    share: {
        width: 20,
        height: 20,
    },
    w100: {
        position: 'relative',
        alignSelf: "stretch",
        justifyContent: "center"
    },
    textStylePoint: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold"
    }

});