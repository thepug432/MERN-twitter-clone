import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
import AuthBack from '../static/images/auth-back.jpg'
import {BiLogIn} from 'react-icons/bi'
import {motion} from 'framer-motion'
import { login, reset } from '../features/auth/authSlice'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const {username, password} = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => {return state.auth})

  useEffect(() => {
    if (isError) {
      //add error
      return;
    }
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, navigate, dispatch])

  const changeState = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const submit = () => {
    const userData = {
      username,
      password
    }

    dispatch(login(userData))
  }

  return (
    <div className='h-screen w-screen bg-zinc-900 text-white flex flex-row'>

      {/* sidebar */}
      <div className='w-7/12 lg:block hidden'>
        <img src={AuthBack} alt={'Background for login'} className="w-full h-full p-3 py-6 rounded-2xl drop-shadow-2xl"/>
      </div>

      {/* form */}
      <div className='w-full lg:w-5/12 my-auto'>
          <h1 className='text-4xl text-center'>Login</h1>
          <form className='flex flex-col m-5 mx-16 text-black'>
            <input name='username' value={username} type='text' placeholder='Username' className='p-2 my-4 rounded-lg' onChange={changeState}/>
            <input name='password' value={password} type='password' placeholder='Password' className='p-2 my-4 rounded-lg' onChange={changeState}/>
            
          </form>

          <div className='mx-16 flex mb-16'>
            <motion.button onClick={submit} whileHover={{ scale: 1.1 }} transition={{ duration: .3 }} className='bg-red-500 p-3 px-5 rounded-lg text-white' type='submit'>
              <div className='flex'>Login <div className='my-auto ml-2'><BiLogIn /></div></div>
            </motion.button>
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: .3 }} className='ml-auto my-auto'>
              <Link to={'/register'}>
                Don't have an account?
              </Link>
            </motion.div>
          </div>

      </div>
    </div>
  )
}

export default Login