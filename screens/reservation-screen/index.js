import React, { Component } from 'react';
import { StyleSheet, Platform, Text, TextInput, View, TouchableOpacity, Image, ImageBackground, Button, ScrollView, StatusBar, AsyncStorage, TouchableHighlight, BackHandler } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { LinearGradient } from 'expo-linear-gradient';

export default class ReservationScreen extends Component<any> {
    state = {
        selectedStartDate: null,
        selectedEndDate: null,
        step: 1,
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            selectedEndDate: null,
            step: 1,
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date, type) {
        if (type === 'END_DATE') {
            this.setState({
                selectedEndDate: date,
            });
        } else {
            this.setState({
                selectedStartDate: date,
                selectedEndDate: null,
            });
        }
    }

    nextStep = (inicio: Date, fin: Date) => {
        inicio = new Date(inicio);
        fin = new Date(fin);
        console.log('Desde el: '+inicio.getFullYear() + '-'+(Number(inicio.getMonth())+1)+'-'+inicio.getDate() );
        console.log('Hasta el: '+fin.getFullYear() + '-'+fin.getMonth()+'-'+fin.getDate() );
    }

    render() {
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
                titleText = "1. ¡Seleccioná las fotos de tu propiedad!"
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

                <View>
                    <Text>SELECTED DATE:{startDate}</Text>
                </View>
                <TouchableOpacity onPress={() => {this.nextStep(startDate, endDate)}}>
                    <Text>Siguiente</Text>
                </TouchableOpacity>
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