import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {WiTime2} from 'react-icons/wi'
import Wrapper from '../components/Wrapper'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import LoadingPosts from '../components/LoadingPosts'
import Post from '../components/Post'

function FullUser() {
    const {id} = useParams()
    const [userData, SetUserData] = useState({
        username: null,
        created: null,
        description: null,
        followers: null
    })
    const [posts, setPosts] = useState(null)
    const [update, setUpdate] = useState(0)

    const forceUpdate = () => {
        setUpdate(update+1)
    }

    useEffect(() => {
         
        const fetchUserData = async () => {
            const response = await(await axios.get('/api/userData/userbyId', { params: {id: id} })).data
            SetUserData({
                username: response.username,
                created: response.createdAt,
                description: response.description,
                followers: response.followers.length,
            })
        }
        fetchUserData()

        const fetchUserPosts = async () => {
            const response = await(await axios.get('/api/posts/postbyposter', { params: {id: id} })).data
            setPosts(response)
        }
        fetchUserPosts()

    }, [update, id])
    
    return (
        <Wrapper>
            {/* user information */}
            <div className='text-white flex flex-col border-b border-white p-2'>
                <div className='flex'>
                    <h1><strong>
                        {userData.username ?
                            userData.username
                        :
                            <>loading....</>
                        }
                    </strong></h1>
                    <motion.button 
                        whileHover={{ scale: 1.1, backgroundColor: "rgb(239, 68, 68)" }} 
                        whileTap={{ scale: .9 }} 
                        transition={{ duration: .3 }}
                        className='ml-auto my-1 mr-1 bg-red-700 p-5 py-1 rounded-lg'
                    >
                        Follow
                    </motion.button>
                </div>
                <p>
                    {userData.description ?
                        userData.description
                    :
                         <>loading....</>
                    }
                </p>
                <div>
                    <small className='italic text-gray-400 flex'>
                        <div className='my-auto'>
                            <WiTime2/>
                        </div>
                        <time>Joined: {userData.created ? new Date(userData.created).toGMTString() : <>loading...</>}</time>
                    </small>
                    <div>
                        <small className='text-gray-400'>
                            <strong className='text-white'>
                                {userData.followers !== null ? userData.followers : <>loading...</>}
                            </strong> followers
                        </small>
                    </div>
                </div>
            </div>

            <div className='text-white'>
                {posts ?
                    posts.map(post => <Post forceUpdate={forceUpdate} posterObj={post.poster} postObj={post} key={post._id}/>)
                :
                    posts === null ?
                        <LoadingPosts />
                    :
                    // there are no posts
                    <div className='flex flex-col'>
                        <h1 className='text-center'><strong>No Posts</strong></h1>
                        <p className='text-center'>This user has no posted anything.</p>
                    </div>
                }
            </div>
        </Wrapper>
    )
}

export default FullUser