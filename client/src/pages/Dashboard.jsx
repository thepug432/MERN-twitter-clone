import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
    <div>
      <Navbar />
      
    </div>
  )
}

export default Dashboard