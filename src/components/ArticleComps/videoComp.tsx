import React, {useRef} from 'react'
import classes from './videoComp.module.css'

export const VideoComp = (props: {
  setSelectedVideo: React.Dispatch<React.SetStateAction<string | undefined>>
  videos: string[]
  type: 'galery' | 'single'
  columns?: string
  position?: 'left' | 'center' | 'right'
}) => {
  if (props.type === 'single') {
    return (
      <>
        {props.videos.map((video, i, array) => {
          const pos = props.position
          const ref = React.createRef<HTMLVideoElement>()
          return (
            <div
              className={classes.videoWrapper}
              key={Date.now() + i}
              style={{
                justifyContent: `${
                  pos === 'left' ? 'start' : pos === 'center' ? 'center' : 'end'
                }`,
              }}
            >
              <video
                onClick={() => {
                  props.setSelectedVideo(video)
                }}
                ref={ref}
                muted
                //  onMouseLeave={(e) => ref.current?.pause() }  onMouseOver={(e) => setTimeout(() => ref.current?.play(), 2000)}
                className={classes.video}
                src={array[i]}
              ></video>
            </div>
          )
        })}
      </>
    )
  } else {
    return (
      <>
        <div
          className={classes.galeryWrapper}
          style={{
            gridTemplateColumns: `${
              props.columns === '3'
                ? '1fr 1fr 1fr'
                : props.columns === '2'
                ? '1fr 1fr'
                : '1fr'
            }`,
          }}
        >
          {props.videos.map((video, i, array) => {
            const ref = React.createRef<HTMLVideoElement>()
            return (
              <video
                onClick={() => {
                  props.setSelectedVideo(video)
                }}
                key={Date.now() + i}
                ref={ref}
                // onMouseLeave={(e) => () => ref.current?.pause()}   onMouseOver={(e) => setTimeout(() => ref.current?.play(), 2000)}
                className={classes.video}
                muted
                src={array[i]}
              ></video>
            )
          })}
        </div>
      </>
    )
  }
}
