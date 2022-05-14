import React from 'react'
import classes from './formulaComp.module.css'

export const FormulaComp = (props: {formulas: Array<string>}) => {
  const [formula, formulaWithVal] = props.formulas

  return (
    <div className={classes.formulaWrapper}>
      <div className={classes.formulaContainer}>
        <div>{formula}</div>
        <div>{formulaWithVal}</div>
      </div>
    </div>
  )
}
