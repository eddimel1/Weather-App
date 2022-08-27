import React from 'react'
import classes from './dailyForeCastItem.module.css'
import {KelvinToCelcius} from '../../utils/utils'
import {Days} from '../../staticData/mainData'
import {Transition} from '../transitionComps/transition'

type propType = {
  dt: number
  day: number
  night: number
  icon: string
  setSelected: React.Dispatch<React.SetStateAction<number>>
}

export const DailyForeCastItem = (props: propType) => {
  return (
    <>
      <div
        className={classes.dailyBottomForeCastContainer}
        onClick={() => props.setSelected(props.dt)}
      >
        <div className={classes.Day}>
          {Days[new Date(props.dt * 1000).getDay()]}
        </div>
        <img
          src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`}
          alt="icon"
        />

        <div className={classes.weatherTime}>
          Night - {KelvinToCelcius(props.day)} &#8451;{' '}
        </div>
        <div className={classes.weatherTime}>
          Day - {KelvinToCelcius(props.night)} &#8451;{' '}
        </div>
      </div>
    </>
  )
}
