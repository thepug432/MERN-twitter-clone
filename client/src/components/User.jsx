import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function User({ data }) {
    return (
        <Link to={`/user/${data._id}`} key={data._id} className='mt-2'>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: .95 }}
                className='flex flex-col bg-zinc-800 p-3 rounded-lg'
            >
                <div className='flex'>
                    <h1><strong>{data.username}</strong></h1>
                    <p className='ml-auto'>
                        Joined: <i>{new Date(data.createdAt).toGMTString()}</i>
                    </p>
                </div>
                <div className='flex flex-col'>
                    <p>{data.description}</p>
                    <p><strong>{data.followers.length}</strong> followers</p>
                </div>
            </motion.div>
        </Link>
    )
}

export default User