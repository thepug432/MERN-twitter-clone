import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom'
import {store} from '../app/store'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)


  useEffect(() => {
    if(!store.getState().auth.user){
      navigate('/login')
    }
  }, [navigate])

  const logoutFunc = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <div>
      {user ?
        <button onClick={logoutFunc}>
          logout
        </button>
        :
        <Link to={'/login'}>Login</Link>
      }
    </div>
  )
}

export default Dashboard