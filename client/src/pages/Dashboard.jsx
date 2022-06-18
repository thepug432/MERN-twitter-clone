import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {store} from '../app/store'
import Navbar from '../components/Navbar';

function Dashboard() {
  const navigate = useNavigate()

  // check if user is logged in
  useEffect(() => {
    if(!store.getState().auth.user){
      navigate('/login')
    }
  }, [navigate])

  

  return (
    <div className='flex sm:flex-row flex-col'>
      <Navbar />
      Lorem25
    </div>
  )
}

export default Dashboard