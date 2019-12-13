import React, { Component } from 'react';
import { StyleSheet, Platform, Text, TextInput, View, TouchableOpacity, Image, ImageBackground, Button, ScrollView, StatusBar, AsyncStorage, TouchableHighlight, BackHandler } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { getClientsByKeyPantallaProducto } from '../../utilities/ClientsModule';
import { getProductsWithKey } from '../../utilities/ProductsModule';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class ReservationScreen extends Component<any> {
    state = {
        selectedStartDate: null,
        selectedEndDate: null,
        step: 1,
        estadiaInicio: null,
        estadiaFin: null,
        product: null,
        productUser: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            selectedEndDate: null,
            step: 1,
            estadiaInicio: null,
            estadiaFin: null,
            product: null,
            productUser: null,
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    async componentWillMount() {
        var data = await AsyncStorage.getItem('Selected');
        data = JSON.parse(data);

        //@ts-ignore
        getProductsWithKey(data.$key).then(e => {
            this.setState({ product: e });
            getClientsByKeyPantallaProducto(e.keyOwner).then(t => {
                this.setState({
                    productUser: t
                })
            });
        })
    }

    onDateChange(date, type) {
        if (type === 'END_DATE') {
            this.setState({
                selectedEndDate: date,
            });
            this.nextStep(this.state.selectedStartDate, this.state.selectedEndDate, type);

        } else {
            this.setState({
                selectedStartDate: date,
                selectedEndDate: null,
                estadiaInicio: null,
                estadiaFin: null
            });
        }

    }

    nextStep = (inicio: Date, fin: Date, type?) => {

        inicio = new Date(inicio);
        fin = new Date(fin);
        if (type === undefined) {
            this.setState(
                {
                    estadiaInicio: inicio.getFullYear() + '-' + (Number(inicio.getMonth()) + 1) + '-' + inicio.getDate(),
                    estadiaFin: fin.getFullYear() + '-' + (Number(fin.getMonth()) + 1) + '-' + fin.getDate(),
                    step: this.state.step + 1
                }
            );
        } else {
            this.setState(
                {
                    estadiaInicio: inicio.getFullYear() + '-' + (Number(inicio.getMonth()) + 1) + '-' + inicio.getDate(),
                    estadiaFin: fin.getFullYear() + '-' + (Number(fin.getMonth()) + 1) + '-' + fin.getDate(),
                }
            );
        }
    }

    render() {
        if (this.state.product === null) {
            return null;
        }
        const { selectedStartDate, selectedEndDate } = this.state;
        const minDate = new Date(); // Today
        const maxDate = new Date(2017, 6, 3);
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';

        const disableData = new Date(1900, 6, 3);
        let widthProgress;
        let titleText;
        let { step } = this.state;

        switch (step) {
            case 1:
                widthProgress = 40;
                titleText = "Seleccioná el rango de tu estadia"
                break;
            case 2:
                widthProgress = 140
                titleText = "2. Contanos un poco sobre tu propiedad"

                break;
            case 3:
                widthProgress = 230;
                titleText = "3. Precio y beneficios"
                break;
            case 4:
                widthProgress = 300;
                titleText = "4. ¡Felicitaciones!"
                break;
        }

        return (
            <View style={styles.container}>
                <View style={styles.bar}>
                    <View>
                        <Text style={styles.title}>{titleText}</Text>
                    </View>
                    <View style={{ position: 'relative', marginTop: 15 }}>
                        <View style={styles.barraProgresBg}></View>
                        {(step !== undefined) ?
                            < View style={{
                                width: widthProgress,
                                height: 15,
                                backgroundColor: '#ff5d5a',
                                borderRadius: 50,
                                elevation: 2,
                                position: 'absolute',
                                bottom: 0
                            }} >
                                <LinearGradient
                                    colors={['#ff5d5a', '#f0476d']}
                                    style={{ height: 15, alignItems: 'center', borderRadius: 5 }}
                                    start={[0, 0]}
                                    end={[1, 0]}>
                                </LinearGradient>
                            </ View>
                            :
                            null
                        }
                    </View>
                </View>
                <ScrollView>

                    {this.state.step === 1 ?
                        <View>
                            <View style={{
                                width: width - 30,
                                marginLeft: 15,
                                marginTop: 30
                            }}>

                                <CalendarPicker
                                    allowRangeSelection={true}
                                    selectedDayColor="#ff5d5a"
                                    months={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                                        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
                                    previousTitle="Anterior"
                                    nextTitle="Proximo"
                                    disabledDates={date => {
                                        return date.isBetween(disableData, new Date());
                                    }}
                                    disabledDatesTextStyle={{ color: "#eeeeee" }}
                                    selectedDayTextColor="#FFFFFF"
                                    onDateChange={this.onDateChange}
                                />

                            </View>
                            <TouchableOpacity style={{
                                width: width - 30,
                                marginLeft: 15,
                                height: 50,
                                backgroundColor: (this.state.estadiaInicio !== null && this.state.estadiaFin !== null) ? '#ff5d5a' : 'gray',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                disabled={(this.state.estadiaInicio === null && this.state.estadiaFin === null)}
                                onPress={() => { this.nextStep(startDate, endDate) }}>
                                <Text style={{ color: 'white', fontFamily: 'font2' }}>Siguiente</Text>
                            </TouchableOpacity>
                        </View>
                        : null}

                    {this.state.step === 2 ?
                        <View>
                            <View style={{
                                width: width - 30,
                                marginLeft: 15,
                                marginTop: 30,
                                flex: 1,
                                flexDirection: 'row'
                            }}>
                                <Image source={{ uri: this.state.product.images[0] }} style={{ flex: 0.4, height:85, resizeMode: 'cover', marginTop: 10, marginBottom: 10, }} />
                                <View style={{ flex:0.6,flexDirection: 'column' }}>
                                    <Text>{this.state.product.type}</Text>
                                    <Text>$ {this.state.product.price.toString()}</Text>
                                    <View>
                                        <Image source={require('../../assets/icons/favorites.png')} style={{ width: 20, height: 20, position: 'absolute', }} />
                                        <Text style={{ marginLeft: 30 }}>4.7 Puntuación ( 9 Reseñas )</Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity style={{
                                width: width - 30,
                                marginLeft: 15,
                                height: 50,
                                backgroundColor: (this.state.estadiaInicio !== null && this.state.estadiaFin !== null) ? '#ff5d5a' : 'gray',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                disabled={(this.state.estadiaInicio === null && this.state.estadiaFin === null)}
                                onPress={() => { this.nextStep(startDate, endDate) }}>
                                <Text style={{ color: 'white', fontFamily: 'font2' }}>Siguiente</Text>
                            </TouchableOpacity>
                        </View>
                        : null}

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 18,
        fontFamily: 'font2'
    },
    barraProgres: {
        // width: this.state.step,
        height: 15,
        backgroundColor: '#ff5d5a',
        borderRadius: 50,
        elevation: 2,
        position: 'relative',
        bottom: -15
    },
    barraProgresBg: {
        width: 300,
        height: 15,
        backgroundColor: '#F5F5F5',
        borderRadius: 50
    },
    bar: {
        backgroundColor: 'white',
        height: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        flexDirection: 'column',
        elevation: 14,
        justifyContent: 'center',
        alignItems: 'center',
    }
});