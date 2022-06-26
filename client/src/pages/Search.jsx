import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import LoadingPosts from '../components/LoadingPosts'
import Wrapper from '../components/Wrapper'
import Post from '../components/Post'
import User from '../components/User'


function Search() {
    const [searchResultsPosts, setSearchResultsPosts] = useState(null)
    const [searchResultsUsers, setSearchResultsUsers] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [update, setUpdate] = useState(0)
    const { query } = useParams()
    const navigate = useNavigate()

    const change = (e) =>  setSearchValue(e.target.value)
    const search = () => navigate(`/search/${searchValue}`)
    const forceUpdate = () => setUpdate(update+1)

    useEffect(() => {
        const SearchPosts = async () => {
            const response = await (await axios.get('/api/posts/getbyquery', { params: { query: query} } )).data
            setSearchResultsPosts(response)
        }
        SearchPosts()

        const SearchUsers = async () => {
            const response = await (await axios.get('/api/userData/getbyquery', { params: { query: query} } )).data
            setSearchResultsUsers(response)
        }
        SearchUsers()
    }, [query, update])
    console.log(searchResultsPosts, searchResultsUsers);
    return (
        <Wrapper>
            <div className='flex m-3 text-white'>
                <input placeholder='Search' value={searchValue} onChange={change} type='text' className='bg-zinc-700 w-full rounded-lg px-2'/>
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

            {/* title */}
            <h1 className='text-2xl m-3 text-center'>
                Your search for <strong className='italic'>{query} </strong> 
                
                {searchResultsPosts ?
                    <>returned the following results: </>
                :
                    searchResultsPosts === null ?
                        <>are loading...</>
                    :
                        <>returned no results.</>
                }
            </h1>
            
            {/* posts results */}
            <div className='flex sm:flex-row flex-col'>
                <div className='mx-3 w-full'>
                    <h1 className='text-xl text-center mb-3'><strong>Posts</strong></h1>
                    {searchResultsPosts ?
                        searchResultsPosts.map(post => <Post forceUpdate={forceUpdate} posterObj={post.poster} postObj={post} key={post._id}/>)
                    :
                        searchResultsPosts === null ?
                            <LoadingPosts override='Loading results...' />
                        :
                        <h1 className='text-center'>Please change your query, and try again.</h1>   
                    }
                </div>

                <div className='mr-3 w-full'>
                    <h1 className='text-xl text-center mb-3'><strong>Users</strong></h1>
                    {searchResultsUsers ?
                        searchResultsUsers.map(data => <User data={data}/>)
                    :
                        searchResultsUsers === null ?
                            <LoadingPosts override='Loading results...' />
                        :
                        <h1 className='text-center'>Please change your query, and try again.</h1>   
                    }
                </div>
            </div>
        </Wrapper>
    )
}

export default Search