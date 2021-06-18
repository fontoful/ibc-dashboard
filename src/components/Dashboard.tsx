import React, { useState, useEffect } from 'react'

//libraries
import { Button, Card, Container } from 'react-bootstrap'
import Swal from 'sweetalert2'

// firebase
import firebase, { db } from '../firebase/firebase'

//assets (images)
import user_add from '../assets/user_add.svg'

//components import
import Header from './Header'
import { getUrl } from '../helpers/helper'
import { ProfilesType } from '../types/types'

const Dashboard = () => {
  const [profiles, setProfiles] = useState<ProfilesType[]>([])

  useEffect(() => {
    const getDBData = async (): Promise<void> => {
      const docSnap = await db
        .collection('user-test-data')
        .where('is_member', '==', false)
        .get()
      const profiles  = docSnap.docs.map(doc => ({...doc.data(), id: doc.id})) as ProfilesType[]

      // setting the profiles upon fetching them
      setProfiles(profiles)
    }

    getDBData()
  }, [])

  // Function to flip/accept a user
  const isApprovedFlipper = (profile: ProfilesType) => (
    e: React.MouseEvent<HTMLElement>,
  ): void => {
    db.collection('user-test-data')
      .doc(profile.id)
      .set({ ...profile, is_member: true })
      .then(() =>
        Swal.fire({
          icon: 'success',
          title: 'User has been approved',
          text: 'This user will be marked as accepted in the Database',
        }),
      )
      .catch(err => console.log(err.message))
  }

  // Function to handle the onChange event for the file input
  const onChangeHandler = async (e: any): Promise<void> => {
    const file = e.target.files[0]
    const storageRef = firebase.storage().ref()
    const fileRef = storageRef.child(`resources/${file.name}`)
    await fileRef.put(file)
    console.log('file was uploaded')
  }

  console.log(profiles)

  return (
    <>
      <Header />
      <Container>
        <h1>These are the users that want to become part of IBC</h1>
        <div className='grid-container'>
          {profiles.map((prof: ProfilesType, idx: number) => (
            <Card key={idx} className='mx-auto'>
              {prof.img ? (
                <Card.Img variant='top' src={getUrl(prof.img)} />
              ) : (
                <Card.Img variant='top' src={user_add} />
              )}
              <Card.Header>IBC Applicant</Card.Header>
              <Card.Body>
                <Card.Title>My name is {prof.name}</Card.Title>

                <Button onClick={isApprovedFlipper(prof)}>Flip me</Button>
                <input onChange={onChangeHandler} style={{display: 'block', marginTop: '1rem'}} type="file"/>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </>
  )
}

export default Dashboard
