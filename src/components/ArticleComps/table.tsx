import React from 'react'
import classes from './table.module.css'

type rowType = {
  color: string
  rowItems: Array<string>
}
type propType = {
  rows: Array<rowType>
}

export const Table = (props: {obj: propType}) => {
  const obj = props.obj

  return (
    <div className={classes.tableContainer}>
      {obj.rows &&
        obj.rows.map((rowItems, index) => {
          for (let i = 0; i < rowItems.rowItems.length; i++) {
            return (
              <React.Fragment key={Date.now() + i + Math.random()}>
                <div
                  className={classes.gridItem}
                  style={{backgroundColor: `${rowItems.color}`}}
                >
                  {rowItems.rowItems[i]}
                </div>
                <div
                  className={classes.gridItem}
                  style={{backgroundColor: `${rowItems.color}`}}
                >
                  {rowItems.rowItems[i + 1]}
                </div>
                <div
                  className={classes.gridItem}
                  style={{backgroundColor: `${rowItems.color}`}}
                >
                  {rowItems.rowItems[i + 2]}
                </div>
                <div
                  className={classes.gridItem}
                  style={{backgroundColor: `${rowItems.color}`}}
                >
                  {rowItems.rowItems[i + 3]}
                </div>
              </React.Fragment>
            )
          }
        })}
    </div>
  )
}
