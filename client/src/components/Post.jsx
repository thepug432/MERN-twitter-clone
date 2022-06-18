import React from 'react'

function Post({poster, date, content}) {
  return (
    <div className='bg-zinc-800 text-white'>
        <div className='flex'>
            <h1 className='text-xl align-middle ml-2'>{poster}</h1>
            <h2 className='text-xl align-middle ml-auto mr-2'>{date}</h2>
        </div>
        <p className='mx-2'>
            {content}
        </p>
    </div>
  )
}

export default Post