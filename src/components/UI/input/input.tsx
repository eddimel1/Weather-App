import React, { useEffect, useState } from 'react'
import classes from './input.module.css'

export const Input = (props : { setTown:  React.Dispatch<React.SetStateAction<string>> , styles? : React.CSSProperties  }) => {
    const [change , setChange] = useState('')
    const updateTown = (e : React.ChangeEvent<HTMLInputElement>) => {
        setChange(e.target.value)
}
const sendTown = (e : React.KeyboardEvent<HTMLInputElement> ) => {
    if(e.code === 'Enter'){
        props.setTown(change)
        }
        }
  return (
    <input className = {classes.input} value={change} placeholder='Check Town...' onKeyDown={sendTown} onChange={updateTown} style={props.styles} >
                    
                </input>
  )
}
