import React from 'react'
import {Link} from 'react-router-dom'

function Login() {
  return (
    <div className='h-screen w-screen bg-zinc-900 text-white flex flex-row'>

      {/* sidebar */}
      <div className='w-7/12 sm:block hidden'>
      asdassasas
      </div>

      {/* form */}
      <div className='w-full sm:w-5/12 my-auto'>
          <h1 className='text-4xl text-center'>Login</h1>
          <form className='flex flex-col m-5 mx-16 text-black'>
            <input type='text' placeholder='Username or Email' className='p-2 my-4 rounded-lg'/>
            <input type='password' placeholder='Password' className='p-2 my-4 rounded-lg'/>
            
          </form>

          <div className='mx-16 flex mb-16'>
            <button className='bg-red-500 p-3 px-5 rounded-lg text-white'>
              Login
            </button>
            <Link to={'/register'} className='ml-auto my-auto'>
              Don't have an account?
            </Link>

          </div>

      </div>
    </div>
  )
}

export default Login