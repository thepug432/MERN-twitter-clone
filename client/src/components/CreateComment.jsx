import { motion } from 'framer-motion'
import React, { useState } from 'react'

function CreateComment() {
    const [text, setText] = useState('')

    const change = (e) => {
        setText(e.target.value)
    }

    return (
        <div className='p-3 flex flex-col'>
            <form>
                <textarea 
                    className='bg-zinc-800 mx-auto p-5 rounded-xl w-full resize-none' 
                    value={text} 
                    onChange={change}
                    placeholder="New comment" 
                />
            </form>
            <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: "rgb(239, 68, 68)" }} 
                whileTap={{ scale: .9 }} 
                transition={{ duration: .3 }}
                className='bg-red-600 sm:mr-auto sm:ml-0 mx-auto mt-4 p-3 px-6 rounded-lg'
            >
                Comment
            </motion.button>
        </div>
    )
}

export default CreateComment