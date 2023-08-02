import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'


const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: 'pokedex-b867c.firebaseapp.com',
	projectId: 'pokedex-b867c',
	appId: '1:645646471530:web:5443097af8fc6b5c9d1513',
	measurementId: process.env.ANALYTICS_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
