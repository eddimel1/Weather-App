import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import {action , actionTypes , signType} from './calculator'
import classes from './operationButton.module.css'

export default function OperationButton({ dispatch, sign , styles } : {dispatch : React.Dispatch<action> , sign:signType , styles : DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>}) {
    return (
      <button className={classes.operationButton}
        onClick={() =>
          dispatch({ type: actionTypes.CHOOSE_OPERATION , sign : sign })
        }
      >
        {sign}
      </button>
    )
  }