import React, {FC} from 'react'
import {motion} from 'framer-motion'
const animations = {
  inital: {opacity: 0, x: -100},
  animate: {opacity: 1, x: 0},
  exit: {opacity: 0},
}

export const Transition: FC = ({children}) => {
  return (
    <motion.div
      variants={animations}
      initial="inital"
      animate="animate"
      exit="exit"
      transition={{duration: 1.5}}
    >
      {children}
    </motion.div>
  )
}
