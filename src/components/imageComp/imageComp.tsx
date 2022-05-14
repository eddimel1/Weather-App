import React from 'react'
import classes from './imageComp.module.css'
import {Transition1} from '../transitionComps/transitionOnlyOpacity'
export const GaleryImageComp = (props: {
  src: string
  width: string
  height: string
  setSelected: React.Dispatch<React.SetStateAction<string | undefined>>
  index: string
  alt: string
}) => {
  return (
    <Transition1>
      <div
        className={classes.imgWrap}
        onClick={(e) => props.setSelected(props.index)}
      >
        <img
          className={classes.imageItem}
          alt={props.alt}
          src={props.src}
        ></img>
      </div>
    </Transition1>
  )
}
