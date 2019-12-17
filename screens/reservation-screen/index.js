import React, { Component } from 'react';
import { StyleSheet, Platform, Text, TextInput, Switch, View, TouchableOpacity, Image, ImageBackground, Button, ScrollView, StatusBar, AsyncStorage, TouchableHighlight, BackHandler } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { getClientsByKeyPantallaProducto } from '../../utilities/ClientsModule';
import { getProductsWithKey, updateProduct } from '../../utilities/ProductsModule';

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
        switchValue: true,

    }

    _handleToggleSwitch = () =>
        this.setState(state => ({
            switchValue: !state.switchValue,
        }));
    constructor(props) {
        super(props);
        this.state = {
            switchValue: true,
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

    calculateDays = () => {
        var f = new Date();
        var fechaInicio = new Date(this.state.estadiaInicio).getTime();
        var fechaFin = new Date(this.state.estadiaFin).getTime();

        var diff = fechaFin - fechaInicio;
        return (diff / (1000 * 60 * 60 * 24)).toString();
    }

    payReservation = () => {
        //API MP
        if (this.state.product.dataReservation === null) {
            this.state.product.dataReservation = [];
        }
        this.state.product.dataReservation.push(this.state.estadiaInicio + '|' + this.state.estadiaFin);
        updateProduct(this.state.product);
    }

    render() {
        if (this.state.product === null) {
            return null;
        }
        const mesActual = new Date().getMonth();
        const diaActual = new Date().getDate();

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
                titleText = "Confirma tu reserva"

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
                                    minDate={1}
                                    months={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                                        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
                                    previousTitle="Anterior"
                                    nextTitle="Proximo"
                                    disabledDates={date => {

                                        const dateCalendario = new Date(date);
                                        if (this.state.product.dataReservation !== null) {
                                            let x = this.state.product.dataReservation.map(e => {
                                                let a = e.split('|');
                                                if (new Date(a[0]) <= dateCalendario && dateCalendario <= new Date(a[1])) {
                                                    return true;
                                                } else {
                                                    return false;
                                                }
                                            });
                                            
                                            let toReturn = false;
                                            x.map(c => {
                                                if(c){
                                                    toReturn = true;
                                                }
                                            })
                                            if (mesActual === dateCalendario.getMonth()) {
                                                if (diaActual > dateCalendario.getDate()) {
                                                    return true;
                                                } else {
                                                    return toReturn;
                                                }
                                            }
                                            if (mesActual > dateCalendario.getMonth()) {
                                                return true;
                                            } else {
                                                return toReturn;
                                            }
                                            // if (x.length === 1 && x[0] === true) {
                                            //     return true
                                            // }


                                        }
                                        
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
                        <View style={{ paddingBottom: 75 }}>
                            <View style={{
                                width: width - 30,
                                marginLeft: 15,
                                marginTop: 30,
                                flex: 1,
                                flexDirection: 'row'
                            }}>
                                <Image source={{ uri: this.state.product.images[0] }} style={{ flex: 0.4, height: 100, borderRadius: 8, resizeMode: 'cover', marginTop: 10, marginBottom: 10, }} />

                                <View style={{ flex: 0.6, flexDirection: 'column', paddingTop: 15 }}>

                                    <View style={{ justifyContent: 'center', alignItems: 'flex-end', }}>
                                        <Text style={{ fontFamily: 'font1', fontSize: 16, color: '#4d4d4d', textAlign: 'right', paddingLeft: 10 }}>{this.state.product.name}</Text>
                                    </View>

                                    <View style={{ justifyContent: 'center', alignItems: 'flex-end', }}>
                                        <Text style={{ fontFamily: 'font2', fontSize: 22 }}>$ {this.state.product.price.toString()}<Text style={{ fontSize: 16, fontFamily: 'font1' }}>/ Noche</Text></Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <Text style={{}}>4.7 Puntuación</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#eee', marginTop: 10, marginBottom: 10 }} />

                            <View style={{ marginLeft: 15, marginRight: 15 }}>
                                <Text style={{ fontFamily: 'font2', fontSize: 20 }}>Fechas de la estadia</Text>
                                <Text style={{ marginBottom: 15 }}>{this.state.estadiaInicio} hasta el {this.state.estadiaFin}</Text>
                                <View style={{ flexDirection: 'row', paddingTop: 15, paddingBottom: 15 }}>
                                    <Text style={{ flex: 0.6 }}>Servicios de limpieza</Text>
                                    <Text style={{ flex: 0.4, textAlign: 'right' }}>$130</Text>
                                </View>

                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#eee', marginTop: 3, marginBottom: 3 }} />

                                <View style={{ flexDirection: 'row', paddingTop: 15, paddingBottom: 15 }}>
                                    <Text style={{ flex: 0.6 }}>${this.state.product.price} x {this.calculateDays()} noches</Text>
                                    <Text style={{ flex: 0.4, textAlign: 'right' }}>${Number(this.state.product.price) * Number(this.calculateDays())}</Text>
                                </View>

                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#eee', marginTop: 3, marginBottom: 3 }} />

                                <View style={{ flexDirection: 'row', paddingTop: 15, paddingBottom: 15 }}>
                                    <Text style={{ flex: 0.6 }}>Seña con devolución</Text>
                                    <Text style={{ flex: 0.4, textAlign: 'right' }}>$2000</Text>
                                </View>

                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#eee', marginTop: 3, marginBottom: 3 }} />

                                <View style={{ flexDirection: 'row', paddingTop: 15, paddingBottom: 15 }}>
                                    <Text style={{ flex: 0.6, fontFamily: 'font2' }}>Total de tu estadia</Text>
                                    <Text style={{ flex: 0.4, fontFamily: 'font2', textAlign: 'right' }}>${Number(this.state.product.price) * Number(this.calculateDays()) + 2000 + 130}</Text>
                                </View>
                            </View>

                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#eee', marginTop: 5, marginBottom: 10 }} />

                            <View style={{ marginLeft: 15, marginRight: 15, marginTop: 15 }}>
                                <Text style={{ fontFamily: 'font2', fontSize: 20 }}>Politica de reservación</Text>
                                <Text>
                                    Cuando hagas la reserva, el propietario debe confirmarla dentro de las 48hs.
                                     Si el propietario cancela la reservación se le penalizará según nuestras politicas
                                     de cancelación y te devolveremos tu dinero. <Text style={{ fontFamily: 'font2', fontSize: 16 }}> ¡Tu reserva esta protegida!</Text></Text>
                            </View>
                        </View>
                        : null}

                </ScrollView>
                {
                    this.state.step === 2 ?
                        <View style={{
                            backgroundColor: 'white', position: 'absolute',
                            left: 0,
                            width: width,
                            height: 75,
                            bottom: 0,
                        }}>

                            <TouchableOpacity style={{
                                width: width - 30,
                                marginTop: 30,
                                height: 50,
                                borderRadius: 5,
                                position: 'absolute',
                                left: 15,
                                bottom: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: (this.state.estadiaInicio !== null && this.state.estadiaFin !== null) ? '#ff5d5a' : 'gray',
                            }}
                                disabled={(this.state.estadiaInicio === null && this.state.estadiaFin === null)}
                                onPress={() => { this.payReservation() }}>
                                <Text style={{ color: 'white', fontFamily: 'font2' }} >Pagar Reserva</Text>
                            </TouchableOpacity>
                        </View>
                        : null
                }

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