import * as firebase from 'firebase';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCOvjaENHB-ylTmxAc1Rk1O_QeIe57nL_I",
    authDomain: "expo-demo-app.firebaseapp.com",
    databaseURL: "https://expo-demo-app.firebaseio.com",
    projectId: "expo-demo-app",
    storageBucket: "expo-demo-app.appspot.com",
    messagingSenderId: "679533746660",
    appId: "1:679533746660:web:a1aa2c4a96e75c5563cff1",
    measurementId: "G-KWXRFLCW9D"
};

// Initialize Firebase App

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const albumsCollection = db.collection("albuns");


export async function getAlbums() {
    const { docs } = await albumsCollection.get()

    return { albums: docs }
}

