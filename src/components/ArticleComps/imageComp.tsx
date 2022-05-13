import React from 'react'
import classes from './imageComp.module.css'
import {ImageItem} from './imageItem'

type propType = {
    urls:Array<string>
    alt: string
    width?:string
    height? : string
    position : 'center' | 'right' | 'left'
    setSelectedImg : React.Dispatch<React.SetStateAction<string | undefined>>
    
}
export const ImageComp = (props:propType) => {
  return (
      <div className={classes.imgWrapper} style={{justifyContent: `${props.position ==='center' ? 'center' : props.position ==='right' ? 'flex-end' : 'flex-start'}`}}>
          {props.urls.map((imageUrl , i)=>{
              return <ImageItem key={Date.now() + i} src={imageUrl} height={props.height} width={props.width} alt={props.alt} setSelected={props.setSelectedImg} />
            //   return  <div className={classes.imgContainer} style={{width:props.width , height :props.height}}>
            //   <img className={classes.image1} src={imageUrl} alt={props.alt} height={props.height} width={props.height}  ></img>
            //   </div>
          })}
          
    

      </div>
  
  )
}
