import React from 'react'
import Auth from '../firebase/firebase'
import { Button } from 'react-bootstrap'

const Header: React.FC = () => {
  const logOUtHandler = (e: React.FormEvent) => {
    // prevent default
    e.preventDefault()

    Auth.signOut()
      .then(() => {
        console.log('sign out was successful')
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  return (
    <header className='header'>
      <h3>Hello Mr. Robert, here's your Dashboard</h3>
      <Button className='header--button' onClick={logOUtHandler}>
        Sign out
      </Button>
    </header>
  )
}

export default Header
