import React, { useRef, useState , useReducer, useEffect } from 'react'
import classes from './videoPlayer.module.css'
import { motion } from 'framer-motion'
import { MdPlayCircle , MdReplay , MdFastForward , MdFastRewind , MdPauseCircle , MdFullscreen , MdOutlineHighQuality , MdMoreVert , MdVolumeUp ,MdVolumeOff } from "react-icons/md"
import { VideoPlayerCurrentTime } from './videoPlayerCurrentTime'
import {calcDuration , pad , calcPersentage} from './videoPlayerUtils'
import {VideoPlayerSeekBar} from './videoPlayerSeekBar'
import { VolumeBar } from './volumeBar'

// const videoPlayerReducer = (state:any , action:any) : any {
//     switch (action.type) {
//         case '':
            
//             break;
    
//         default:
//             break;
//     }
// } 
export const VideoPlayer = (props:{selected:string|undefined , setSelectedVideo: React.Dispatch<React.SetStateAction<string | undefined>>}) => {
    const videoRef = useRef<HTMLVideoElement>(null)
 
    const [controls , setControls] = useState<boolean>(false)
    const[width , setWidth] = useState(0)
    const [playerState , setPlayerState] = useState('paused')
    const [showVolume , setShowVolume] = useState(false)
    const sharedIconStyle = {
        color:'#3DF8ED', width:'40px' , height:'40px' , border:'2px solid #3DF8ED' , borderRadius:'50%' , zIndex:'500'

}

    const handleClick = (e:any) => {
        if (e.target.classList.contains(classes.videoPlayerWrapper)) {
          props.setSelectedVideo(undefined);
        }
      }
     
        // setInterval(()=>{
        //     if(videoRef.current){
        //         console.log(Math.round(videoRef.current.currentTime / videoRef.current.duration * 100 )+ '%')

        //     }
        // },1000)
        useEffect(()=>{
            if(videoRef.current){
                if(playerState === 'playing'){
                    videoRef.current.play()
                }
                else if(playerState === 'paused'){
                    videoRef.current.pause()
                }
            }
        },[playerState])
    
        const updateTime = () => {
            let time
            setInterval((()=>{
                    if(videoRef.current){
                        time =  videoRef.current.currentTime / videoRef.current.duration * 100
                    }
                    
                }),1000)
                return time
            }
            const goForward = () => {
                if(playerState === 'playing' && videoRef.current){
                    videoRef.current.currentTime += 3
                    
                }
            }
            const goBackWards = () => {
                if(playerState === 'playing' && videoRef.current && videoRef.current.currentTime > 1){
                    videoRef.current.currentTime -= 3
                    
                }
            }
            const refreshVideo  = () => {
                if(videoRef.current && videoRef.current.currentTime > 1){
                    videoRef.current.currentTime = 0
                }

            }
           
            const calcPersentage = (part:number , total:number) => {
                return Math.round(part / total * 100)

            }
     
  return (
      <>
      
      <motion.div onClick={ handleClick}  className={classes.videoPlayerWrapper}  initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}>
        <div onMouseOver={() => {setControls(true)}} onMouseLeave={()=>{setControls(false)}} className={classes.videoContainer} >
            {controls && <><div className={classes.videoTitle}>
                      <span className={classes.title}>Video Title </span>
                  </div><div className={classes.controlsContainer}>
                          <div className={classes.videoControlsTop}>

                              <div className={classes.timeAndSeekBarContainer}>
                                  < VideoPlayerCurrentTime videoPlayerRef={videoRef} playerState={playerState} calcDuration={calcDuration}/>
                                  <VideoPlayerSeekBar playerState={playerState} videoPlayerRef={videoRef}/>
                                 
                                  <div className={classes.duration}>{videoRef.current ? calcDuration(videoRef.current.duration).concatinated
                                      : '00 : 00 : 00'}
                                  </div>
                              </div>

                          </div>
                          <div className={classes.videoControlsBottom}>
                              <MdReplay onClick={refreshVideo} style={sharedIconStyle} />
                              < MdVolumeUp style={sharedIconStyle} onClick={()=>{setShowVolume(prev => !prev)}}/>
                              {showVolume && < VolumeBar videoRef={videoRef} /> } 
                              
                              <div className={classes.buttonsContainer}>
                                  <MdFastForward onClick={goForward} style={sharedIconStyle} />
                                  {playerState === 'paused' ? <MdPlayCircle onClick={() => { setPlayerState('playing') } } style={sharedIconStyle} /> : <MdPauseCircle onClick={() => { setPlayerState('paused') } } style={sharedIconStyle} />}
                                  <MdFastRewind onClick={goBackWards} style={sharedIconStyle} />
                              </div>
                              <MdOutlineHighQuality style={sharedIconStyle} />
                              <MdFullscreen onClick={() => { videoRef.current?.requestFullscreen({}) } } style={sharedIconStyle} />
                              <MdMoreVert style={sharedIconStyle} />

                          </div>


                      </div></>
            
            
           
            
            
            }
        
        
        <motion.video  onEnded={() => {setPlayerState('paused'); setWidth(0)}}  onLoadedData={()=>{setControls(true)}} ref={videoRef}  className={classes.video} src={props.selected}  initial={{ x: -1000 }}
            animate={{ x: 0 }}></motion.video>
        </div>
       
       
   

    
    </motion.div>
      </>
   
  )
}
