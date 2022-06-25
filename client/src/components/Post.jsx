import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BiCommentDetail } from 'react-icons/bi'
import { BsSuitHeartFill, BsHeart } from 'react-icons/bs'

function Post({forceUpdate, posterObj, postObj, hidecomment = false }) {
  const navigate = useNavigate()
  const authState = useSelector(state => state.auth) 
  const goToPost = () => {
    navigate(`/post/${postObj._id}`)
  }

  const like = async () => {
    const data = { id: postObj._id }
    const config = {
      headers: { Authorization: `Bearer ${authState.user.token}` }
    };
    let response;
    if(postObj.likes.indexOf(authState.user.id) >= 0){
      response = await axios.put('/api/posts/unlike', data, config)
    } else{
      response = await axios.put('/api/posts/like', data, config)
    }

    forceUpdate()
  }
  
  const likeStyles = `cursor-pointer flex ${postObj.likes.indexOf(authState.user.id) >= 0 ? 'text-red-500': 'text-white'}`
  return (
    <div
      className='bg-zinc-800 text-white p-3 m-2 rounded-lg' 
    >
        <div className='flex p-3'>
            <Link to={`/user/${posterObj._id}`}>
              <motion.h1
                whileHover={{ scale: 1.1 }}
                transition={{ duration: .25 }} 
                className='text-xl align-middle ml-2 cursor-pointer hover:underline'
              >
                {posterObj.username}
              </motion.h1>
            </Link>
            <div className='align-middle table-cell ml-auto mr-2'>
              <h2 className='text-sm text-gray-200 inline'>{new Date(postObj.createdAt).toGMTString()}</h2>
            </div>
        </div>
        <p className='mx-2 p-3'>
            {postObj.text}
        </p>
        <div className='flex mx-4'>
          {/* like */}
            <motion.i 
              className={likeStyles} 
              onClick={like}
              whileHover={{ scale: 1.1 }}
            >
                  <BsSuitHeartFill size={20}/> 
              <p>{postObj.likes.length}</p>
            </motion.i>
          {/* see comments */}
          {!hidecomment &&
            <motion.i 
            className='mx-3 cursor-pointer' 
            onClick={goToPost}
            whileHover={{ scale: 1.1 }}
          >
            <BiCommentDetail size={20}/>
          </motion.i>
          }
        </div>
    </div>
  )
}

export default Post