import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Wrapper from '../components/Wrapper'
import LoadingPosts from '../components/LoadingPosts'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Post from '../components/Post'
import User from '../components/User'

function Explore() {
    const [formData, setFormData] = useState('')
    const [userData, setUserData] = useState(null)
    const [postData, setPostData] = useState(null)
    const [update, setUpdate] = useState(0)

    const navigate = useNavigate()

    const changeFormData = (e) => {
        setFormData(e.target.value)
    }
    const forceUpdate = () => setUpdate(update+1)

    useEffect(() => {
        //userData
        const getUserData = async () => {
            const response = await( await axios.get('/api/userData/top', { params: { num: 10 } })).data
            setUserData(response)
        }
        getUserData()

        const getPostData = async () => {
            const response = await( await axios.get('/api/posts/top', { params: { num: 10 } })).data
            setPostData(response)
        }   
        getPostData()
    }, [update])

    const search = () => {
        navigate(`/search/${formData}`)
    }
    
    return (
        <Wrapper>
            {/* search */}
            <div className='flex m-3 text-white'>
                <input placeholder='Search' value={formData} onChange={changeFormData} type='text' className='bg-zinc-700 w-full rounded-lg px-2'/>
                <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: "rgb(239, 68, 68)" }} 
                    whileTap={{ scale: .9 }} 
                    transition={{ duration: .3 }}
                    className='bg-red-700 px-4 py-3 ml-3 rounded-lg'
                    onClick={search}    
                >
                Search
                </motion.button>
            </div>

            <div className='flex sm:flex-row flex-col m-4'>

                {/* posts */}
                <div className='w-full flex flex-col'>
                    {postData ?
                        postData.map(post => <Post forceUpdate={forceUpdate} posterObj={post.poster} postObj={post} key={post._id}/>)
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
                        userData.map(data => <User data={data} key={data._id}/>)
                    :
                        userData === null ?
                            <LoadingPosts override={'Loading top users...'}/>
                            
                        :
                        <>
                            <h1><strong>No top users.</strong></h1>
                            <p>Create and account and it will appear here.</p>
                        </>
                    }
                </div>
            </div>
        </Wrapper>
    )
}

export default Explore