import React, {useEffect, useState} from 'react'
import classes from './input.module.css'

export const Input = (props: {
  setTown: React.Dispatch<React.SetStateAction<string>>
  styles?: React.CSSProperties
}) => {
  const [change, setChange] = useState('')
  const [error, setError] = useState<string | null>()
  const updateTown = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/\d/.test(e.target.value)) {
      setError('Only Letters')
    } else {
      setError(null)
    }
    setChange(e.target.value)
  }
  const sendTown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      props.setTown(change)
    }
  }

  return (
    <input
      className={classes.input}
      value={change}
      placeholder="Check any town..."
      onKeyDown={sendTown}
      onChange={updateTown}
      style={{
        ...props.styles,
        border: `${error ? '2px solid red' : '2px solid white'}`,
      }}
    ></input>
  )
}
