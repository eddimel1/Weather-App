import React, { ReactNode } from "react"

export type buttonProps = {
    children:React.ReactNode,
    text: string,
    ind : number,
    key: number,
    listRef : React.RefObject<HTMLDivElement>,
    setSelected : React.Dispatch<React.SetStateAction<string | undefined>>,
    isSelected : boolean,
    toggle : boolean,
    setToggle : React.Dispatch<React.SetStateAction<boolean>>,
    selected : string | undefined
    
    

}