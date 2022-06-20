import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useSelector } from 'react-redux'

function Newpost({forceUpdate}) {
    const authState = useSelector(state => state.auth)
    const [content, setContent] = useState()

    const changeContent = (e) => {
        setContent(e.target.value)
    }
    
    const createPost = async (e) => {
        const data = { text: content }
        const config = {
            headers: { Authorization: `Bearer ${authState.user.token}` }
        };
        await axios.post('/api/posts/create', data, config)
        forceUpdate()
        setContent('')
    }

    return (
        <div className='mx-5 mt-5 text-white flex flex-col'>
            <textarea 
                className='bg-zinc-800 rounded-3xl p-3 resize-none h-36' 
                value={content} 
                onChange={changeContent} 
                placeholder="New Post..."
            />
            <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: "rgb(239, 68, 68)" }} 
                whileTap={{ scale: .9 }} 
                transition={{ duration: .3 }}
                className='bg-red-700 px-6 py-3 my-3 ml-auto rounded-xl'
                onClick={createPost}
            >
                Post!
            </motion.button>
        </div>
    )
}

export default Newpost