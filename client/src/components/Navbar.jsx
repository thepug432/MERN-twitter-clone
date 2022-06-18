import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import Navbutton from './Navbutton';
import { motion } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5'
import { GoTriangleRight } from 'react-icons/go'

function Navbar() {
    const [seeNav, setSeeNav] = useState(false)
    const divClass = `sm:flex flex-col p-3 bg-black pr-9 ${seeNav? 'hidden': 'flex'}`
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)

    const logoutFunc = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    const flipnav = () => {
        setSeeNav(!seeNav)
    }

    return (
        <nav className='h-screen border-white border-r sm:bg-black border-b-red-100 sm:w-1/4 w-full p-0'> 

            
            {seeNav ? 
                <button className='sm:hidden block bg-black text-white p-2 px-4 rounded-r-xl' onClick={flipnav}>
                    <GoTriangleRight size={25}/>
                </button>
            : 
                <div className='flex bg-black text-white p-2 px-4 sm:hidden' onClick={flipnav}>
                    <button>
                    <IoCloseOutline size={25}/>
                    </button>
                </div>                    
            }
            

            <div className={divClass}>
                <Navbutton link={'/'} text={'Home'}/>
                <Navbutton link={'/explore'} text={'Explore'}/>
                {user ?
                    <>
                        <Navbutton link={'/Likes'} text={'Likes'} />
                        <Navbutton link={'/Messages'} text={'Messages'} />

                        <motion.button 
                        onClick={logoutFunc}
                        whileHover={{ scale: 1.1, backgroundColor: "rgb(239, 68, 68)" }} 
                        whileTap={{ scale: .9 }} 
                        transition={{ duration: .3 }}
                        className="text-center p-2 rounded"
                            >
                            <div className='text-white'>Logout</div>
                        </motion.button>
                                            
                    </>
                :
                    <Navbutton link={'/login'} text={'Login'}/>
                }   
                <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: "rgb(239, 68, 68)" }} 
                whileTap={{ scale: .9 }} 
                transition={{ duration: .3 }}
                className='bg-red-600 rounded-xl p-5 px-10 text-white mx-auto mt-24'>
                    New Post 
                </motion.button>
            </div>  
        </nav>
    )
}

export default Navbar