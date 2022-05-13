import React, { useRef , FC, useEffect, useState } from 'react'
import classes from './navItem.module.css'
import { someData , subDropDownsType} from '../../../staticData/StaticData'
import {buttonProps} from '../navTypes'
import {SubDropDown} from './DropDown/DropDown'



export const NavItem : FC<buttonProps> = (props ) => {
    const children : React.ReactNode  = props.children
    const spanRef = useRef<HTMLDivElement | null>(null)
    const [selected , setSelected] = useState<string>('') 
    const listRef = useRef<HTMLUListElement>(null)
 const clickHandler  = ( e : React.MouseEvent<HTMLDivElement> ) =>  {
            props.setToggle(true)
            const target = e.target as HTMLDivElement
          
            props.setSelected(target.dataset.index )}
    const subDropDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement
        target.dataset.index && setSelected(target.dataset.index)}
       
       const toggleDropDown = (event: MouseEvent) => {
          if(listRef.current && event.target && !listRef.current.contains(event.target as HTMLUListElement ) && !props.listRef.current?.contains(event.target as HTMLUListElement ) ){props.setToggle(false)}}
  
       useEffect(()=>{
                    document.addEventListener('click', toggleDropDown)
                    return () => {document.removeEventListener('click',toggleDropDown)}
            },[])
        
            return ( 
    <>
        <div className={`${classes.container}  `}>
    <div id = 'div'   >
        
    <div className={`${classes.Item} ${props.isSelected ? classes.matchButtonStyle : ''} `} data-index={props.ind}  onClick={(e:React.MouseEvent<HTMLDivElement> ) => clickHandler(e) }  ref={spanRef} >  {props.text} {children}  </div>
    </div>
        
        { props.isSelected && props.toggle &&
        <ul className = {classes.hiddenList} ref={listRef}>
        {someData[Number(props.selected)].subDropDowns.map((item: subDropDownsType ,i: number):any => {
            
            return <SubDropDown setSelected={setSelected} path={item.path} title={item.title} icon ={item.icon} index={i} clickHandler = {subDropDownHandler} isSelected={Number(selected) === i} key={Date.now() + i} />
        })} 
        </ul> 
        }
    </div>
    </>
    )

    }