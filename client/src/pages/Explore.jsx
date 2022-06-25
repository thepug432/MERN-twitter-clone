import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Wrapper from '../components/Wrapper'
import LoadingPosts from '../components/LoadingPosts'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Explore() {
    const [formData, setFormData] = useState('')
    const [userData, setUserData] = useState(null)
    const [postData, setPostData] = useState(null)

    const changeFormData = (e) => {
        setFormData(e.target.value)
    }

    useEffect(() => {
        //userData
        const getUserData = async () => {
            const response = await( await axios.get('/api/userData/top', { params: { num: 10 } })).data
            setUserData(response)
        }
        getUserData()
    }, [])
    
    return (
        <Wrapper>
            {/* search */}
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

            <div className='flex sm:flex-row flex-col m-4'>

                {/* posts */}
                <div className='w-full flex flex-col'>
                    {postData ?
                        <></>
                    :
                        postData === null ?
                            <LoadingPosts override={'Loading top posts...'}/>
                            
                        :
                        <>
                            <h1><strong>No top posts.</strong></h1>
                            <p>Post something and it will appear.</p>
                        </>
                    }
                </div>

                {/* users */}
                <div className='sm:w-full flex flex-col'>
                    {userData ?
                        userData.map(data => 
                            <Link to={`/user/${data._id}`} key={data._id}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: .95 }}
                                    className='flex flex-col bg-zinc-500 p-3 rounded-lg'
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
                    :
                        userData === null ?
                            <LoadingPosts override={'Loading top users...'}/>
                            
                        :
                        <>
                            <h1><strong>No top posts.</strong></h1>
                            <p>Post something and it will appear.</p>
                        </>
                    }
                </div>
            </div>
        </Wrapper>
    )
}

export default Explore