import React from 'react'

function Post({poster, date, content, id}) {
  return (
    <div className='bg-zinc-800 text-white' key={id}>
        <div className='flex p-3'>
            <h1 className='text-xl align-middle ml-2'>{poster}</h1>
            <div className='align-middle table-cell ml-auto mr-2'>
              <h2 className='text-sm text-gray-200 inline'>{new Date(date).toGMTString()}</h2>
            </div>
        </div>
        <p className='mx-2 p-3'>
            {content}
        </p>
    </div>
  )
}

export default Post