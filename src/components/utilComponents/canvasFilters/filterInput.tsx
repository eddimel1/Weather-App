import React, {FC, useEffect, useState} from 'react'
import classes from './filterInput.module.css'
import image from '../../assets/338769.webp'
import {objOfInputValuesType} from './filterOptions'
type propType = {
  setValues: React.Dispatch<React.SetStateAction<objOfInputValuesType>>
  option: option
  min: string
  max: string
  step: string
  objOfInputValues: objOfInputValuesType
}
const obj = {
  contrast: 0,
  grayscale: 0,
  invert: 0,
  saturate: 0,
  sepia: 0,
  blur: 0,
  huerotate: 0,
  brightness: 0,
}
export type option = keyof typeof obj
export const FilterInput: FC<propType> = (props: propType) => {
  const [change, setChange] = useState<string>('')
  const option = props.option
  console.log(props)
  function setInputValues<T>(
    e: React.ChangeEvent<HTMLInputElement>,
    objOfInputValues: T,
    option: option,
    setValues: React.Dispatch<React.SetStateAction<T>>
  ): void {
    setValues({...objOfInputValues, [option]: e.target.value})
  }

  return (
    <input
      className={classes.input}
      type="range"
      min={props.min}
      max={props.max}
      step={props.step}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setInputValues<objOfInputValuesType>(
          e,
          props.objOfInputValues,
          props.option,
          props.setValues
        )
      }
      defaultValue="0"
    ></input>
  )
}
