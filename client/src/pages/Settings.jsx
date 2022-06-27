import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Wrapper from '../components/Wrapper'

function Settings() {
    const navigate = useNavigate()
    const user = useSelector((state) => {return state.auth.user})
    const [userData, setUserData] = useState({
        username: null,
        description: null 
    })
    

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
    }, [navigate, user])

    return (
        <Wrapper>
            <div className='m-3 flex flex-col'>

                <label htmlFor='username'><small className='italic text-gray-300'>Username</small></label>
                <input 
                    name='username' 
                    type='text' 
                    placeholder={userData.username ? 'Username' : 'Loading...'} 
                    className='bg-zinc-700 p-3 my-2 rounded-md'
                />

                <label htmlFor='username'><small className='italic text-gray-300'>Description</small></label>
                <textarea 
                    name='description' 
                    type='description' 
                    placeholder={userData.description ? 'Description' : 'Loading...'} 
                    className='bg-zinc-700 p-3 my-2 rounded-md'
                />
                <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: "rgb(239, 68, 68)" }} 
                    whileTap={{ scale: .9 }} 
                    transition={{ duration: .3 }}
                    className='bg-red-700 px-6 py-3 my-3 ml-auto rounded-xl'
                >
                    Save settings
                </motion.button>
            </div>
        </Wrapper>
    )
}

export default Settings