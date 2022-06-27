import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Wrapper from '../components/Wrapper'
import axios from 'axios'

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
        
        const fetchUserData = async () => {
            const response = await (await axios.get('/api/userData/usernameFromId', { params: { id: user.id } } )).data
            setUserData({
                username: response.username,
                description: response.description
            })
        }
        fetchUserData()
    }, [navigate, user])

    const change = e => setUserData(state => ({
        ...state,
        [e.target.name]: e.target.value
    }))

    return (
        <Wrapper>
            <div className='m-3 flex flex-col'>

                <label htmlFor='username'><small className='italic text-gray-300'>Username</small></label>
                <input 
                    name='username' 
                    type='text'
                    disabled={userData.username ? false : true}
                    value={userData.username ? userData.username : 'Loading...'}
                    onChange={change}
                    className='bg-zinc-700 p-3 my-2 rounded-md'
                />

                <label htmlFor='username'><small className='italic text-gray-300'>Description</small></label>
                <textarea 
                    name='description' 
                    disabled={userData.description ? false : true}
                    value={userData.description ? userData.description : 'Loading...'} 
                    onChange={change}
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