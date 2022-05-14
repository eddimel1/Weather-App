import React, {useRef, useState} from 'react'
import {calcPersentage} from './videoPlayerUtils'
import classes from './volumeBar.module.css'
export const VolumeBar = (props: {
  videoRef: React.RefObject<HTMLVideoElement>
}) => {
  const [width, setWidth] = useState(0)
  const volumeBar = useRef<HTMLDivElement>(null)
  return (
    <div
      className={classes.volumeBar}
      ref={volumeBar}
      onClick={(e: React.MouseEvent) => {
        if (volumeBar.current && props.videoRef.current) {
          const calculatedWidth = calcPersentage(
            e.nativeEvent.offsetX,
            volumeBar.current.offsetWidth!
          )
          setWidth(calculatedWidth)

          props.videoRef.current.volume = calculatedWidth / 100
          console.log(props.videoRef.current.volume)
        }
      }}
    >
      <div
        className={classes.volumeProgress}
        style={{width: `${width}%`, height: '15px'}}
      ></div>
    </div>
  )
}
