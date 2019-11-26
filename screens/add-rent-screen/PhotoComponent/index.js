import React, { Component } from 'react';
import { StyleSheet, Image, StatusBar, View, Platform, Text, Button, TouchableOpacity, CameraRoll, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { number } from 'prop-types';
import AddRentScreen from '../index';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width

export default class PhotoComponent extends Component<any>{

    constructor(props) {
        super(props);
    }

    state = {
        isSelected: false,
        number: 1,
    }


    selectImage = () => {

        if (this.state.isSelected) {

            let aux = 0;
            let indexDelete;

            this.props.saves.splice(this.props.saves.findIndex(e => e.uri === this.props.image.uri), 1);
        } else {
            this.props.saves.push(this.props.image);
        }
        this.setState({ number: this.props.saves.length, isSelected: !this.state.isSelected });
        this.props.handler();

    }

    componentDidMount() {
        this.verifySelected();
    }

    componentDidUpdate(props) {

        let aux = 1;
        this.props.saves.map(element => {
            if (element === this.props.image) {
                if (aux !== this.state.number) {
                    this.setState({ isSelected: true, number: aux })
                }
            }
            aux++;
        });

    }


    verifySelected = () => {
        let aux = 0;
        this.props.saves.map(element => {
            if (element === this.props.image) {
                this.setState({ isSelected: true, number: aux })
            }
            aux++;
        });
    }

    render() {
        return (
            <TouchableOpacity style={{ position: 'relative' }} onPress={() => this.selectImage()}>
                {(this.state.isSelected) ?
                    <View style={{ width: 20, height: 20, backgroundColor: '#ff5d5a', borderRadius: 50, position: 'absolute', elevation: 10, top: 4, left: 4 }}>
                        <Text style={{ color: 'white', position: 'relative', top: 2, left: 6 }}>
                            {this.state.number}
                        </Text>
                    </View>
                    : <View />}
                <Image source={this.props.image} style={{ margin: 2, height: (width - 30) / 4 - 4, width: (width - 30) / 4 - 4 }} />
            </TouchableOpacity>
        );
    }
}