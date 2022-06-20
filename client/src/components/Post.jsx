import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Post({posterId, date, content, id}) {
  const [posterObj, setPosterObj] = useState({
    id: posterId,
    username: ''
  })

  useEffect(() => {
    const Getname = async () => {
      // get username
      try {
        const name = await (await axios.get('api/userData/usernameFromId', {params: {
          id: posterObj.id
        }})).data
        setPosterObj((prevState) => ({
          ...prevState,
          username: name.response
        }))
      } 
      // catch error
      catch (error) {
        setPosterObj((prevState) => ({
          ...prevState,
          username: 'ERROR'
        }))
      }
    }
    Getname()
  },[posterObj.id])

  
  console.log(posterObj);
  return (
    <div className='bg-zinc-800 text-white' key={id}>
        <div className='flex p-3'>
            <h1 className='text-xl align-middle ml-2'>{posterObj.username ? posterObj.username : 'Loading...'}</h1>
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