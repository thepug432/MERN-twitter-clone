import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {store} from '../app/store'
import {VscLoading} from 'react-icons/vsc'
import Post from '../components/Post';
import Wrapper from '../components/Wrapper';
import Newpost from '../components/Newpost'

function Dashboard() {
  const [posts, setPosts] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // check login
    if(!store.getState().auth.user){
      navigate('/login')
    }

    // fetch posts
    fetchPosts()
  }, [navigate])

  const fetchPosts = async () => {
    const response = await (await axios.get('/api/posts/allposts')).data
    setPosts(response)
  }

  return (
    <Wrapper>
        <div className='flex flex-col sm:w-2/4 w-full min-h-screen'>
          <Newpost />
          
          {posts ?
            // posts exist
            posts.map(post => 
              <Post posterId={post.poster} date={post.createdAt} content={post.text} key={post._id}/>
            )
            :
            posts === false ?
              //posts are being fetched
              <div className='flex flex-col w-full text-white'>
                  <div className='animate-spin mx-auto mt-auto'> 
                    <VscLoading size={100}/>  
                  </div>
                <h1 className='mx-auto mb-auto'>Loading posts...</h1>
              </div>
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