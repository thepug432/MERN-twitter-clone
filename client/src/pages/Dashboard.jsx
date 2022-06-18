import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {store} from '../app/store'
import Post from '../components/Post';
import Wrapper from '../components/Wrapper';

function Dashboard() {
  const navigate = useNavigate()

  // check if user is logged in
  useEffect(() => {
    if(!store.getState().auth.user){
      navigate('/login')
    }
  }, [navigate])

  

  return (
    <Wrapper>
        <div className='flex flex-col w-2/4'>
        
          

        </div>
    </Wrapper>
  )
}

export default Dashboard