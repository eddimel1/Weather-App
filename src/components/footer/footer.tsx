import React from 'react'
import classes from './footer.module.css'

export const Footer = () => {
  return (
    <div className={classes.footer}>
    <div className={classes.container}>
        <div className={classes.textField}>
        This site is made by Eduard Melentjev &#169;
        </div>
    </div>
    </div>
  )
}
