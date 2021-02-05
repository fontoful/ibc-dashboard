import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBnH95hW99VaFDKQ_hcmelm3zloe9UnMJA',
  authDomain: 'island-beer-club.firebaseapp.com',
  databaseURL: 'https://island-beer-club.firebaseio.com',
  projectId: 'island-beer-club',
  storageBucket: 'island-beer-club.appspot.com',
  messagingSenderId: '719727176349',
  appId: '1:719727176349:web:826cd3ba9dd64aec174274',
  measurementId: 'G-QBLEEEG5LC',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()

export default firebase.auth()
