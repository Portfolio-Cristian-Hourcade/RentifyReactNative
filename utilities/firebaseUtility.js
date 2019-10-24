import * as firebase from 'firebase';
import '@firebase/firestore';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export function initializeApp() {
    const firebaseConfig = {
        apiKey: "AIzaSyCLoF1mpKuhEzSgaxlhI1wpI74mq-KkB3M",
        authDomain: "belgica-d.firebaseapp.com",
        databaseURL: "https://belgica-d.firebaseio.com",
        projectId: "belgica-d",
        storageBucket: "belgica-d.appspot.com",
        messagingSenderId: "520684756316",
        appId: "1:520684756316:web:7f06f1deeeb5c0ea4fb599"
    };
    firebase.initializeApp(firebaseConfig);
}

// Example method
export function newRegistro() {
    const dbFirestore = firebase.firestore();
    dbFirestore.collection("characters").doc("mario").set({
        employment: "plumber",
        outfitColor: "red",
        specialAttack: "fireball"
    }).catch(error => { alert(error) });
}


// SingUp User
export function SingUp(email, password, name, navigator) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(e => {
            firebase.auth().onIdTokenChanged(function(user) {
                if (user) {
                    let userJson = {
                        uid: user.uid,
                        nombre: name,
                        token: '',
                        email: user.email
                    }

                    Permissions.getAsync(
                        Permissions.NOTIFICATIONS
                    ).then(e => alert("oka")).catch(e => { alert(e) });

                    Permissions.askAsync(Permissions.NOTIFICATIONS).then(e => alert("oka")).catch(e => { alert(e) });

                    Notifications.getExpoPushTokenAsync().then(e => {
                        let aux = e.split("ExponentPushToken[");
                        const token = aux[1].split("]");

                        if (token[0]) {
                            alert("buscando token");
                            userJson.token = e;
                            addClient(userJson);
                            navigator.navigate("Home")
                        } else {
                            alert("Algo ha fallado.");
                        }
                    });



                } else {
                    alert("Usuario no tiene token habilitado")
                }
            });
        }).catch(e => {
            alert(e + "");
            return e;
        });
}

// SingIp User
export function SingIn(email, password, props) {
    try {
        firebase.auth().signInWithEmailAndPassword(email, password);
        firebase.auth().onAuthStateChanged(user => {
            props.navigate("Home")
        })
    } catch (error) {
        alert("¡Ups! Hemos tenido un error al iniciar sesión. Por favor verificá que hayas escrito bien la contraseña y el email.");
    }
};


export function LogOut(props) {
    firebase.auth().signOut().then(function() {
        props.navigate("Login")
    }, function(error) {
        alert(error);
    });
};


export function VerifiyAuth(props) {
    firebase.auth().onIdTokenChanged(function(user) {
        if (user) {
            props.navigate("Home");
        } else {
            props.navigate("Login");
        }
    });
}

/** Add new client **/

export function addClient(client) {
    const dbFirestore = firebase.firestore();
    dbFirestore.collection("users").doc(client.uid).set({
        email: client.email,
        nombre: client.nombre,
        token: client.token,
        uid: client.uid
    }).catch(error => { alert(error) });
}