import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Comment({comment}) {
  return (
    <div className='bg-zinc-700 m-2 rounded'>
        <div className='flex p-3'>
            <Link to={`/user/${comment._id}`}>
                <motion.h1
                whileHover={{ scale: 1.1 }}
                transition={{ duration: .25 }} 
                className='text-xl align-middle ml-2 cursor-pointer hover:underline'
                >
                {comment.commenter.username}
                </motion.h1>
            </Link>
            <div className='align-middle table-cell ml-auto mr-2'>
                <h2 className='text-sm text-gray-200 inline'>{new Date(comment.createdAt).toGMTString()}</h2>
            </div>
        </div>
        <p className='p-3 ml-2'>{comment.text}</p>
    </div>
  )
}

export default Comment