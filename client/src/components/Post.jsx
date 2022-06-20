import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'

function Post({posterId, date, content, id}) {
  const navigate = useNavigate()
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

  const goToPost = () => {
    navigate(`post/${id}`)
  }

  const like = () => {
    console.log('liked');
  }
  
  return (
    <div
      className='bg-zinc-800 text-white p-3' 
      key={id}
    >
        <div className='flex p-3'>
            <Link to={`user/${posterId}`}>
              <motion.h1
                whileHover={{ scale: 1.1 }}
                transition={{ duration: .25 }} 
                className='text-xl align-middle ml-2 cursor-pointer'
              >
                {posterObj.username ? posterObj.username : 'Loading...'}
              </motion.h1>
            </Link>
            <div className='align-middle table-cell ml-auto mr-2'>
              <h2 className='text-sm text-gray-200 inline'>{new Date(date).toGMTString()}</h2>
            </div>
        </div>
        <p className='mx-2 p-3'>
            {content}
        </p>
        <div className='flex mx-4'>
          {/* like */}
          <motion.i 
            className='cursor-pointer' 
            onClick={like}
            whileHover={{ scale: 1.1 }}
          >
            <AiOutlineHeart size={20}/>
          </motion.i>
          {/* see comments */}
          <motion.i 
            className='mx-3 cursor-pointer' 
            onClick={goToPost}
            whileHover={{ scale: 1.1 }}
          >
            <BiCommentDetail size={20}/>
          </motion.i>
        </div>
    </div>
  )
}

export default Post