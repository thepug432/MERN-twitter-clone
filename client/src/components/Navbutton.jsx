import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Navbutton({ link, text}) {
  return (
    <Link to={link}>
        <motion.div 
            whileHover={{ scale: 1.1, backgroundColor: "rgb(239, 68, 68)" }} 
            whileTap={{ scale: .9 }} 
            transition={{ duration: .3 }}
            className="text-center p-2 rounded"
        >
        <div className='text-white'>{text}</div>
        </motion.div>
    </Link>
  )
}

export default Navbutton