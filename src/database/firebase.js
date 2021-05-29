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

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return
    const userRef = db.doc(`users/${ user.uid }`)
    const snapshot = await userRef.get()
    if (!snapshot.exists) {
        const { email, username, photoURL } = user
        try {
            await userRef.set({
                username,
                email,
                photoURL,
                ...additionalData
            })
        } catch (e) {
            console.error('Error creating user document', e)
        }
    }
    return getUserDocument(user.uid)
}

const getUserDocument = async uid => {
    if (!uid) return null
    try {
        const userDocument = await db.doc(`users/${ uid }`).get()
        return {
            uid,
            ...userDocument.data()
        }
    } catch (e) {
        console.error('Error fetching user', e)
    }
}