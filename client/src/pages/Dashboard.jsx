import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {store} from '../app/store'
import { useSelector } from 'react-redux'
import Post from '../components/Post';
import Wrapper from '../components/Wrapper';
import Newpost from '../components/Newpost'
import LoadingPosts from '../components/LoadingPosts'

function Dashboard() {
  const [posts, setPosts] = useState(false)
  const [update, setupdate] = useState(0)
  const user = useSelector((state) => {return state.auth.user})
  const navigate = useNavigate()

  useEffect(() => {
    // check login
    if(!user){
      navigate('/login')
    }

    // fetch posts
    const fetchPosts = async () => {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const response = await (await axios.get('/api/posts/userreleventposts', config)).data
      setPosts(response)
    }
    fetchPosts()
  }, [navigate, update, user])

  const forceUpdate = () => {
    setupdate(update+1)
  }

  
  
  return (
    <Wrapper>
        <div className='flex flex-col min-h-screen'>
          <Newpost forceUpdate={forceUpdate}/>
          
          {posts ?
            // posts exist
            posts.map(post => 
              <Post forceUpdate={forceUpdate} posterObj={post.poster} postObj={post} key={post._id}/>
            )
            :
            posts === false ?
              //posts are being fetched
              <LoadingPosts />
              : 
  
              // no posts
              <div className='flex flex-col w-full text-white'>
                <p className='mx-auto'><strong>No posts</strong></p>
                <p className='mx-auto'>Post something, follow someone, and it will show up.</p>
                <p className='mx-auto'>Or, switch modes and continue browsing</p>
              </div>
            
          }

          

        </div>
    </Wrapper>
  )
}

export default Dashboard