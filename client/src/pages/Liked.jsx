import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Wrapper from '../components/Wrapper'

function Liked() {
    const navigate = useNavigate()
    const user = useSelector((state) => {return state.auth.user})

    const [posts, setPosts] = useState(false)

    useEffect(() => {
        // check login
        if(!user){
            navigate('/login')
        }

    }, [navigate, user])

    return (
        <Wrapper>
            <div className='text-white'>
                {posts ?
                    // if posts are fetched
                    <div></div>
                    :
                    posts === false ?
                        //loading
                        <div>Loading...</div>
                        :
                        //if liked posts do not exist
                        <div></div>
                    
                }
            </div>
        </Wrapper>
    )
}

export default Liked