import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Wrapper({children}) {
  return (
    <div className='flex sm:flex-row flex-col bg-zinc-900'>
        <Navbar />
        <div className='sm:w-2/4 w-full '>
          {children}
        </div>
        <Sidebar />
    </div>
  )
}

export default Wrapper