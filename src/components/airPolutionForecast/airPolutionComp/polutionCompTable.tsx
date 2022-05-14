import React from 'react'
import classes from './polutionCompTable.module.css'
import {compType} from './polutionComp'

export const PolutionCompTable = (props: {
  comps: compType
  timeOfTheDay: string
}) => {
  const decideColor = (comp: string, quantity: number) => {
    switch (comp) {
      case 'no2':
        if (quantity >= 0 && quantity <= 50) {
          return 'green'
        } else if (quantity >= 50 && quantity <= 100) {
          return 'yellow'
        } else if (quantity >= 100 && quantity <= 200) {
          return 'orange'
        } else if (quantity >= 200 && quantity <= 400) {
          return 'red'
        }
        return 'violet'

      case 'pm10':
        if (quantity >= 0 && quantity <= 25) {
          return 'green'
        } else if (quantity >= 25 && quantity <= 50) {
          return 'yellow'
        } else if (quantity >= 50 && quantity <= 90) {
          return 'orange'
        } else if (quantity >= 90 && quantity <= 180) {
          return 'red'
        }
        return 'violet'
      case 'o3':
        if (quantity >= 0 && quantity <= 60) {
          return 'green'
        } else if (quantity >= 60 && quantity <= 120) {
          return 'yellow'
        } else if (quantity >= 120 && quantity <= 180) {
          return 'orange'
        } else if (quantity >= 180 && quantity <= 240) {
          return 'red'
        }
        return 'violet'
      case 'pm25':
        if (quantity >= 0 && quantity <= 15) {
          return 'green'
        } else if (quantity >= 15 && quantity <= 30) {
          return 'yellow'
        } else if (quantity >= 30 && quantity <= 55) {
          return 'orange'
        } else if (quantity >= 55 && quantity <= 110) {
          return 'red'
        }
        return 'violet'
      case 'co':
        const dividedQuantity = quantity / 1000
        if (dividedQuantity >= 0 && dividedQuantity <= 1) {
          return 'green'
        } else if (dividedQuantity >= 1 && dividedQuantity <= 2) {
          return 'yellow'
        } else if (dividedQuantity >= 2 && dividedQuantity <= 10) {
          return 'orange'
        } else if (dividedQuantity >= 10 && dividedQuantity <= 17) {
          return 'red'
        }
        return 'violet'
      case 'so2':
        if (quantity >= 0 && quantity <= 40) {
          return 'green'
        } else if (quantity > 41 && quantity <= 80) {
          return 'yellow'
        } else if (quantity > 81 && quantity <= 380) {
          return 'orange'
        } else if (quantity > 381 && quantity <= 800) {
          return 'red'
        }

        return 'violet'
      case 'nh3':
        const multipliedQuantity = quantity * 1000
        if (multipliedQuantity >= 0 && multipliedQuantity <= 200) {
          return 'green'
        } else if (multipliedQuantity > 201 && multipliedQuantity <= 400) {
          return 'yellow'
        } else if (multipliedQuantity > 401 && multipliedQuantity <= 800) {
          return 'orange'
        } else if (multipliedQuantity >= 801 && multipliedQuantity <= 1200) {
          return 'red'
        }
        return 'violet'

      default:
        break
    }
  }

  const sharedStyle = {
    borderBottom: ` 3px solid ${decideColor('no2', props.comps.no2)}`,
  }
  return (
    <div className={classes.day}>
      <h1 className={classes.timeOfTheDay}>{props.timeOfTheDay}</h1>
      <div
        className={classes.compItem}
        style={{
          borderBottom: ` 3px solid ${decideColor('co', props.comps.co)}`,
        }}
      >
        {' '}
        CO : {props.comps.co} μg/m3
      </div>
      <div
        className={classes.compItem}
        style={{
          borderBottom: ` 3px solid ${decideColor('nh3', props.comps.nh3)}`,
        }}
      >
        NH3 : {props.comps.nh3} μg/m3
      </div>
      {/* <div className={classes.compItem}>NO :    {props.comps.no} μg/m3</div> */}
      <div
        className={classes.compItem}
        style={{
          borderBottom: ` 3px solid ${decideColor('no2', props.comps.no2)}`,
        }}
      >
        NO2 : {props.comps.no2} μg/m3
      </div>
      <div
        className={classes.compItem}
        style={{
          borderBottom: ` 3px solid ${decideColor('o3', props.comps.o3)}`,
        }}
      >
        O3 : {props.comps.o3} μg/m3
      </div>
      <div
        className={classes.compItem}
        style={{
          borderBottom: ` 3px solid ${decideColor('pm10', props.comps.pm10)}`,
        }}
      >
        PM10 : {props.comps.pm10} μg/m3
      </div>
      <div
        className={classes.compItem}
        style={{
          borderBottom: ` 3px solid ${decideColor('pm25', props.comps.pm2_5)}`,
        }}
      >
        PM25 : {props.comps.pm2_5} μg/m3
      </div>
      <div
        className={classes.compItem}
        style={{
          borderBottom: ` 3px solid ${decideColor('so2', props.comps.so2)}`,
        }}
      >
        SO2 : {props.comps.so2} μg/m3
      </div>
    </div>
  )
}
