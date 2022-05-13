import React, { useState } from 'react'
import classes from './navigationModeBar.module.css'
import { mode } from '../../staticData/StaticData'

export const NavigationModeBar = ({setMode, mode} :{setMode : React.Dispatch<React.SetStateAction<mode>> , mode:string}) => {
    const modeArray = ['normal','shiny','cool','disco','flying','upsideDown'] as const
    const [show,setShow] = useState<boolean>(false)

  return (
     <>
      <div onClick={() => setShow(prev => !prev)} className={classes.modeTitle}>Modes
      <div className={classes.modeContainer}>
      {show &&
      modeArray.map((mode,i)=>(
          
          
        <div key={Date.now() + i} className={classes.switchMode} onClick={()=>setMode((mode))}>
           {mode}
           </div>
           ))
           }
      </div>
     </div>
     </>
    
  )
}
