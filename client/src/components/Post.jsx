import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'

function Post({posterObj, date, content, id}) {
  const navigate = useNavigate()
  const authState = useSelector(state => state.auth) 
  
  const goToPost = () => {
    navigate(`post/${id}`)
  }

  const like = async () => {
    console.log('liked');
    const data = { id: id }
    const config = {
      headers: { Authorization: `Bearer ${authState.user.token}` }
    };
    const response = await axios.put('/api/posts/like', data, config)
  }
  
  return (
    <div
      className='bg-zinc-800 text-white p-3' 
      key={id}
    >
        <div className='flex p-3'>
            <Link to={`user/${posterObj._id}`}>
              <motion.h1
                whileHover={{ scale: 1.1 }}
                transition={{ duration: .25 }} 
                className='text-xl align-middle ml-2 cursor-pointer hover:underline'
              >
                {posterObj.username}
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