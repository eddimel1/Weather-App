import React from 'react'
import classes from './chartOptionItem.module.css'
import {arraysChartType , optionsArray} from '../../Pages/graphs/graphs'
export type componentWithSelect = {index:string , setSelected? :  React.Dispatch<React.SetStateAction<optionsArray | undefined >>,
    setChartSelected? :   React.Dispatch<React.SetStateAction<arraysChartType >>, 
    selected : string | undefined

}
export const ChartOptionItem = (props : componentWithSelect) => {
   
  return (
      <>
        <div className={`${classes.chartOptionItem} ${props.index === props.selected ? classes.active : ''}`} data-index={props.index} onClick={(e : React.MouseEvent)=>{props.setChartSelected!(props.index as arraysChartType)}} >{props.index} </div>
   
      </>
  
  )
}
