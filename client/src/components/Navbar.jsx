import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import Navbutton from './Navbutton';
import { AnimatePresence, motion } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5'
import { GoTriangleRight } from 'react-icons/go'
import Newpost from './Newpost'; 

function Navbar() {
    const [seeNav, setSeeNav] = useState(false)
    const [seeNew, setSeeNew] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)

    const divClass = `sm:flex flex-col p-3 pr-9 bg-zinc-900 ${seeNav? 'hidden': 'flex relative'}`
    
    const logoutFunc = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    const flipnav = () => {
        setSeeNav(!seeNav)
    }

    const flipSeeNew = () => {
        setSeeNew(!seeNew)
    }

    return (
        <nav className='sm:min-h-screen h-min sm:bg-zinc-900 sm:w-1/4 w-full p-0 sm:static absolute z-50'> 
            {seeNav ? 
                <button className='sm:hidden block bg-zinc-900/50 text-white p-2 px-4 rounded-r-xl' onClick={flipnav}>
                    <GoTriangleRight size={25}/>
                </button>
            : 
                <div className='flex bg-zinc-900 text-white p-2 px-4 sm:hidden' onClick={flipnav}>
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
                        <Navbutton link={'/liked'} text={'Likes'} />
                        <Navbutton link={'/settings'} text={'Settings'}/>
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
                onClick={flipSeeNew}
                className='bg-red-600 rounded-xl p-5 px-10 text-white mx-auto mt-24'>
                    {seeNew ?
                        <>Hide</>
                    :
                        <>New Post</>
                    }  
                </motion.button>
                <AnimatePresence>
                    {seeNew &&
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: .3 }}
                        >
                            <Newpost />
                        </motion.div>
                    } 
                </AnimatePresence>
            </div> 
            
        </nav>
        
    )
}

export default Navbar