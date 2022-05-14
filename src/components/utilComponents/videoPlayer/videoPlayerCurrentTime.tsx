import React, {FC, useEffect, useState, forwardRef} from 'react'
import classes from './videoPlayerCurrentTime.module.css'

type propsType = {
  videoPlayerRef: React.RefObject<HTMLVideoElement>
  playerState: string
  calcDuration: (number: number) => {
    hours: string
    minutes: string
    seconds: string
    concatinated: string
  }
}
export const VideoPlayerCurrentTime: FC<propsType> = ({
  playerState,
  calcDuration,
  videoPlayerRef,
}) => {
  const [currentTime, setCurrentTime] = useState(
    calcDuration(videoPlayerRef.current!.currentTime).concatinated
  )

  useEffect(() => {
    let interval
    if (videoPlayerRef.current && playerState === 'playing') {
      interval = setInterval(() => {
        setCurrentTime(
          calcDuration(videoPlayerRef.current!.currentTime).concatinated
        )
      }, 1000)
    } else if (interval && playerState === 'paused') clearInterval(interval)
  }, [])
  return <div>{currentTime}</div>
}
