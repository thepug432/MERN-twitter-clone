import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingPosts from '../components/LoadingPosts'
import Wrapper from '../components/Wrapper'
import { motion } from 'framer-motion'

function Search() {
    const [searchResults, setSearchResults] = useState(null)
    const [searchValue, setSearchValue] = useState()
    const { query } = useParams()
    const navigate = useNavigate()

    const change = (e) =>  setSearchValue(e.target.value)
    const search = () => navigate(`/search/${searchValue}`)


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
                
                { searchResults ?
                    <>returned the following results: </>
                :
                    searchResults === 'null' ?
                        <>are loading...</>
                    :
                        <>returned no results.</>
                }
                
                
            </h1>
                
            <div>
                {searchResults ?
                    <>posts found</>
                :
                    searchResults === 'null' ?
                        <LoadingPosts override='Loading results...' />
                    :
                    <h1 className='text-center'>Please change your query, and try again.</h1>   
                }
            </div>
        </Wrapper>
    )
}

export default Search