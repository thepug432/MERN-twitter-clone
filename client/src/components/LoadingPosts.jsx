import React from 'react'
import { VscLoading } from 'react-icons/vsc'

function LoadingPosts({override = 'Loading posts...'}) {
  return (
    <div className='flex flex-col w-full text-white'>
            <div className='animate-spin mx-auto mt-auto'> 
                <VscLoading size={100}/>  
            </div>
        <h1 className='mx-auto mb-auto'>{override}</h1>
    </div>
  )
}

export default LoadingPosts