import React, {useEffect, useRef, useState} from 'react'
import classes from './videoPlayerSeekBar.module.css'
import {calcPersentage} from './videoPlayerUtils'

type propsType = {
  videoPlayerRef: React.RefObject<HTMLVideoElement>
  playerState: string
}
const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a))
const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x))

export const VideoPlayerSeekBar = (props: propsType) => {
  const player = props.videoPlayerRef.current
  const [progressWidth, setProgressWidth] = useState(0)
  const [bufferingWidth, setBufferingWidth] = useState(0)
  const seekBarRef = useRef<HTMLDivElement>(null)
  const bufferingPosition = useRef(calcLastBufferingPosition())

  function calcLastBufferingPosition() {
    if (player && player.buffered.length) {
      return (
        (player.buffered.start(player.buffered.length - 1) / player.duration) *
        100
      )
    }
    return 1
  }

  //  console.log(player?.buffered.length && player?.buffered.end((player.buffered.length -1)) )
  useEffect(() => {
    let interval
    if (player && seekBarRef.current && props.playerState === 'playing') {
      interval = setInterval(() => {
        if (player) {
          setProgressWidth((player.currentTime / player.duration) * 100)
          setBufferingWidth(
            (100 - bufferingPosition.current) *
              invlerp(
                player.buffered.start(player.buffered.length - 1),
                player.duration,
                player.buffered.end(player.buffered.length - 1)
              )
          )
        }
      }, 10)
    } else if (interval && props.videoPlayerRef.current && seekBarRef.current) {
      clearInterval(interval)
    }
  }, [])
  return (
    <div
      className={classes.seekBar}
      ref={seekBarRef}
      style={{zIndex: '500'}}
      onClick={(e: React.MouseEvent) => {
        seekBarRef.current && setProgressWidth(
          calcPersentage(
            e.nativeEvent.offsetX,
            seekBarRef.current.offsetWidth
          )
        )
        if (player && seekBarRef.current) {
          player.currentTime =
            (player.duration *
              calcPersentage(
                e.nativeEvent.offsetX,
                seekBarRef.current.offsetWidth
              )) /
            100
          if (player.buffered.length) {
            bufferingPosition.current = calcLastBufferingPosition()
          }
        }
      }}
    >
      <div
        className={classes.progressBar}
        style={{width: `${progressWidth}%`}}
      ></div>
      <div
        className={classes.bufferingBar}
        style={{
          width: `${bufferingWidth}%`,
          left: `calc(${bufferingPosition}% - 15px)`,
        }}
      ></div>
    </div>
  )
}
