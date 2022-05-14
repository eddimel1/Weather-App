import React, {FC} from 'react'
import {motion} from 'framer-motion'
import classes from './transition1.module.css'
const animations = {
  inital: {opacity: 0},
  animate: {opacity: 1},
  exit: {opacity: 0},
}

export const Transition1: FC = ({children}) => {
  return (
    <motion.div
      variants={animations}
      className={classes.fixHeight}
      initial="inital"
      animate="animate"
      exit="exit"
      transition={{duration: 1.5}}
    >
      {children}
    </motion.div>
  )
}
