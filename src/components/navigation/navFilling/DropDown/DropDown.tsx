import React  from 'react'
import {Link} from 'react-router-dom'
import { subDropDownsType } from '../../../../staticData/StaticData'
import classes from './DropDown.module.css'

type PropType = {
    path:string, title:string, icon : React.ReactElement<any, string | React.JSXElementConstructor<any>>, 
    index:number ,  clickHandler :  (e: React.MouseEvent<HTMLDivElement>) => void, isSelected:boolean ,  key:React.Attributes , setSelected : React.Dispatch<React.SetStateAction<string>>
}
export const SubDropDown = (props : PropType) => {
   console.log(props.isSelected)
   const subDropDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    target.dataset.index && props.setSelected(target.dataset.index)

}
    
  return (
     <div className={`${classes.listItemContainer} `} data-index={props.index} onClick={(e:React.MouseEvent<HTMLDivElement>) => {subDropDownHandler(e)}} >
         
         <Link className={`${classes.listItem} `} to ={{pathname: props.path}}>{props.icon} {props.title}</Link>
          
         
      </div> 
     
  )
}
