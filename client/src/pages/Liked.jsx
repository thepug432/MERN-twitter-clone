import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Wrapper from '../components/Wrapper'
import LoadingPosts from '../components/LoadingPosts'
import axios from 'axios'
import Post from '../components/Post'

function Liked() {
    const navigate = useNavigate()
    const user = useSelector((state) => {return state.auth.user})
    const authState = useSelector(state => state.auth)
    const [postsData, setPostsData] = useState(false)
    const [update, setUpdate] = useState(0)
    

    useEffect(() => {
        // check login
        if(!user){
            navigate('/login')
        }

        const fetchLiked = async () => {
            const config = {
                headers: { Authorization: `Bearer ${authState.user.token}` }
            };
            const response = await (await axios.get('/api/posts/likedposts', config)).data
            setPostsData(response)
        }

        fetchLiked()
    }, [navigate, user, authState, update])

    const forceUpdate = () => {
        setUpdate(update+1)
    }
    

    return (
        <Wrapper>
            <div className='text-white'>
                {postsData.posts ?
                    // if posts are fetched
                    <>
                    <div className='text-center text-lg p-3'><strong>You have liked {postsData.count} posts</strong></div>
                    {postsData.posts.map((post) => 
                        <Post forceUpdate={forceUpdate} posterObj={post.poster} postObj={post} key={post._id}/>
                    )

                    }
                    </>
                    :
                    postsData === false ?
                        //loading
                        <LoadingPosts />
                        :
                        //if liked posts do not exist
                        <div className='text-center mt-5'>
                            <h1 className='text-lg'><strong>There are no posts liked by you.</strong></h1>
                            <p>Like some posts, and they will appear here!</p>
                        </div>
                    
                }
            </div>
        </Wrapper>
    )
}

export default Liked