import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import Navbutton from './Navbutton';
import { motion } from 'framer-motion';

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)

    const logoutFunc = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    return (
        <nav className='h-screen border-r border-white bg-black w-1/4 flex flex-col p-3'> 
            <Navbutton link={'/'} text={'Home'}/>
            <Navbutton link={'/explore'} text={'Explore'}/>
            {user ?
                <motion.button 
                onClick={logoutFunc}
                whileHover={{ scale: 1.1, backgroundColor: "rgb(239, 68, 68)" }} 
                whileTap={{ scale: .9 }} 
                transition={{ duration: .3 }}
                className="text-center p-2 rounded"
                    >
                    <div className='text-white'>Logout</div>
                </motion.button>
            :
                <Navbutton link={'/login'} text={'Login'}/>
            }     
        </nav>
    )
}

export default Navbar