import React from 'react'
import classes from './airPolutionRow.module.css'

type airPolutionRowPropsType = {
  dayofWeek: string
  day: number
  night: number
}
type index = 1 | 2 | 3 | 4 | 5 | 6
export const AirPolutionRow = (props: {
  comps: airPolutionRowPropsType
  selected: string | undefined
  setSelected: React.Dispatch<React.SetStateAction<string | undefined>>
  index: string
}) => {
  const fromIndexToRaiting = function (index: number) {
    switch (index) {
      case 1:
        return {
          desc: 'good',
          color:
            'linear-gradient(90deg, rgba(18,255,0,1) 0%, rgba(135,252,6,1) 52%, rgba(0,255,89,1) 100%)',
        }
      case 2:
        return {
          desc: 'Moderate',
          color:
            'linear-gradient(90deg, rgba(249,255,0,1) 0%, rgba(180,252,6,1) 52%, rgba(255,252,0,1) 100%)',
        }
      case 3:
        return {
          desc: 'Unhealthy for Sensitive Groups',
          color:
            'linear-gradient(90deg, rgba(255,136,0,1) 0%, rgba(252,196,6,1) 52%, rgba(255,149,0,1) 100%)',
        }

      case 4:
        return {
          desc: 'Unhealthy',
          color:
            'linear-gradient(90deg, rgba(217,18,18,1) 0%, rgba(210,114,90,1) 52%, rgba(255,98,0,1) 100%)',
        }
      case 5:
        return {
          desc: 'Very Unhealthy',
          color:
            'linear-gradient(90deg, rgba(0,9,255,1) 0%, rgba(6,189,252,1) 69%, rgba(0,69,255,1) 100%)',
        }
      case 6:
        return {
          desc: 'Hazardous',
          color:
            'linear-gradient(90deg, rgba(164,18,217,1) 0%, rgba(255,0,219,1) 100%)',
        }

      default:
        break
    }
  }
  return (
    <div className={classes.row}>
      <div className={classes.container}>
        <div
          className={classes.day}
          onClick={() => {
            props.setSelected(props.index)
          }}
        >
          {props.comps.dayofWeek}
        </div>
        <div
          className={classes.nightAndDay}
          style={{background: fromIndexToRaiting(props.comps.day)?.color}}
        >
          Day : {fromIndexToRaiting(props.comps.day)?.desc}
        </div>
        <div
          className={classes.description}
          style={{background: fromIndexToRaiting(props.comps.night)?.color}}
        >
          Night : {fromIndexToRaiting(props.comps.night)?.desc}
        </div>
      </div>
    </div>
  )
}
