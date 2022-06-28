import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Wrapper from '../components/Wrapper'
import axios from 'axios'

function Settings() {
    const navigate = useNavigate()
    const user = useSelector((state) => {return state.auth.user})
    const [msg, setMsg] = useState(null)
    const [userData, setUserData] = useState({
        username: null,
        description: null 
    })
    const [update, setUpdate] = useState(0)

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
        
        const fetchUserData = async () => {
            const response = await (await axios.get('/api/userData/userbyId', { params: { id: user.id } } )).data
            setUserData({
                username: response.username,
                description: response.description
            })
        }
        fetchUserData()
    }, [navigate, user, update])

    const change = e => setUserData(state => ({
        ...state,
        [e.target.name]: e.target.value
    }))

    const forceupdate = () => setUpdate(update+1)

    const sendNew = async () => {
        console.log('ran');
        const data = {
            username: userData.username,
            description: userData.description
        }
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        const response = await(await axios.post('/api/userData/update', data, config)).data
        forceupdate()
        if (response.msg === 'Success') {
            alert('Your data has been changed')
        } else{
            setMsg(response.msg)
            setTimeout(() => setMsg(null), 5000)
        }
    }

    return (
        <Wrapper>
            <div className='m-3 flex flex-col'>

                <label htmlFor='username'>
                    <small className='italic text-gray-300'>Username</small>
                    <AnimatePresence>
                        {msg && (
                            <motion.em 
                                key={'alert'}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className='text-red-500 ml-2'
                            >
                                {msg}
                            </motion.em>
                        )}
                    </AnimatePresence>
                </label>
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
                    onClick={sendNew}
                    className='bg-red-700 px-6 py-3 my-3 ml-auto rounded-xl'
                >
                    Save settings
                </motion.button>
            </div>
        </Wrapper>
    )
}

export default Settings