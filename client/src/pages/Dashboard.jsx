import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {store} from '../app/store'
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
        <div className='flex flex-col w-1/2'>
        asdasdsadasd
        </div>
    </Wrapper>
  )
}

export default Dashboard