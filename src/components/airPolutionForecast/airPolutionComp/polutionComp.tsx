import React from 'react'
import classes from './polutionComp.module.css'
import {PolutionCompTable} from './polutionCompTable'
export type compType = {
    
    co: number,
    nh3: number,
    no: number,
    no2: number,
    o3: number,
    pm2_5: number,
    pm10: number,
    so2: number
}
export type compTypeWithDay = compType & {timeofTheDay : string}

export const PolutionComp = (props:{compsNight : compType , compsDay: compType}) => {
   
  console.log(props)
  return (
    <div className={classes.compWrapper}>
        <div className={classes.mainContainer}>
            <div className={classes.compContainer}>
                <PolutionCompTable comps={props.compsDay} timeOfTheDay='Day' />
                <PolutionCompTable comps={props.compsNight} timeOfTheDay='Night' />
               
           
        </div>
      
        <div className={classes.data}>Monday , 12March</div>

        </div>
        
    </div>
  )
}
