import React from 'react'
import { motion } from 'framer-motion'
import {WiTime2} from 'react-icons/wi'
import Wrapper from '../components/Wrapper'


function FullUser() {
  return (
    <Wrapper>
        {/* user information */}
        <div className='text-white flex flex-col border-b border-white p-2'>
            <div className='flex'>
                <h1><strong>username</strong></h1>
                <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: "rgb(239, 68, 68)" }} 
                    whileTap={{ scale: .9 }} 
                    transition={{ duration: .3 }}
                    className='ml-auto my-1 mr-1 bg-red-700 p-5 py-1 rounded-lg'
                >
                    Follow
                </motion.button>
            </div>
            <p>Description</p>
            <div>
                <small className='italic text-gray-400 flex'>
                    <div className='my-auto'>
                        <WiTime2/>
                    </div>
                    <time>Joined: date</time>
                </small>
                <div>
                    <small className='text-gray-400'><strong className='text-white'>int</strong> followers</small>
                </div>
            </div>
        </div>

        <div>user posts</div>
    </Wrapper>
  )
}

export default FullUser