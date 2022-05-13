import React, { FC } from 'react'
import classes from './articleWrapper.module.css'
type propType = {
    children?: React.ReactNode
    title:string
}
export const ArticleWrapper : FC<propType> = (props:propType) => {
  return (
    <div className={classes.articleWrapper}>
        <h4 className={classes.title}>{props.title}</h4>
       
        <div className={classes.mainArticle}>
            {props.children}
        </div>
    </div>
  )
}
