import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Wrapper from '../components/Wrapper'


function Explore() {
    const [formData, setFormData] = useState('')

    const changeFormData = (e) => {
        setFormData(e.target.value)
    }

    return (
        <Wrapper>
            <div className='flex m-3 text-white'>
                <input value={formData} onChange={changeFormData} type='text' className='bg-zinc-700 w-full rounded-lg px-2'/>
                <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: "rgb(239, 68, 68)" }} 
                    whileTap={{ scale: .9 }} 
                    transition={{ duration: .3 }}
                    className='bg-red-700 px-4 py-3 ml-3 rounded-lg'>
                Search
                </motion.button>
            </div>
        </Wrapper>
    )
}

export default Explore