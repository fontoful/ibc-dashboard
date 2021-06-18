import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import firebase from 'firebase/app'
import { Auth } from './firebase/firebase'

//import styling
import './App.css'
import Dashboard from './components/Dashboard'

function App() {
  const [fbUser, setFbUser] = useState<firebase.User | null>(null)

  useEffect(() => {
    // define the function
    Auth.onAuthStateChanged(user => {
      setFbUser(user)
    })
  }, [])

  return <>{!!fbUser ? <Dashboard /> : <Login />}</>
}

export default App
