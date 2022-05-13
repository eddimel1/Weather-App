import React from 'react'
import classes from './digitButton.module.css'
import {action , actionTypes , DigitButtonPropsType ,payload} from './calculator'


export default function DigitButton(props : DigitButtonPropsType) {
   
    return (
      <button className={classes.digitButton}
        onClick={() => props.dispatch({ type: actionTypes.ADD_DIGIT, digit : props.digit })}
      >
        {props.digit}
      </button>
    )
  }
