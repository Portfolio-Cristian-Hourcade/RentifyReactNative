import React, { Component } from 'react';
import { StyleSheet, Platform, Text, TextInput, View, TouchableOpacity, Image, ImageBackground, Button, ScrollView, StatusBar, AsyncStorage, TouchableHighlight, BackHandler } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default class ReservationScreen extends Component {

    state = {
        selectedStartDate: null,
        selectedEndDate: null,
    };

    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        // await Calendar.requestPermissionsAsync();
        // if (status === 'granted') {
        //     const calendars = await Calendar.getCalendarsAsync();
        //     console.log({ calendars });
        // }
    }


    onDateChange = (date, type) => {
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

    render() {
        const { selectedStartDate, selectedEndDate } = this.state;
        const minDate = new Date(); // Today
        const maxDate = new Date(2017, 6, 3);
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';
        return (
            <View style={styles.container}>
                <CalendarPicker
                    startFromMonday={true}
                    allowRangeSelection={true}
                    minDate={minDate}
                    maxDate={maxDate}
                    todayBackgroundColor="#f2e6ff"
                    selectedDayColor="#7300e6"
                    selectedDayTextColor="#FFFFFF"
                    onDateChange={this.onDateChange}
                />

                <View>
                    <Text>SELECTED START DATE:{startDate}</Text>
                    <Text>SELECTED END DATE:{endDate}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 100,
    },
});