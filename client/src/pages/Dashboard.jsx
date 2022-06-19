import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {store} from '../app/store'
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
        <div className='flex flex-col w-2/4'>
        
          
          {posts &&
            // posts exist
            posts.map(post => 
              <Post poster={post.poster} date={post.timestamps} content={post.text}/>
            )
          }

          {posts === false ?
            //posts are being fetched
            <div> Loading </div>
            : 

            // no posts
            <div>No posts</div>
          }

        </div>
    </Wrapper>
  )
}

export default Dashboard