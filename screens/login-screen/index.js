import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import StylesGlobal from '../../styles/styles';
import * as Font from "expo-font";
import ButtonPrimary from '../../components/Buttons/buttonPrimary';
import ButtonSecondary from '../../components/Buttons/buttonSecondary';
import { SingIn, SingUp} from '../../utilities/FirebaseModule';


export default class LoginScreen extends Component {
    state = {
        fontsLoaded: false,
        isLogin: true,
        user:{
            email:'',
            name:'',
            password:''
        }
    };

    // componentWillMount() {
        // const resetAction = StackActions.reset({
        //     index: 0, 
        //     actions: [NavigationActions.navigate({ routeName: 'Login' })],
        // });
        // this.props.navigation.dispatch(resetAction);
    // }

    singUp = () => {
        if(this.state.user.password.length < 6) {
            alert("Por favor, escribí una contraseña de más de 6 caracteres.");
        }else if(this.state.user.name.length < 2){
            alert("¡Upps! No te olvides de escribir tu nombre.");
        }else if(this.state.user.email < 4){
            alert("¡Uppps! Necesitas escribir tu email para poder iniciar sesión en un futuro.");
            
        }else{
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(String(this.state.user.email).toLowerCase())){
                try{
                  SingUp(this.state.user.email,this.state.user.password, this.state.user.name, this.props.navigation);

                } catch(err) {
                    alert(err);
                }
            }else{
                alert('Ingresaste un email invalido, por favor ingresá uno válido');   
            }
        }
    };

    singIn = () => {
        if(this.state.user.email.length < 4){
            alert("¡Upps! Ingresaste un email invalido, por favor verificá que lo hayas escrito bien");
        }else{
            if(re.test(String(this.state.user.email).toLowerCase())){
                if(this.state.user.password < 6){
                    alert("¡Upps! La contraseña ingresada es incorrecta");
                }else{
                    SingIn(this.state.user.email,this.state.user.password,this.props.navigation);
                }
            }else{
            alert("¡Upps! Ingresaste un email invalido, por favor verificá que lo hayas escrito bien");

            }
        }
    }


    async componentDidMount() {
        await Font.loadAsync({
            font1: require("../../assets/fonts/SourceSansPro-Regular.ttf"),
        });
        this.setState({ fontsLoaded: true });
    }

    render() {
        if (this.state.fontsLoaded) {
            return (
                <View style={StylesGlobal.container}>
                    <View style={styles.viewTitle}>
                        <Image source={require('../../assets/burger.png')} style={styles.logo} />
                        <Text style={styles.title}>¡Bienvenido a Belgica App! </Text>
                    </View>
                    <View style={styles.viewInputs}>
                        
                        {
                            (!this.state.isLogin) ? <TextInput style={styles.Input} placeholder="Escribí tu nombre" value={this.state.user.name} onChangeText={text => this.setState({ user:{name:text, email:this.state.user.email, password:this.state.user.password} })}/> : null
                        }
                        
                        <TextInput style={styles.Input} placeholder="Escribí tu email" value={this.state.user.email} onChangeText={text => this.setState({ user:{email:text,name:this.state.user.name, password:this.state.user.password} })} />

                        <TextInput style={styles.Input} placeholder="Escribí tu contraseña" secureTextEntry={true} value={this.state.user.password} onChangeText={text => this.setState({ user:{password:text,email:this.state.user.email, name:this.state.user.name} })}/>
                        
                        <View style={styles.btnDistance}>
                            {
                                (this.state.isLogin) ? <ButtonPrimary text="Iniciar sesión" onPress={() => alert("Iniciando sesion")} /> : <ButtonPrimary text=" Registrate" onPress={() => this.singUp(this.state.user)} />
                            }
                        </View>

                        <View style={styles.btnDistance}>
                            {
                                (this.state.isLogin) ? <ButtonSecondary text="Registrate" onPress={() => this.setState({ isLogin: false })} /> : <ButtonSecondary text="Iniciar Sesion" onPress={() => this.setState({ isLogin: true })} />
                            }
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
    viewInputs: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 30
    },
    logo: {
        width: 60,
        height: 60,
        alignSelf: "center",
        marginBottom: 20
    },
    Input: {

        fontFamily: "font1",
        fontSize: 18,
        margin: 20,
        marginBottom: 0,
        height: 45,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
    },

    viewTitle: {
        marginTop: 125,

    },
    title: {
        fontSize: 24,
        textAlign: "center",
        fontFamily: "font1"
    },
    btnDistance: {
        paddingTop: 15,
        marginBottom: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    splash: {
        flex: 1,
        resizeMode: 'cover',
    }

}); 