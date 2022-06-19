import React, { useState } from 'react'
import { motion } from 'framer-motion'

function Newpost() {
    const [content, setContent] = useState()

    const changeContent = (e) => {
        setContent(e.target.value)
    }

    return (
        <div className='mx-5 mt-5'>
            <form className='flex flex-col text-white'>
                <textarea className='bg-zinc-800 rounded-3xl p-3 resize-none h-36' value={content} onChange={changeContent}>

                </textarea>
                <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: "rgb(239, 68, 68)" }} 
                    whileTap={{ scale: .9 }} 
                    transition={{ duration: .3 }}
                    className='bg-red-700 px-6 py-3 my-3 ml-auto rounded-xl'
                >
                    Post!
                </motion.button>
            </form>
        </div>
    )
}

export default Newpost