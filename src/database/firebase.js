import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyCchdclFi3mcVEdn2WEEoQkvC5ZGPvmuMA',
    authDomain: 'pokedex-b867c.firebaseapp.com',
    projectId: 'pokedex-b867c',
    storageBucket: 'pokedex-b867c.appspot.com',
    messagingSenderId: '645646471530',
    appId: '1:645646471530:web:5443097af8fc6b5c9d1513',
    measurementId: 'G-CK004EXLZG'
}

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const db = firebase.firestore()