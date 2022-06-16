import React, { useState } from 'react'
import AuthBack from '../static/images/auth-back.jpg'
import { Link } from 'react-router-dom'
import {IoCreateOutline} from 'react-icons/io5'
import {motion} from 'framer-motion'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const {username, email, password, confirmPassword} = formData
  
  const changeState = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const submit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='h-screen w-screen bg-zinc-900 text-white flex flex-row'>

      {/* sidebar */}
      <div className='w-7/12 lg:block hidden'>
        <img src={AuthBack} alt={'Background for login'} className="w-full h-full p-3 py-6 rounded-2xl drop-shadow-2xl"/>
      </div>

      {/* form */}
        <div className='w-full lg:w-5/12 my-auto'>
            <h1 className='text-4xl text-center'>Register</h1>
            <form className='flex flex-col m-5 mx-16 text-black' onSubmit={submit}>
              <input value={username} type='text' placeholder='Username' name='username' className='p-2 my-4 rounded-lg' onChange={changeState}/>

              <label htmlFor='email' className='text-sm text-gray-100'>Email is optional, and we will never share your email with anyone</label>
              <input value={email} type='text' placeholder='Email' name='email' className='p-2 my-4 rounded-lg' onChange={changeState}/>
                

              <input value={password} type='password' placeholder='Password' name='password' className='p-2 my-4 rounded-lg' onChange={changeState}/>
              <input value={confirmPassword} type='password' placeholder='Confirm password' name='confirmPassword' className='p-2 my-4 rounded-lg' onChange={changeState}/>
              
            </form>

            <div className='mx-16 flex mb-16'>
            <motion.button whileHover={{ scale: 1.1 }} transition={{ duration: .3 }} type="submit" className='bg-red-500 p-3 px-5 rounded-lg text-white'>
              <div className='flex'>Create account!<div className='my-auto ml-2'><IoCreateOutline /></div></div>
            </motion.button>
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: .3 }} className='ml-auto my-auto'>
              <Link to={'/'}>
                Already have an account?
              </Link>
            </motion.div>
          </div>

      </div>
    </div>
  )
}

export default Register