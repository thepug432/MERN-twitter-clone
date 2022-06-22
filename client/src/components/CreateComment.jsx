import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function CreateComment({forceupdate}) {
    const [content, setContent] = useState('')
    const authState = useSelector(state => state.auth)

    const change = (e) => {
        setContent(e.target.value)
    }

    const sendComment = async () => {
        const body = { content: content }
        const config = {
            headers: { Authorization: `Bearer ${authState.user.token}` }
        };
        const response = await axios.post('/api/comments/create', body, config)

        if(forceupdate){
            forceupdate()
        }
        //error
    }

    return (
        <div className='p-3 flex flex-col'>
            <form>
                <textarea 
                    className='bg-zinc-800 mx-auto p-5 rounded-xl w-full resize-none' 
                    value={content} 
                    onChange={change}
                    placeholder="New comment" 
                />
            </form>
            <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: "rgb(239, 68, 68)" }} 
                whileTap={{ scale: .9 }} 
                transition={{ duration: .3 }}
                className='bg-red-600 sm:mr-auto sm:ml-0 mx-auto mt-4 p-3 px-6 rounded-lg'
                onClick={sendComment}
            >
                Comment
            </motion.button>
        </div>
    )
}

export default CreateComment