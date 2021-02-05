import React, { useState } from 'react'
import Auth from '../firebase/firebase'
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from 'react-bootstrap'

// interface LoginType {
//   setFbUser: (arg: any) => void
// }

const Login: React.FC = () => {
  const [inputUser, setInputUser] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const submitHandler = (e: React.FormEvent) => {
    // prevent default
    e.preventDefault()

    // clear inputs (errors)
    setEmailError('')
    setPasswordError('')

    Auth.signInWithEmailAndPassword(inputUser, passwordInput).catch(err => {
      switch (err.code) {
        case 'auth/invalid-email':
        case 'auth/user-disabled':
        case 'auth/user-not-found':
          setEmailError(err.message)
          break
        case 'auth/wrong-password':
          setPasswordError(err.message)
          break
      }
    })
  }

  return (
    <div className='login-page'>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId='email'>
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type='email'
            value={inputUser}
            onChange={e => setInputUser(e.target.value)}
          />
          <p style={{ color: 'red' }}>{emailError}</p>
        </FormGroup>
        <FormGroup>
          <FormLabel>Password</FormLabel>
          <FormControl
            type='password'
            value={passwordInput}
            onChange={e => setPasswordInput(e.target.value)}
          />
        </FormGroup>
        <p style={{ color: 'red' }}>{passwordError}</p>
        <Button block type='submit'>
          Login
        </Button>
      </Form>
    </div>
  )
}

export default Login
