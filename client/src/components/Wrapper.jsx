import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Wrapper({children}) {
  return (
    <div className='flex sm:flex-row flex-col'>
        <Navbar />
        {children}
        <Sidebar />
    </div>
  )
}

export default Wrapper