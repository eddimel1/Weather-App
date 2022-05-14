import React from 'react'
import classes from './imageItem.module.css'

export const ImageItem = (props: {
  width: string | undefined
  height: string | undefined
  alt: string
  src: string
  setSelected: React.Dispatch<React.SetStateAction<string | undefined>>
}) => {
  return (
    <div
      onClick={(e) => props.setSelected(props.src)}
      className={classes.imgContainer}
      style={{width: props.width, height: props.height}}
    >
      <img
        className={classes.image1}
        src={props.src}
        alt={props.alt}
        height={props.height}
        width={props.height}
      ></img>
    </div>
  )
}
