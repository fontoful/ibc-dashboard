import React, { useState, useEffect } from 'react'

//libraries
import { Button, Card, Container } from 'react-bootstrap'
import { db } from '../firebase/firebase'
import Swal from 'sweetalert2'

//assets (images)
import user_add from '../assets/user_add.svg'

//components import
import Header from './Header'
import { getUrl } from '../helpers/helper'

const Dashboard = () => {
  const [profiles, setProfiles] = useState<any[]>([])

  useEffect(() => {
    const getDBData = async () => {
      const docSnap = await db
        .collection('profilesTest')
        .where('is_member', '==', false)
        .get()
      const profiles = docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      // setting the profiles upon fetching them
      setProfiles(profiles)
    }

    getDBData()
  }, [])

  const isApprovedFlipper = (profile: any) => (
    e: React.MouseEvent<HTMLElement>,
  ) => {
    db.collection('profilesTest')
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

  return (
    <>
      <Header />
      <Container>
        <h1>These are the users that want to become part of IBC</h1>
        <div className='grid-container'>
          {profiles.map((prof, idx) => (
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
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </>
  )
}

export default Dashboard
