import * as firebase from 'firebase';
import '@firebase/firestore';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { Product } from '../models/Product';
import * as ImageManipulator from 'expo-image-manipulator';
import { AsyncStorage } from 'react-native';


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
                    let aux = element.data();
                    aux.$key = element.id;
                    arrayProducts.push(aux);
                });
            }
            AsyncStorage.setItem("Product", JSON.stringify(arrayProducts));
            resolve(arrayProducts);
        });
    });
}


export async function getProductsWithKey(key) {

    const dbFirestore = firebase.firestore();
    var docRef = dbFirestore.collection('productos').doc(key);

    return new Promise(resolve => {
        docRef.get().then((doc) => {

            if (doc.empty) {
                alert("Sin datos");
            } else {

                let aux = doc.data();
                aux['$key'] = doc.id;
                resolve(aux);

            }
        });
    });
}


/** Clave autogenerada con firebase **/
export async function addProduct(product: Product) {

    var aux = 0;
    product.imagesTemp = product.imagesTemp.map(function (el) {
        var o = Object.assign({}, el);
        o.index = aux;
        aux++;
        return o;
    })

    var img = [];

    const pArray = product.imagesTemp.map(async element => {

        await uploadImages(element).then(data => {
            return img[element.index] = data;
        });

    });

    await Promise.all(pArray).then(e => {
        product.images = img;
        const dbFirestore = firebase.firestore();
        dbFirestore.collection('productos').add(product);
    });
    getProducts();
}

export async function updateProduct(product: Product, tempProduct?: any) {

    var aux = 0;

    var img = [];
    if (tempProduct !== undefined) {

        tempProduct.map(e => {
            console.log(e);
            firebase.storage().refFromURL(e).delete();
        })
    }

    const pArray = product.images.map(async (element) => {
        if (element.type !== undefined) {
            await uploadImages(element).then(data => {
                return img[element.index] = data;
            });
        } else if (element.uri !== undefined) {
            return img[element.index] = element.uri;
        }
    });


    await Promise.all(pArray).then(e => {
        product.images = img;
        const dbFirestore = firebase.firestore();
        dbFirestore.collection('productos').doc(product.$key).update(product);
    });
    getProducts();
}


async function uploadImages(element) {
    return new Promise(resolve => {

        var x = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        var file;
        ImageManipulator.manipulateAsync(
            element.uri,
            [{ resize: { width: 800 } }],
            { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG },
        ).catch(e => alert(e + ''))
            .then(data => {
                //@ts-ignore
                fetch(data.uri)
                    .then(res => res.blob())
                    .then(blob => {
                        file = blob
                        const storageRef = firebase.storage().ref();
                        const uploadTask = storageRef.child(`uploads/${x}`).put(file);
                        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                            (snapshot) => {
                                // in progress
                                // const snap = snapshot as firebase.storage.UploadTaskSnapshot;
                            },
                            (error) => {
                                // fail
                                alert(JSON.stringify(error));
                            },
                            () => {
                                // success
                                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                                    console.log("termino");
                                    resolve(downloadURL);
                                });
                            }
                        );
                    });
            });
    });

}


/** Tomar producto segun una key **/
export function getProductsByKey(key: string) {
    let auxProducts = {};

    const dbFirestore = firebase.firestore();
    var docRef = dbFirestore.collection('productos').doc(key)
    docRef.get().then((doc) => {
        return new Promise((resolve) => {
            if (doc.exists) {
                alert("Sin datos");
            } else {
                let aux = doc.data;
                aux['$key'] = doc.id;
                auxProducts = aux;
            }
            resolve(auxProducts);
        });
    }).catch((error) => {
        alert('Hemos tenido un error al obtener los datos')
    });
}


