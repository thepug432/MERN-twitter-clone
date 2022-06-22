import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingPosts from '../components/LoadingPosts'
import Post from '../components/Post'
import Wrapper from '../components/Wrapper'

function FullPost() {
  const [post, setPost] = useState(false)
  const [comments, setComments] = useState(false)
  const [update, setUpdate] = useState(0)
  const { id } = useParams() 

  useEffect(() => {
    //get post
    const getPost = async () => {
      const response = await (await axios.get('/api/posts/postbyid', { params: { id: id } })).data
      setPost(response)
    }
    getPost()

    //get comment
  }, [update, id])

  const forceUpdate = () => {
    setUpdate(update+1)
  }

  if(post === ''){
    return(
      <div>404</div>
    )
  }
  return (
    <Wrapper>
      <div className='text-white'>

        {/* get post */}
        {post ?
            <Post forceUpdate={forceUpdate} posterObj={post.poster} postObj={post} key={post._id} hidecomment={true}/>
          :
          <LoadingPosts />
        }

        {/* get comments */}
        {comments ?
          //comments exist
          <div>comments exists</div>
        :
          post === false ?
            <div>comments loading</div>
            :
            <div className='mt-5'>
              <h1 className='text-center'><strong>No Comments</strong></h1>
              <p className='text-center'>Comment and it will appear here!</p>
            </div>
        }


      </div>
    </Wrapper>
  )
}

export default FullPost