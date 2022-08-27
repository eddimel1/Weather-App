import React, {useState} from 'react'
import classes from './imageComp.module.css'
export const GaleryImageComp = (props: {
  src: string
  width: string
  height: string
  setSelected: React.Dispatch<React.SetStateAction<string | undefined>>
  index: string
  alt: string
}) => {
  const [loaded, setLoaded] = useState<boolean>(false)
  return (
    <div
      className={`${classes.imgWrap} ${!loaded ? `${classes.loading}` : ''}`}
      onClick={(e) => props.setSelected(props.index)}
    >
      <img
        onLoad={() => {
          setLoaded(true)
        }}
        className={classes.imageItem}
        alt={props.alt}
        src={props.src}
      ></img>
    </div>
  )
}
