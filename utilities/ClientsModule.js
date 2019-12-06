import * as firebase from 'firebase';
import '@firebase/firestore';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { Product } from '../models/Product';
import * as ImageManipulator from 'expo-image-manipulator';
import { AsyncStorage } from 'react-native';
import { Clients } from '../models/Clients';


class Imgupload {
    $key: number;
    name: string;
    url: string;
    file: File;

    constructor(file: File) {
        this.file = file;
    }
}

export async function getProducts() {
    const arrayProducts = [];

    const dbFirestore = firebase.firestore();
    var docRef = dbFirestore.collection('productos');

    return new Promise(resolve => {
        docRef.get().then((doc) => {

            if (doc.empty) {
                alert("Sin datos");
            } else {
                doc.docs.forEach((element) => {
                    let aux = element;
                    aux['$key'] = element.id;
                    arrayProducts.push(aux.data());
                });
            }
            resolve(arrayProducts);
        });
    });
    // console.log(arrayProducts);
    // return await Promise.all(async);

}

/** Clave autogenerada con firebase **/
export async function addClient(client: Clients) {
    const dbFirestore = firebase.firestore();
    dbFirestore.collection('clientes').doc(client.$key).set(client);
}

/** Tomar producto segun una key **/
export async function getClientsByKey(user, prop) {
        const dbFirestore = firebase.firestore();
        var docRef = dbFirestore.collection('clientes').doc(user.$key);
        docRef.get().then((doc) => {
            if (!doc.exists) {
                addClient(user);
            }
            AsyncStorage.setItem("Usuario", JSON.stringify(user));
            prop.navigation.navigate('Home');
        });
}


