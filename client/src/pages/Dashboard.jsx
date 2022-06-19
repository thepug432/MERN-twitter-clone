import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {store} from '../app/store'
import {VscLoading} from 'react-icons/vsc'
import Post from '../components/Post';
import Wrapper from '../components/Wrapper';

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
        <div className='flex flex-col sm:w-2/4 w-full'>
        
          
          {posts &&
            // posts exist
            posts.map(post => 
              <Post poster={post.poster} date={post.timestamps} content={post.text}/>
            )
          }

          {posts === false ?
            //posts are being fetched
            <div className='flex flex-col min-h-screen w-full text-white'>
                <div className='animate-spin mx-auto mt-auto'> 
                  <VscLoading size={100}/>  
                </div>
              <h1 className='mx-auto mb-auto'>Loading posts...</h1>
            </div>
            : 

            // no posts
            <div>No posts</div>
          }

        </div>
    </Wrapper>
  )
}

export default Dashboard