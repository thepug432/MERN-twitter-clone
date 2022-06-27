import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Wrapper from '../components/Wrapper'

function Settings() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const user = useSelector((state) => {return state.auth.user})

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
    }, [navigate, user])

    return (
        <Wrapper>
            <div className='m-3 flex flex-col'>
                <input type='text' placeholder={'username'}/>
                <input type='description' placeholder={'description'}/>
                <button>Save</button>

                <button>Logout</button>
            </div>
        </Wrapper>
    )
}

export default Settings