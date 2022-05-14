import React, {useEffect, useState} from 'react'
import classes from './converterBox.module.css'
import {degreeSigns} from '../../../utils/converterUtils'
type boxPropsType = {
  setSelected: React.Dispatch<React.SetStateAction<string>>
  selected: string
  setInputInfo: (change: number) => void
  calculatedValue: string
  amount: number
  setCalculated: React.Dispatch<React.SetStateAction<string>>
}
export const ConverterBox = (props: boxPropsType) => {
  const [change, setChange] = useState('')

  return (
    <div className={classes.converterContainer}>
      <input
        className={classes.input}
        type="text"
        onChange={(e) => setChange(e.target.value)}
        value={
          props.calculatedValue && props.calculatedValue !== '0'
            ? props.calculatedValue
            : change
        }
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.code === 'Enter') {
            props.setInputInfo(parseInt(change))
          }
          if (e.code === 'Backspace') {
            props.setCalculated('')
            props.setInputInfo(0)
          }
        }}
      />
      <select
        className={classes.select}
        value={props.selected}
        onChange={(e) => props.setSelected(e.target.value)}
      >
        <option
          className={classes.option}
          style={{backgroundColor: 'white', color: 'black'}}
          value="Celsius"
        >
          Celsius
        </option>
        <option className={classes.option} value="Fahrenheit">
          Fahrenheit
        </option>
        <option className={classes.option} value="Kelvin">
          Kelvin
        </option>
        <option className={classes.option} value="Rankine">
          Rankine
        </option>
      </select>
    </div>
  )
}
