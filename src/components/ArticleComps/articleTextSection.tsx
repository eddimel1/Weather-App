import React, { FC } from 'react'
import classes from './articleTextSection.module.css'

type propType = {
    children?: React.ReactNode
    text:string
    type?:string
}
export const ArticleTextSection: FC<propType> = (props:propType ) => {
  return (
    <div className={classes.textSectionWrapper}>
                    
                   <div className={`${classes.sectionText}`}>
                  {props.text}
                 
                   </div>
                   {props.children}
               </div>
  )
}
