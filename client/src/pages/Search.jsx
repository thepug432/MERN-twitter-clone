import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingPosts from '../components/LoadingPosts'
import Wrapper from '../components/Wrapper'

function Search() {
    const [search, setSearch] = useState(null)
    const { query } = useParams()


    return (
        <Wrapper>
            <h1 className='text-2xl m-3 text-center'>
                Your search for <strong className='italic'>{query} </strong> 
                
                { search ?
                    <>returned the following results: </>
                :
                    search == null ?
                        <>are loading...</>
                    :
                        <>no results</>
                }
                
                
            </h1>
                
            <div>
                {search ?
                    <>posts found</>
                :
                    search === null ?
                        <LoadingPosts override='Loading results...' />
                    :
                    <h1>Nothing found</h1>   
                }
            </div>
        </Wrapper>
    )
}

export default Search