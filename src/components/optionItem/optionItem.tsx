import React from 'react'
import {hourlyType} from '../../staticData/mainData'
import classes from './optionItem.module.css'
import {optionsArray} from '../../Pages/graphs/graphs'

export const OptionItem = (props: {
  index: string
  setSelected: React.Dispatch<React.SetStateAction<optionsArray>>
  selected: string
}) => {
  return (
    <div
      className={`${classes.optionItem} ${
        props.index === props.selected ? classes.active : ''
      }`}
      data-index={props.index}
      onClick={(e: React.MouseEvent) => {
        props.setSelected(props.index as optionsArray)
      }}
    >
      {props.index}{' '}
    </div>
  )
}
